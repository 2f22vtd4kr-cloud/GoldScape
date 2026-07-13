---
name: Cinematic Noir graduation decisions
description: Key design, type, and content decisions made when graduating the Cinematic Noir Canvas mockup into the live GORY Mountain Resort site.
---

## LanguageContext API
`useLanguage()` returns `{ language, setLanguage, t }`. The language state property is `language` (not `lang`). Call it once per component; do not call twice.

## Primary color
`--primary: 33 52% 58%` is the calibrated bronze gold for this project. Anything lower in lightness reads muddy on near-black backgrounds. WCAG contrast ~4.8:1 on `hsl(210 17% 5%)`.

## Gory dev server port
Vite runs on a random high port (currently 19679), not 5000. Always read the workflow log after restart to find the actual port before screenshotting.

## Playfair Display usage pattern
Added as `.font-playfair` CSS class (not inline style). Use it for editorial cinematic moments (Gallery header, Investment stat values). Keep Bebas Neue (`font-display`) for the GORY wordmark and section titles — the two coexist intentionally.

## Gallery expansion
Gallery has 12 images: 8 AI-generated Cinematic Noir terrain images (gallery-noir-1–8.jpg) plus 4 original resort images. Images are in `artifacts/gory-resort/public/images/`. Only row 1 uses `eager` loading; all others are `lazy`.

## Market validation framing
Rotana Hotels (Emirates, 100+ properties) acquired Gudauri June 2026. Frame as: "validates the Georgian ski corridor" — Gudauri is the competitor at 2,200m; GORY is at 3,042m (840m higher, 60% more natural snowfall). Never imply Rotana is at GORY.

## Georgia tax facts (confirmed)
- 0% capital gains tax on exit
- 15% corporate income tax (CIT)
- 5% dividend withholding tax
- Full foreign property ownership rights
- Previous content incorrectly stated "flat 20% corporate tax" — corrected in Sim #5.

**Why:** These numbers appear in investor-facing copy; incorrect tax rates undermine institutional credibility.
