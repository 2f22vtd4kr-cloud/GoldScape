# Visual regression checklist — liquid-chrome design pass

Generated: 2026-08-11T14:55:00Z

After commits:
- Home featured + Properties filters (chrome / glass)
- PropertyDetail chrome polish
- CountryPage isometric glass frame
- Mobile ≥44px + glass budget

## Automated baselines

Previous image baselines live under `chats/screenshots-2026-08-11/` (43 scene files).
This pass is **UI chrome/glass**, not PropertyDNA scene regeneration — scene hashes should be unchanged.

## Manual checklist (run on local / Replit)

### Home
- [ ] Hero: chrome-text headline + liquid blob; no purple mesh
- [ ] Destinations: prices read as metal (eom-card-price), not flat white
- [ ] Featured: eom-card photo stage, platinum price on image, 4:3 crop
- [ ] Testimonials: glass panels (testimonial-card / liquid-glass-tinted)
- [ ] Trust stats: chrome-text numbers
- [ ] Mobile: featured cards full-width, press scale subtle, no horizontal scroll

### Properties
- [ ] Catalogue title chrome-text
- [ ] Sticky filter: glass surface; mobile uses neutral (lighter blur)
- [ ] USDT / ВНЖ: ChromeSwitch metal thumbs, ≥44px label hit area
- [ ] Grid: PropertyCard cinematic hierarchy intact
- [ ] Empty filter state: readable, primary CTA works

### Property detail
- [ ] Hero framed as eom-card; price chrome / eom-card-price
- [ ] Analysis cards: liquid-glass-tinted, not flat #0a fills
- [ ] Bird-view carousel heading chrome-text
- [ ] CTA oilslick + metal rim
- [ ] Entrance reveal still plays from catalogue click

### Country
- [ ] Name + entry price chrome-text
- [ ] Isometric map: drop-shadow, no box-shadow clip on .iso-tile
- [ ] Map caption: liquid-glass pill
- [ ] Feature cards: liquid-glass-tinted + chrome-surface icons
- [ ] Trust strip: liquid-glass-neutral

### Cross-cutting
- [ ] Dark + light mode: chrome legible on both (no invert smear on logo)
- [ ] prefers-reduced-motion: sheen / rim spin frozen
- [ ] prefers-reduced-transparency / no backdrop-filter: solid fallbacks
- [ ] ≤3 large blurred surfaces in view on mobile
- [ ] No Inter / purple mesh / generic checkbox brand filters

## Anti-slop (frontend-design skill)

If any surface looks interchangeable with a SaaS template, revise before shipping screenshots.

## Next screenshot command (when workflows up)

```bash
# settle React 19 concurrent paint, then capture
# never flushSync around createRoot.render
```

See `.agents/memory/react19-flushsync.md` and `hero-loading-state.md`.
