---
name: Belgrade property image generation rules
description: Style rules and naming conventions for AI-generated property scene images (established from Belgrade property feedback)
---

## Style rules (what to generate)
- **Master reference style**: 3D isometric renders — clean architectural visualization
- **No text**: never include any text, labels, or annotations baked into generated images
- **No hand-drawn style**: avoid illustration/sketch aesthetic
- **No realistic human life scenarios**: no people in scenes (e.g. a man working at a computer desk, lifestyle photography)

## Carousel naming conventions (consistent across ALL properties)
- **Slot 0** (isometric location/site map): label = "Птичий полёт", sublabel = "Вид с высоты"
- **Exterior image**: label = "Экстерьер"
- **Section/cut**: label = "Разрез"
- **Floor plan**: single floor → label = "Планировка"; multiple floors → specify e.g. "Планировка · эт. 3"
- Do NOT call different scene types all generic "architecture" — each needs its own specific label

## UI: no pulsating dot
- The accent-colored pulsating dot in the lower-right of CrossfadeStage has been permanently removed from PropertyScenesCarousel.tsx

**Why:** User explicitly corrected generated images that used wrong styles; these rules prevent rework.
**How to apply:** Before generating any new scene images, check these rules. Before adding any new scene type, ensure its label is specific and consistent across all properties.
