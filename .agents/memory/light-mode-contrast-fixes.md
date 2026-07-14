---
name: Light-mode contrast fixes for a dark-mode-first design (EstateofMind)
description: Three related root causes behind "light mode looks broken/washed out" complaints on a site designed dark-first, and the scoped fixes that don't disturb dark mode.
---

## 1. `text-foreground/NN` opacity utilities tuned for dark mode, reused in light mode
Utilities like `text-foreground/40` give very different contrast depending on theme:
the same alpha fraction over near-black (dark mode: white text) reads much higher
contrast than over near-white (light mode: near-black text), because alpha-blending
against light backgrounds compresses contrast faster. A site with dozens of
`dark:text-white/NN text-foreground/MM` pairs copied from dark-mode tuning will look
"~90% unreadable/faded" in light mode even though nothing is "broken."

**Why:** verified numerically with a WCAG relative-luminance contrast calculation —
e.g. dark-mode `/40` ≈ 3.7:1 vs. the naively-reused light-mode `/40` ≈ well under 3:1.

**How to apply:** don't hand-edit every className. Add one scoped CSS override block
(`html:not(.dark) .text-foreground\/NN { color: <boosted-alpha-value> !important; }`
for each `/NN` value in use) that only fires in light mode, computed so each value
clears ~4.5:1 against the actual light background color. Cheap, safe, doesn't touch
dark mode.

## 2. Decorative gradient text-clip (chrome/metallic headings) needs a legibility floor
A `background-clip: text` gradient with light stops (tuned to glint against a dark
background) can drop under 2:1 contrast against a light background at certain
positions in the gradient sweep — multi-word headings go illegible wherever letters
land on the gradient's lightest trough, not uniformly. Looks like a random/intermittent
bug (fine in some screenshots, invisible in others) because it depends on
`background-position` at capture time, not on any code path difference.

**How to apply:** rebuild the light-mode gradient so every stop stays under an
absolute max lightness (~5:1+ against the known background), not just "make it darker
overall." Verify by screenshotting the same heading at several scroll/animation
positions, not once.

## 3. `invert()` + `hue-rotate(180deg)` icon trick only works on near-grayscale art
A common CSS trick for recoloring a dark logo/icon for light backgrounds is
`filter: invert(1) hue-rotate(180deg)`. It only produces a clean result on
near-grayscale source art. On a saturated multi-hue image (e.g. an iridescent chrome
PNG), it produces a streaky rainbow glitch instead of a clean dark version.

**How to apply:** for saturated/colorful source art, use `grayscale(1) brightness(X)
contrast(Y)` instead (desaturate + darken) — matches how this project's `.chrome-text`
gradient was already handled for light mode, so keep the two consistent.

## Related: mix-blend-mode wash-out is a 4th, separate failure mode
See `logo-mixblend-vs-alpha.md` — same asset class (chrome/iridescent PNG on a themed
background), different mechanism: `mix-blend-mode: multiply` against a near-white
background makes the image's *brighter* pixels blend to invisible, not just look dim.
If a logo/icon "disappears" only on light backgrounds and its filter isn't the
invert+hue-rotate trick above, check for a lingering mix-blend-mode rule next.
