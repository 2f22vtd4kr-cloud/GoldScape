# EstateofMind — Image Generation Playbook

> **This is the permanent playbook.** Every property scene image — now and in all future repo imports — must follow this process. Do not generate ad-hoc prompts. Use `property-dna.ts`.

---

## The Core Problem (and Why We Solved It)

The AI has no memory between image generation calls. If you describe "a modern white Mediterranean apartment" five times, you get five different buildings. The exterior shows glass railings; the BBQ scene shows a stone parapet; the bizarre scene floats in a grey void. They look like a stock-photo collage of unrelated properties.

The fix: every prompt for listing N starts with the same verbatim **ANCHOR BLOCK** produced by `buildAnchor(N)`. The anchor describes the building, site, landmark, interior, and palette with precise, non-ambiguous language — specific enough that the AI renders the same thing every run.

---

## The DNA System

### File: `src/data/property-dna.ts`

This is the single source of truth. It contains:

- **`PROPERTY_DNA`** — one entry per listing with five anchor fields + lighting setup + per-scene camera instructions
- **`buildAnchor(id)`** — returns the verbatim anchor paragraph
- **`buildPrompt(id, sceneType, sceneDescription)`** — full ready-to-paste prompt
- **`PROHIBITIONS`** — universal rules appended to every prompt

**Never bypass these functions.** Never write a prompt from scratch. Always call `buildPrompt()`.

---

## Step-by-Step: Generating a Scene (Consistency-First Workflow)

All properties are **real listings** from real agencies. Generated images must stay photorealistic, geographically plausible, and visually identical across scenes for the same listing.

### Recommended pipeline (master + reference)

```typescript
import { buildPrompt } from '@/data/property-dna';
import { generateImage } from '/* image client */';

// 1. MASTER exterior — text only
const exteriorPrompt = buildPrompt(18, 'exterior', `Full facade establishing shot. Entire building + site. No people.`);
const masterDataUrl = await generateImage(exteriorPrompt);
// Review: materials, landmark, no interior rooms through glass.

// 2. All other scenes — pass master as visual identity lock
const sectionPrompt = buildPrompt(18, 'section', `Dolls-house cutaway, all floors stacked. Landmark through rear glass.`, { withMasterReference: true });
const sectionDataUrl = await generateImage(sectionPrompt, { data: masterDataUrl });
```

`generateImage(prompt, references?)` accepts reference images. Prefer master-reference for every scene after the first approved exterior.

### ControlNet note
ControlNet (depth/canny) is ideal for isometric spatial lock but not available on the current Gemini path. Documented for a future Flux/SDXL backend. Until then, master-reference is the production standard.

---

## Anchor Structure

Each anchor has five parts. **Write them with clinical precision:**

| Field | What it defines | Common mistakes to avoid |
|-------|----------------|--------------------------|
| `building` | Facade material, era, color, roof, window type, balcony rail type, any unique identifying detail | "white modern building" — too vague. Instead: "white sand-render, flat concrete roof, anthracite aluminium frames, frameless glass railings" |
| `site` | What surrounds the building at ground level | Missing: the AI invents its own context every time |
| `landmark` | The ONE distinctive thing always visible through the main windows | "sea view" — too vague. Name the exact island, fortress, river, with one uniquely identifying visual detail |
| `interior` | Floor, walls, ceiling, frame color, one notable room detail | Missing: every interior scene gets a different floor material |
| `palette` | 5–7 specific color names defining the gamut | "white, blue, beige" — too generic. Use descriptive names: "pearl white render · Kotor-bay ultramarine-blue · pale cream travertine" |

---

## Scene-Type Camera Conventions

These are defined in `cameraByType` in the DNA and automatically injected by `buildPrompt()`. Overview:

| Scene type | Camera / framing |
|------------|-----------------|
| `exterior` | Street or water level, 25–35° elevation, two facade planes visible, surrounding site in frame |
| `section` | 45° isometric dolls-house cutaway, roof and front wall removed, all floors stacked |
| `floorplan` | 65° top-down isometric, roof only removed, site context at building edges (never white/void background) |
| `life_*` | Interior or terrace shot showing correct floor + walls + landmark through glass |
| `bizarre` | 45° isometric room cutaway, same camera as section, landmark visible through window |

---

## Universal Prohibitions (enforced by `PROHIBITIONS` constant)

These are appended automatically by `buildPrompt()`. Never generate without them:

- ✗ NO text, labels, numbers, annotations, compass roses, or UI overlays
- ✗ NO human figures, silhouettes, or shadows of people *(except life_\* scenes when the brief explicitly adds people)*
- ✗ NO hand-drawn, sketch, watercolor, or illustration style
- ✗ NO plain white, grey, or black void backgrounds — building always sits in geographic context
- ✓ Photorealistic 3D architectural render, ultra-high detail

---

## What Makes Scenes Feel Like the Same Property

After generating each scene, check these three things:

### 1. The landmark is present and correct
Every scene (except pure floorplan top-downs) should show the property's landmark through the appropriate window. For p18: the Gospa od Škrpjela island. For p12: Kalemegdan rooftops. If it's missing or wrong, the scene feels like a different location.

### 2. The interior materials match
Every interior scene must have the same floor material and wall finish. If the DNA says travertine tile, it's travertine in the bedroom, bathroom, living room, and bizarre scene. If one image shows dark wood planks, reject and regenerate.

