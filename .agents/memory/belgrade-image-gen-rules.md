---
name: Belgrade property image generation rules
description: Style rules for AI-generated images. HARD BAN on exterior/section/life/bizarre — only 3D isometric terrain maps.
---

## HARD PRODUCT RULE (2026-08-11)

**ONLY 3D isometric terrain / site maps** («Птичий полёт»).

**DO NOT generate:** exterior, section (Разрез), floorplan AI art, life_*, bizarre.

See `scene-generation-terrain-only-ban.md`.

## Style rules (terrain maps only)
- **Master reference style**: 3D isometric terrain blocks — clean architectural / geo visualization, white or transparent studio ground after process-maps
- **No text**: never include text, labels, or annotations baked into images
- **No hand-drawn style**
- **No people**

## Carousel
- Slot 0 only in product UI: label = **Птичий полёт**, sublabel = 3D карта местности
- Source: `listing.locationMap.image` (processed terrain PNG)
- `ACTIVE_SCENE_TYPES` is empty — archived scene types are not shown

## UI
- Pulsating accent dot permanently removed from PropertyScenesCarousel
