#!/usr/bin/env node
/**
 * Regen property scenes from corrected DNA with master-reference consistency.
 *
 * Usage:
 *   node scripts/regen/regen-scenes.mjs --ids 12,18,19,20 [--dry-run]
 *   node scripts/regen/regen-scenes.mjs --ids 18 --scenes exterior,section
 *
 * Requires:
 *   AI_INTEGRATIONS_GEMINI_API_KEY + AI_INTEGRATIONS_GEMINI_BASE_URL
 *   (or GEMINI_API_KEY for direct Google GenAI)
 *
 * Workflow:
 *   1. Build prompt via property-dna buildPrompt logic (inlined checklist)
 *   2. Generate exterior master (text only)
 *   3. Generate other scenes with master as reference image
 *   4. Write to public/images/scenes/ and chats/screenshots-*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const SCENES_DIR = path.join(ROOT, "artifacts/gory-resort/public/images/scenes");
const CHATS_DIR = path.join(ROOT, "chats/screenshots-2026-08-11");
const DNA_PATH = path.join(ROOT, "artifacts/gory-resort/src/data/property-dna.ts");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const idsArg = args.find((a) => a.startsWith("--ids"));
const scenesArg = args.find((a) => a.startsWith("--scenes"));
const IDS = (idsArg?.split("=")[1] || args[args.indexOf("--ids") + 1] || "12,18,19,20")
  .split(",")
  .map((s) => parseInt(s.trim(), 10))
  .filter(Boolean);
const SCENE_FILTER = scenesArg
  ? (scenesArg.split("=")[1] || args[args.indexOf("--scenes") + 1] || "").split(",").filter(Boolean)
  : null;

const DEFAULT_SCENES = {
  12: ["exterior", "section", "floorplan", "life_remote_work", "bizarre"],
  18: ["exterior", "section", "floorplan", "life_bbq", "bizarre"],
  19: ["exterior", "section", "floorplan", "life_remote_work", "bizarre"],
  20: ["exterior", "section", "floorplan", "life_matchday", "bizarre"],
};

function loadDnaSnippet(id) {
  const src = fs.readFileSync(DNA_PATH, "utf8");
  // Extract the block for this id (best-effort for logging / dry-run)
  const re = new RegExp(`${id}:\\s*\\{[\\s\\S]*?(?=\\n  \\d+:|\\n\\};)`, "m");
  const m = src.match(re);
  return m ? m[0].slice(0, 400) + "…" : `(DNA id ${id} not found)`;
}

async function generateWithGemini(prompt, referenceDataUrl) {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
  if (!apiKey) {
    throw new Error(
      "Missing AI_INTEGRATIONS_GEMINI_API_KEY or GEMINI_API_KEY. Set env to regenerate images.",
    );
  }

  // Dynamic import so dry-run works without the package
  const { GoogleGenAI, Modality } = await import("@google/genai");
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
      ? { apiVersion: "", baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL }
      : undefined,
  });

  const parts = [];
  if (referenceDataUrl) {
    const match = referenceDataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
      parts.push({
        text:
          "Image 1 is the MASTER REFERENCE of the exact same real property. Preserve building geometry, facade materials, window frames, roof, site context and landmark. Only change what the SCENE requires.\n\n",
      });
    }
  }
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ role: "user", parts }],
    config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
  });

  const imagePart = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imagePart?.inlineData?.data) throw new Error("No image in Gemini response");
  const mime = imagePart.inlineData.mimeType || "image/png";
  return `data:${mime};base64,${imagePart.inlineData.data}`;
}

function dataUrlToBuffer(dataUrl) {
  const m = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  if (!m) throw new Error("Invalid data URL");
  return Buffer.from(m[1], "base64");
}

function sceneFilename(id, scene) {
  const map = {
    exterior: `p${id}-exterior.jpg`,
    section: `p${id}-section.jpg`,
    floorplan: `p${id}-floorplan.jpg`,
    life_bbq: `p${id}-bbq.jpg`,
    life_remote_work: `p${id}-remote.jpg`,
    life_matchday: `p${id}-matchday.jpg`,
    bizarre: `p${id}-bizarre.jpg`,
  };
  return map[scene] || `p${id}-${scene}.jpg`;
}

/** Minimal prompt builder when full TS import is unavailable from plain node */
function buildPromptFallback(id, sceneType, sceneDesc, withMaster) {
  const lock = withMaster
    ? "MASTER REFERENCE LOCK: Preserve building geometry, materials, roof, site, landmark from the reference image. Only change camera/cutaway/props as described.\n\n"
    : "";
  const prohibitions = [
    "Photorealistic architectural photography — restrained, matte finishes, natural weathering. NOT glossy hyper-CGI.",
    "Building sits firmly on land with correct street/beach/neighbour context. NEVER float on rocks mid-water.",
    "Windows show reflections or neutral tint only — NEVER detailed furnished interiors through exterior glass.",
    "No pure white/void backgrounds. Match real agency listing type for this property.",
  ].join(" ");
  return `${lock}Property listing id=${id}. Scene type: ${sceneType}.
SCENE: ${sceneDesc}
RENDER RULES: ${prohibitions}
Use the property DNA for listing ${id} (corrected for real agency photos).`;
}

