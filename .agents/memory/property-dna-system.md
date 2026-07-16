---
name: Property image DNA system
description: Mechanism ensuring all scene images for one listing look like the same building — anchor block prepended to every prompt.
---

## Rule
Every generated scene image for a listing MUST use `buildPrompt(listingId, sceneType, sceneDesc)` from `src/data/property-dna.ts`. Never write an ad-hoc prompt.

## Why
Without a shared anchor, the AI invents a different building interpretation every call. The BBQ scene showed a stone parapet; the bizarre scene showed dark wood and brick in a grey void — unrelated to the white-render travertine-floor glass-railing building in the exterior shot.

## How to apply
1. Open `src/data/property-dna.ts` — one `PropertyDNA` entry per listing.
2. Call `buildPrompt(id, sceneType, sceneSpecificDescription)` — it prepends the anchor (building + site + landmark + interior + palette) and appends the camera convention and universal prohibitions.
3. Add the scene-specific description only — never re-describe the building or materials in the scene desc.
4. Generate with `resolution: 'high'`.
5. Review against Nika's 7-point checklist in `docs/IMAGE_GENERATION.md`.

## Adding a new property
Add a new `PropertyDNA` entry to `PROPERTY_DNA` in `property-dna.ts`. Generate the exterior first; use its output to validate/sharpen the anchor before generating the rest.

## Proof of concept
p18 Dobrota / Kotor Bay was the first full set generated with this system. BBQ and Bizarre scenes previously showed a completely different building + wrong materials. After DNA: all five scenes show the same white-render, glass-railing, travertine-floor building with Gospa od Škrpjela island always visible in the bay.

## Key anchor fields
- `building`: exact facade material, era, roof, window frame type, balcony rail type, one unique identifying detail
- `site`: immediate surroundings at ground level
- `landmark`: the ONE distinctive view through every main window — precise enough to render identically every run
- `interior`: floor, walls, ceiling, frame color — shared across ALL interior scenes
- `palette`: 5–7 specific named colors (not generic "white/blue/beige")

## Anchor block structure (from buildAnchor())
```
THE PROPERTY ({name}):
{building}

THE SITE:
{site}

THE LANDMARK — visible through every south/west-facing window and from every terrace:
{landmark}

THE INTERIOR (all rooms share these materials):
{interior}

PALETTE:
{palette}
```

## PROHIBITIONS constant (always appended)
NO text/labels/numbers/annotations. NO human figures (except life_* when brief adds people explicitly). NO sketch/illustration style. NO void backgrounds. Photorealistic 3D render, ultra-high detail.
