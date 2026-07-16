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

## Step-by-Step: Generating a Scene

```typescript
import { buildPrompt } from '@/data/property-dna';

// 1. Pick the scene type (must match a key in cameraByType or fall back to 'default')
const sceneType = 'life_bbq';

// 2. Write only the scene-specific description — what is happening, objects, mood.
//    Do NOT describe the building, site, or materials here — those come from the anchor.
const sceneDesc = `
  BBQ evening on the second-floor terrace. A large outdoor grill with glowing charcoal
  and skewers of meat smoking. Long wooden dining table set for eight with terracotta
  plates, wine glasses, olive branches as centrepiece. Warm Edison-bulb string lights
  strung above. Blue-hour sky — deep cobalt above, salmon-pink at the horizon over the
  bay. The Gospa od Škrpjela island glows with warm reflected light across the water.
`;

// 3. Build the full prompt
const prompt = buildPrompt(18, sceneType, sceneDesc);

// 4. Generate
await generateImage({
  prompt,
  outputPath: 'artifacts/gory-resort/public/images/scenes/p18-bbq.jpg',
  resolution: 'high',
});
```

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
