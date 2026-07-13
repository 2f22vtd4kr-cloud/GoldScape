---
name: Translucent + backdrop-blur panels over bright/animated content can bleed through
description: A semi-transparent, blurred panel (mobile nav dropdown, sticky bars) sitting over bright hero content leaked the content through at much higher visibility than the opacity math implies — found via computed-style + isolation testing, fixed by going fully opaque.
---

## What happened
EstateofMind's mobile nav dropdown (`bg-[#080808]/95 backdrop-blur-xl`) sat directly
over the animated hero (bright chrome-blob + large white headline). Screenshots showed
the hero headline clearly bleeding through and colliding with the menu links, even
though computed styles confirmed `background: rgba(8,8,8,0.95)` and
`backdrop-filter: blur(24px)` were applied correctly.

## Diagnosis method
Isolate the two properties with `page.evaluate` overrides on the live element:
1. As-is → leak visible.
2. `backdropFilter: 'none'`, opacity unchanged → still leaked (rules out blur alone).
3. Fully opaque `backgroundColor` + `backdropFilter: 'none'` → clean, no leak.
This confirms the *combination* of translucency + backdrop-filter is the unreliable
part, not just one property in isolation.

**Why:** don't assume "computed style looks right" means "renders right" for
backdrop-filter — verify visually and by elimination when a panel needs guaranteed
legibility over unpredictable/bright/animated backgrounds.

**How to apply:** for any overlay panel (nav dropdowns, sticky bars, cards) whose job
is to guarantee text legibility over bright or animated content — especially on
mobile nav menus every visitor uses — prefer a fully opaque background over a
translucent-blurred one. Reserve translucent/blurred panels for spots where the
backdrop is already dim/low-contrast (glow at ~10-15% opacity, dark photography),
where any residual bleed-through is negligible.
