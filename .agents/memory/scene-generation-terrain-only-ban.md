---
name: Scene generation HARD BAN — terrain only
description: Product rule 2026-08-11. ONLY 3D isometric terrain/site maps. Never generate exterior, section, floorplan, life, or bizarre AI property renders.
---

# HARD BAN — AI property scene renders

## User / product decision (2026-08-11)

**Keep only 3D isometric terrain chunks** (listing-map / terrain-map style — extruded geo tile, bird-view «Птичий полёт»).

**Remove / never generate:**
- exterior CGI
- section cutaways (Разрез)
- floorplans as AI art
- life_* lifestyle scenes
- bizarre scenes (monofin, tiger, American Psycho, Tesla coil, etc.)

These look inconsistent and do not represent the real agency listings.

## Code lock
- `artifacts/gory-resort/src/data/scenes.ts`
  - `ACTIVE_SCENE_TYPES = new Set([])`  // empty
  - `getScenesForListing()` returns only the site terrain map injected from `locationMap.image`

## What agents MAY generate
- Isometric **terrain / site maps** (white studio bg → process-maps → nobg)
- Country **terrain-map-*-nobg.png**

## What agents must NEVER generate
- Any AI “photo” of a building facade, interior cutaway, floorplan dollhouse, or surreal room scene for the carousel

## Real photography
Use `agencyPhotos` from real agency listing pages for the photo gallery.

## Docs that must stay in sync
- `replit.md` — HARD PRODUCT RULE section
- `docs/IMAGE_GENERATION.md` — terrain-only
- This memory file

**If a user asks to “regenerate scenes” without specifying terrain maps, assume they mean terrain maps only — or ask. Do not revive banned types.**
