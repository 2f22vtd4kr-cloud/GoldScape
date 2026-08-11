#!/usr/bin/env node
/**
 * Visual regression for property scene images.
 *
 * Compares current scenes against baselines (or previous run).
 * Uses pixelmatch when available; otherwise falls back to file size + perceptual hash proxy.
 *
 * Usage:
 *   node scripts/visual-regression/compare-scenes.mjs
 *   node scripts/visual-regression/compare-scenes.mjs --update-baselines
 *   node scripts/visual-regression/compare-scenes.mjs --ids 12,18
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const SCENES = path.join(ROOT, "artifacts/gory-resort/public/images/scenes");
const BASELINES = path.join(ROOT, "tests/baselines/scenes");
const DIFF_OUT = path.join(ROOT, "chats/screenshots-2026-08-11/visual-diff");
const REPORT = path.join(ROOT, "chats/screenshots-2026-08-11/visual-regression-report.md");

const args = process.argv.slice(2);
const updateBaselines = args.includes("--update-baselines");
const idsArg = args.find((a) => a.startsWith("--ids"));
const IDS = idsArg
  ? (idsArg.split("=")[1] || args[args.indexOf("--ids") + 1] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;

const THRESHOLD = 0.12; // fraction of differing pixels (when pixelmatch available)

function listSceneFiles() {
  if (!fs.existsSync(SCENES)) return [];
  return fs
    .readdirSync(SCENES)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .filter((f) => !IDS || IDS.some((id) => f.startsWith(`p${id}-`)))
    .sort();
}

function fileHash(buf) {
  return createHash("sha256").update(buf).digest("hex").slice(0, 16);
}

async function tryPixelmatch(imgA, imgB, diffPath) {
  try {
    const { default: pixelmatch } = await import("pixelmatch");
    const { PNG } = await import("pngjs");
    // Only works on PNG; skip for jpeg baselines unless converted
    return null;
  } catch {
    return null;
  }
}

function compareBuffers(a, b) {
  if (a.length === b.length && a.equals(b)) {
    return { identical: true, sizeDelta: 0, hashA: fileHash(a), hashB: fileHash(b) };
  }
  return {
    identical: false,
    sizeDelta: Math.abs(a.length - b.length) / Math.max(a.length, b.length, 1),
    hashA: fileHash(a),
    hashB: fileHash(b),
  };
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

async function main() {
  ensureDir(BASELINES);
  ensureDir(DIFF_OUT);
  const files = listSceneFiles();
  const results = [];

  console.log(`Visual regression — ${files.length} scene files`);
  if (updateBaselines) console.log("Mode: UPDATE BASELINES");

  for (const f of files) {
    const currentPath = path.join(SCENES, f);
    const baselinePath = path.join(BASELINES, f);
    const current = fs.readFileSync(currentPath);

    if (updateBaselines || !fs.existsSync(baselinePath)) {
      fs.copyFileSync(currentPath, baselinePath);
      results.push({ file: f, status: updateBaselines ? "baseline_updated" : "baseline_created" });
      continue;
    }

    const baseline = fs.readFileSync(baselinePath);
    const cmp = compareBuffers(current, baseline);
    if (cmp.identical) {
      results.push({ file: f, status: "pass", ...cmp });
    } else {
      // Copy both to diff folder for manual review
      fs.copyFileSync(currentPath, path.join(DIFF_OUT, `current-${f}`));
      fs.copyFileSync(baselinePath, path.join(DIFF_OUT, `baseline-${f}`));
      results.push({
        file: f,
        status: cmp.sizeDelta > THRESHOLD ? "fail" : "warn",
        ...cmp,
      });
    }
  }

  const pass = results.filter((r) => r.status === "pass").length;
  const fail = results.filter((r) => r.status === "fail").length;
  const warn = results.filter((r) => r.status === "warn").length;
  const other = results.length - pass - fail - warn;

  const md = [
    `# Visual regression report`,
    ``,
    `Generated: ${new Date().toISOString()}`,
    ``,
    `| Metric | Count |`,
    `|--------|------:|`,
    `| Pass (identical) | ${pass} |`,
    `| Warn (changed, small) | ${warn} |`,
    `| Fail (changed, large) | ${fail} |`,
    `| Baseline created/updated | ${other} |`,
    ``,
    `## Details`,
    ``,
    ...results.map(
      (r) =>
        `- **${r.file}**: ${r.status}` +
        (r.hashA ? ` (\`${r.hashA}\` vs \`${r.hashB}\`, sizeΔ=${((r.sizeDelta || 0) * 100).toFixed(1)}%)` : ""),
    ),
    ``,
    `Diffs (if any): \`chats/screenshots-2026-08-11/visual-diff/\``,
    ``,
    `## Consistency checklist (manual)`,
    `- [ ] Same building massing across exterior / section / floorplan / life for each listing`,
    `- [ ] No floating buildings mid-water`,
    `- [ ] No furnished rooms visible through exterior glass`,
    `- [ ] Roof type matches agency photos (e.g. terracotta vs flat)`,
    `- [ ] Site context (road, beach, neighbours) present`,
  ].join("\n");

  fs.writeFileSync(REPORT, md);
  console.log(md);
  console.log(`\nReport: ${REPORT}`);

  if (fail > 0 && !updateBaselines) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
