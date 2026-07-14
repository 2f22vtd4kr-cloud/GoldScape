---
name: screen blend-mode over a black page background does not hide near-black image backgrounds
description: mix-blend-mode:screen was used to "hide" chrome/liquid asset backgrounds against dark sections, but screen(color, black) = color — it does nothing on a true-black backdrop, so any non-pure-black pixel in the source (compression artifacts, faint gradient) stays visible as a square/box.
---

Screen blend math: `screen(a, b) = 1 - (1-a)(1-b)`. When the backdrop `b` is pure black (0),
this reduces to `screen(a, 0) = a` — the source pixel is rendered completely unchanged. So
`mix-blend-mode: screen` only "erases" a background that is *exactly* `#000000`; any source
image with a near-black-but-not-quite background (common in AI-generated or JPEG-compressed
assets) will show that residual tone as a visible box/edge against a true-black CSS background.

**Why this matters:** this project's numbered process-step icons (`chrome-num-01..04.png`)
were baked RGB PNGs with a near-black (not pure #000) square canvas, composited with
`mix-blend-mode: screen` — which looked like it should hide the background but didn't, and
produced visibly "boxed" numerals. The effect is most visible in dark mode against a true
`#000`/`#080808` section background; it's subtler (but still present) in light mode.

**How to apply:** don't reach for `mix-blend-mode: screen` to fake transparency on a baked
dark background. Either source/generate real alpha-channel PNGs, or convert existing RGB
assets with a luminance-keyed alpha matte (threshold + feather ramp) using `sharp` — install
it as a temporary devDependency (`pnpm add -D sharp --filter <pkg>`), run a one-off Node
script that sets alpha based on per-pixel luminance (0 below a low threshold, 255 above a
high threshold, linear ramp between), then `pnpm remove -D sharp` once done. Verify by
compositing the result over a saturated test color (e.g. magenta) — never trust a preview
tool that itself renders on a black canvas.
