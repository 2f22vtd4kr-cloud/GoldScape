---
name: Logo transparency — bake alpha, don't rely on mix-blend-mode
description: The EstateofMind nav logo showed a visible black rectangle on mobile; root cause and the fix pattern for any similar "black-background chrome text PNG" asset.
---

## Context

`artifacts/gory-resort/src/components/Navigation.tsx`'s logo image (`public/chrome/liquid/logo-estateofmind.png`, an AI-generated chrome/metallic text PNG) had **no alpha channel** — solid near-black (RGB ~1,1,1) background, no transparency — and relied on CSS `mix-blend-mode: 'screen'` on the `<img>` to visually fake transparency against the dark nav. This combo (mix-blend-mode + the nav's `backdrop-filter: blur(...)`) is fragile across browsers/mobile Safari and could render as a visible dark box instead of blending through.

**Why:** `screen(black, x) = x`, so blend-mode "transparency" only works if the renderer actually composites the blend against everything behind it in the right stacking context — backdrop-filter creates its own compositing context and this combination is known to be unreliable, especially on mobile.

**How to apply:** For any generated asset that's "content on a solid black/white background meant to look transparent," bake a real alpha channel into the PNG instead of using `mix-blend-mode` in CSS — it's the robust fix and works identically everywhere. Recipe (ImageMagick): make a grayscale copy of the image, then composite the original with the grayscale copy as opacity mask: `magick src.png -colorspace gray gray.png && magick src.png gray.png -alpha off -compose CopyOpacity -composite out.png`. This reproduces the same visual result as screen-blending against black (background → alpha 0, bright content → alpha ~255) but permanently, with no CSS trick required. Verify by compositing the result onto a non-black test color (not by eyeballing on a black canvas, where transparency is indistinguishable from "still black").
