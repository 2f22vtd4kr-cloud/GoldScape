# EstateofMind — Image Generation Playbook

> **HARD PRODUCT RULE (2026-08-11):** Generate **only** 3D isometric terrain / site maps («Птичий полёт»).  
> Do **not** generate exterior, section, floorplan, life, or bizarre AI property scenes.  
> Real listing photography comes from agency pages (`agencyPhotos`).

---

## Allowed assets

1. **Listing site map** — 1024×1024 isometric terrain chunk for the property location  
   - White studio background → `pnpm process-maps` → `*-nobg.png`  
   - Wire as `locationMap.image` in `listings.ts`

2. **Country terrain map** — same pipeline for country pages (`terrain-map-<country>-nobg.png`)

## Banned assets (never generate)

| Type | Why banned |
|------|------------|
| exterior | Inconsistent CGI, not the real building |
| section / Разрез | Hallucinated cutaways |
| floorplan AI art | Dollhouse voids / wrong massing |
| life_* | Lifestyle cosplay, not inventory |
| bizarre | Surreal set dressing, not real estate |

Runtime: `ACTIVE_SCENE_TYPES = ∅` in `scenes.ts`. `getScenesForListing()` returns only the terrain site scene.

## Terrain map checklist

- [ ] Isometric / bird-view geo tile (coast, streets, elevation as appropriate)
- [ ] No text / labels / numbers in the image
- [ ] White bg stripped (`process-maps`); use `filter: drop-shadow` not box-shadow on `.iso-tile`
- [ ] Building massing plausible for the real listing location — not floating mid-water
- [ ] Matches the same location as the real agency listing

## DNA system

`property-dna.ts` may still describe buildings for **terrain context** (where the pin sits).  
Do **not** use `buildPrompt(..., 'section' | 'bizarre' | ...)` to mass-produce banned carousel frames.

## Related

- `replit.md` — HARD PRODUCT RULE  
- `.agents/memory/scene-generation-terrain-only-ban.md`  
- `.agents/memory/belgrade-image-gen-rules.md`  
- `.agents/memory/terrain-map-transparency.md`