### 3. No void background
If the scene appears to float on a plain background (white, grey, black) and should be contextual (section, floorplan, bizarre), it was generated without the DNA anchor. Reject and regenerate with `buildPrompt()`.

---

## Adding a New Property

1. Open `src/data/property-dna.ts`
2. Add a new entry to `PROPERTY_DNA` with a realistic ID matching `listings.ts`
3. Fill in all five anchor fields with precise language (see table above)
4. Add `lightingSetup` describing the ideal time-of-day for exterior shots
5. Add `cameraByType` entries for each scene type you plan to generate
6. Generate the **exterior scene first** — this becomes your visual reference for the other scenes
7. If the exterior came out well, use its description to sharpen the anchor before generating the rest

---

## Nika Review Checklist

Nika (god-tier designer persona in `PERSONAS.md`) reviews every image before it goes live. Her checklist:

- [ ] Landmark correct and recognisable?
- [ ] Floor material matches DNA?
- [ ] Wall finish matches DNA?
- [ ] No void background?
- [ ] No text/numbers baked in?
- [ ] Building style matches exterior (not a different property)?
- [ ] Render quality: photorealistic, ultra-high detail, no sketch artifacts?

All seven must pass. If any fail: regenerate with strengthened prompt language targeting the specific failure, not a completely new prompt.

---

## Regeneration History for p18 (proof-of-concept)

The p18 (Dobrota, Kotor Bay) scene set was the first to be generated using the full DNA system.

**Problems with the pre-DNA images:**
- `p18-bbq.jpg`: Completely different building (stone parapet, not white-render glass-railing modern). Wrong building style entirely.
- `p18-bizarre.jpg`: Wrong floor (dark wood instead of travertine), wrong walls (exposed brick instead of white plaster), grey void background.

**After DNA system applied:**
- All scenes share: white render facade, anthracite aluminium frames, glass balcony railings, pale travertine interior, Gospa od Škrpjela island always visible in the bay.
- The property is instantly recognisable across all five scenes as the same building.

---

## Reality lock (2026-08-11)

DNA must be written from **real agency photos**, not aspirational CGI.

| Listing | Wrong (old) | Correct (agency) |
|---------|-------------|------------------|
| p18 | White glass villa on rocks mid-bay | Multi-storey block, terracotta roof, coastal road + beach |
| p12 | 1930s Art Deco limestone | BW Simfonija modern high-rise (Estitor) |
| p19 | Luxury hillside villa | Modest sea-view apartment (Monteonline) |
| p20 | — | Glass tower OK, but ban window-interior hallucination |

Always open `public/images/agency/pN/` before editing DNA.

---

## Automated tools

### Regenerate scenes (Gemini master-reference)

```bash
# Dry-run (prints prompts, no API)
node scripts/regen/regen-scenes.mjs --ids 12,18,19,20 --dry-run

# Real regen (needs AI_INTEGRATIONS_GEMINI_API_KEY or GEMINI_API_KEY)
node scripts/regen/regen-scenes.mjs --ids 18 --scenes exterior,section,floorplan
```

Writes to `public/images/scenes/` and `chats/screenshots-*/regen-*`.

### Visual regression

```bash
# Snapshot current scenes as baselines
node scripts/visual-regression/compare-scenes.mjs --ids 12,18,19,20 --update-baselines

# Compare after regen
node scripts/visual-regression/compare-scenes.mjs --ids 12,18,19,20
```

Report: `chats/screenshots-*/visual-regression-report.md`

### DNA coverage audit

```bash
node scripts/audit-dna-vs-listings.mjs
```

### Stable Diffusion + ControlNet (GPU)

For tighter spatial lock than Gemini multi-image:

```bash
python scripts/sd_consistency/pipeline.py \
  --master artifacts/gory-resort/public/images/scenes/p18-exterior.jpg \
  --prompt "isometric section of the same building..." \
  --out /tmp/p18-section-sd.jpg
```

Requires GPU + `diffusers` / `controlnet-aux`. On CPU the script warns and stubs. Prefer Gemini path in this environment.

Recommended SD settings (from architecture practice):
- ControlNet depth strength 0.6–0.7
- Denoise / img2img strength 0.35–0.45
- CFG ~3.5–4.5 for Flux-class; ~7 for SD1.5
- Negative: floating building, window interiors, hyper-CGI, white void

---

## Desktop / mobile visual check

```bash
# From artifacts/gory-resort after pnpm install
pnpm dev
# then
node scripts/screenshot-mobile.mjs
node scripts/serve-and-screenshot.mjs
```

Save captures under `chats/screenshots-YYYY-MM-DD/`.

---

## Provider reality (API keys)

| Provider | Env var | Notes |
|----------|---------|--------|
| **Gemini image** | `GEMINI_API_KEY` | Free keys work **only** in AI Studio web UI. Programmatic calls need **billing** (free tier image quota is often `limit: 0`). |
| **OpenAI** | `OPENAI_API_KEY` | `dall-e-3` / `gpt-image-1` — reliable paid path for photoreal architecture. |
| **Hugging Face** | `HF_TOKEN` | Inference Providers (e.g. FLUX.1-schnell). Free tier may exist with account token. |

Multi-provider CLI:

```bash
python scripts/regen/image_providers.py --list
python scripts/regen/image_providers.py --provider auto \
  --prompt "..." --out chats/screenshots-2026-08-11/test.jpg
```

Regen scenes still use DNA prompts; swap backend via env without changing DNA.
