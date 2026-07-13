---
name: Gas-spill liquid chrome system
description: Enhanced ChromeShape decorative system (smoother liquid shapes, oil-slick multi-hue palette, new multi-tendril "spill" variant) built on Canvas for EstateofMind, pending user approval to graduate.
---

Built a "Liquid Spill" upgrade to the site's decorative chrome shape system on Canvas
(`artifacts/mockup-sandbox/src/components/mockups/liquid-spill/`), comparing against a
faithful "Current" baseline extracted from the real `Home.tsx` hero/why-us/CTA sections.

**Key design decisions:**
- The original `ChromeShape.tsx` iridescent palette was monochrome purple/violet only.
  The new palette (`ChromeShapeSpill.tsx`) sweeps a true oil-slick range: deep core →
  violet → electric blue → cyan hot-spot → magenta-pink → warm gold → violet → teal.
  Applied consistently across all shape variants (blob/star4/spike/ring/orb/drip) via
  the shared `ChromeStops` gradient def, not just one accent color.
- Added a new `spill` variant: a multi-tendril splash shape built from petal-shaped
  cubic-bezier curves radiating from a rounded core at varying angle/length/width —
  reads as liquid metal frozen mid-drip, matching the Softulka "Wavy Chrome" reference
  pack. Generator function `petalPath()` computes bezier control points from polar
  angle/length/width at render time — no hardcoded SVG paths needed for this style.
- Generated two raster hero-scale assets (`chrome-spill-hero.png`, `chrome-spill-small.png`)
  via `generateImage` with `removeBackground: true` for the main hero visual, since
  raster achieves smoother photoreal chrome at large sizes than SVG; kept the SVG
  `spill` variant for small/cheap animated accents elsewhere on the page.
- New CSS glow (`.gas-spill-glow`) replaces `.iridescent-spill`'s narrow warm-purple
  conic sweep with the same broadened oil-slick hue range, for background blur glows.

**Why:** user supplied Softulka "3D Chrome Shapes" + "Wavy Chrome" reference images and
asked for "smoother liquid chrome with gas spill elements" — the existing shapes were
already smooth/photoreal at the raster hero level but the SVG accent shapes (star/spike)
read as flat/graphic and the iridescent color was single-hue, not gas-spill/oil-slick.

**How to apply:** if graduating this to the live site, use `mockup-graduate` — copy
`ChromeShapeSpill.tsx` improvements back into `artifacts/gory-resort/src/components/ChromeShape.tsx`
(or add as a new variant/palette option), copy the two new PNGs into
`artifacts/gory-resort/public/chrome/` (already pre-copied there), and port the new CSS
classes into `artifacts/gory-resort/src/index.css`. Apply across Home, About, and
Properties pages' decorative accents, not just the hero, for consistency.
