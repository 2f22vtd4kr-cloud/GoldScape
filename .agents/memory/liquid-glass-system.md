---
name: Liquid Glass System
description: visionOS-inspired volumetric glass tiers, performance rules, accessibility fallbacks, and boundary vs liquid chrome.
---

# Liquid Glass System — EstateofMind

## Role
Glass is for **floating chrome over content**: nav, icon buttons, filter chips, occasional cards/modals.
It is **not** the primary brand material. Liquid **chrome** (metal gradients, specular, metal rim) owns CTAs, switches, type accents, and decorative shapes.

## Tiers (`src/index.css`)

| Class | Use |
|-------|-----|
| `.liquid-glass` | Base volumetric glass (blur + saturate + inset specular) |
| `.liquid-glass-neutral` | Near-clear; icon buttons / toggles |
| `.liquid-glass-tinted` | Soft iridescent film; panels / cards |
| `.liquid-glass-iridescent` | Stronger pink→indigo→cyan film; Focus-style pills |
| `.liquid-glass-interactive` | Hover lift / active press on any of the above |
| `.glass-icon-btn` | Compact circular glass control |
| `.glass-filter-select` | Filter / select surfaces |

## Physical recipe
1. `backdrop-filter: blur() saturate() brightness()` — frost + vibrancy  
2. Inset top highlight — “caught light”  
3. Inset bottom shadow — thickness  
4. Hairline light border (stronger on top)  
5. Soft outer shadow for lift  

Always ship `-webkit-backdrop-filter` alongside `backdrop-filter`.

## Performance rules
- Prefer **blur 12–16 px** on large surfaces; nav was intentionally trimmed from heavier values for scroll FPS.
- Keep **≤ ~3** simultaneous large blurred surfaces in view.
- **Never** animate `backdrop-filter`; animate `opacity` / `transform` only.
- Avoid `overflow: hidden` on parents of glass nodes (use `overflow: clip` if clipping is required).
- Chrome controls (`.chrome-surface*`, ChromeSwitch, metal rim) must **not** add another `backdrop-filter`.

## Accessibility fallbacks
- `@supports not (backdrop-filter…)` → high-alpha solid fills (readable without blur).
- `@media (prefers-reduced-transparency: reduce)` → drop blur, raise opacity.
- Text contrast must hold against the solid fallback, not only against the blurred backdrop.

## Glass vs Chrome boundary
| Material | Mechanism | Examples |
|----------|-----------|----------|
| **Glass** | backdrop blur + tint + inset light | Nav, icon buttons, filter chips |
| **Chrome** | metallic gradients + specular + optional sheen/rim | Theme switch, oilslick CTA rim, `.chrome-text`, ChromeShape |

Do not mix a heavy glass fill with a chrome control’s own backdrop blur. Chrome sits *on* glass (e.g. switch in nav), it does not become glass.

## Related
- `liquid-chrome-textures.md` — metal utilities  
- `liquid-chrome-typography.md` — type  
- `gas-spill-chrome-system.md` — decorative shapes  
- `backdrop-blur-bleed-through.md` — known bleed issues  