const SCENE_DESCRIPTIONS = {
  exterior: "Full facade establishing shot. Entire building + real site context. No people. Match real agency photos.",
  section: "Isometric dolls-house cutaway, stacked floors, landmark through glass. Grounded site context.",
  floorplan: "High-angle isometric floor plan, roof removed, site at edges, no white void.",
  life_bbq: "Terrace/balcony life scene at blue hour or evening, correct building type, landmark visible.",
  life_remote_work: "Interior wide shot with laptop, correct materials, view through glass as in DNA.",
  life_matchday: "Interior living room with large TV match, curtain-wall views, no window-interior bug on exterior glass.",
  bizarre: "Isometric interior cutaway with scene props only — do not change architecture.",
};

async function regenListing(id) {
  const scenes = (SCENE_FILTER || DEFAULT_SCENES[id] || ["exterior"]).filter(Boolean);
  console.log(`\n=== Listing ${id} ===`);
  console.log(loadDnaSnippet(id));
  console.log("Scenes:", scenes.join(", "));

  let masterDataUrl = null;

  for (const scene of scenes) {
    const withMaster = scene !== "exterior" && !!masterDataUrl;
    const prompt = buildPromptFallback(
      id,
      scene,
      SCENE_DESCRIPTIONS[scene] || scene,
      withMaster,
    );

    if (dryRun) {
      console.log(`[dry-run] would generate p${id} ${scene} (masterRef=${withMaster})`);
      console.log(prompt.slice(0, 200) + "…");
      continue;
    }

    console.log(`Generating p${id} ${scene}…`);
    const dataUrl = await generateWithGemini(prompt, withMaster ? masterDataUrl : undefined);
    const buf = dataUrlToBuffer(dataUrl);
    const fname = sceneFilename(id, scene);
    const outScene = path.join(SCENES_DIR, fname);
    const outChat = path.join(CHATS_DIR, `regen-${fname}`);

    fs.mkdirSync(SCENES_DIR, { recursive: true });
    fs.mkdirSync(CHATS_DIR, { recursive: true });
    fs.writeFileSync(outScene, buf);
    fs.writeFileSync(outChat, buf);
    console.log(`  wrote ${outScene} (${buf.length} bytes)`);

    if (scene === "exterior") masterDataUrl = dataUrl;
  }
}

async function main() {
  console.log("GoldScape scene regen");
  console.log("IDs:", IDS.join(", "), dryRun ? "(DRY RUN)" : "");
  if (!dryRun && !process.env.AI_INTEGRATIONS_GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
    console.error("\nERROR: No Gemini API key in environment.");
    console.error("Export AI_INTEGRATIONS_GEMINI_API_KEY (Replit) or GEMINI_API_KEY, then re-run.");
    console.error("Falling back to --dry-run behaviour for safety.\n");
    for (const id of IDS) await regenListing(id); // still logs prompts when we force dry
    process.exit(2);
  }
  for (const id of IDS) {
    await regenListing(id);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
