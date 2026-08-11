---
name: Liquid Chrome Texture System
description: Shared CSS surface treatments, specular layers, sheen, and metal-rim for EstateofMind chrome identity. No WebGL by default.
---

# Liquid Chrome Textures — EstateofMind

## Principles
1. **Liquid chrome is the core material language** — not frosted glass, not flat metal.
2. **CSS first.** Gradients + layered specular + optional grain. Zero `backdrop-filter` on chrome controls (nav already pays that cost).
3. **WebGL is optional accent only** (e.g. future metal-fx ring on a single CTA). Always provide CSS fallback and respect `prefers-reduced-motion`.
4. **Mobile-safe.** No full-viewport liquid shaders. Keep animated surfaces small (thumbs, pill rims).

## Utility classes (`src/index.css`)

| Class | Role |
|-------|------|
| `.chrome-surface` | Raised polished chrome fill + bevel shadows |
| `.chrome-surface-well` | Recessed dark metal track |
| `.chrome-specular` | `::before` primary hotspot (upper-left light) |
| `.chrome-grain` | `::after` subtle film-grain grit |
| `.chrome-sheen` | Slow diagonal light sweep (child `<span />`) |
| `.chrome-metal-rim` | Animated conic liquid-metal edge (CSS stand-in for WebGL ring) |

## Components
- **`ChromeSwitch`** — reusable binary control; uses well + specular stack + sheen.
- **`ChromeThemeToggle`** — thin wrapper over `ChromeSwitch` with Sun/Moon icons.
- **Oilslick CTA** (`.eom-btn-oilslick.chrome-metal-rim`) — consultation button gains spinning metal rim.

## Specular recipe (thumbs / small disks)
1. Multi-stop body gradient at **145°**
2. Primary radial hotspot ~32% / 26%
3. Secondary soft fill at center
4. Bottom Fresnel rim gradient
5. Inset top highlight + bottom shadow + outer contact shadow
6. Optional `.chrome-sheen` (5.5s sweep, disabled under reduced-motion)

## Spring physics (switches)
- Thumb: `stiffness 380 / damping 30 / mass 0.85` → ζ ≈ **0.83**
- Icon: `stiffness 520 / damping 28` → ζ ≈ **0.61**

## When to escalate to WebGL
- Single primary CTA that needs “alive” flowing metal bands
- Logo treatment for a campaign moment
- Prefer libraries that pause off-screen and honor reduced-motion (`metal-fx`, Paper LiquidMetal)
- Never stack multiple WebGL surfaces with the fixed nav blur

## Related memory
- `liquid-chrome-typography.md` — type treatments
- `gas-spill-chrome-system.md` — decorative shape system
- `chrome-text-contrast-floor.md` — legibility floors
