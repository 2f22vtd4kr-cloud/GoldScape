---
name: Fixed-nav mobile clearance convention (EstateofMind)
description: The site's header is position:fixed and overlays page content; every top-of-page section must pad past it or its content gets visually clipped on mobile.
---

## Context

`artifacts/gory-resort`'s nav (`.eom-nav` in `src/index.css`) is `position: fixed; top: 0` with `z-index: 100`, so it floats over whatever section starts the page rather than pushing it down. On mobile the nav's effective height runs ~62-80px (padding + logo/menu-button height). Most top-of-page sections already compensate — `About.tsx` and `CountryPage.tsx` use `pt-28`, `Properties.tsx` uses `pt-32` — but `Home.tsx`'s hero was left at `pt-10` (40px), which let the fixed nav visually cover the top of the H1 and hide the eyebrow label entirely on mobile.

**Why:** Because the nav is fixed (not part of normal flow), there's no compiler/type-check signal when a section's top padding is too small — it only shows up visually, and only on mobile where the nav's menu-button height changes the math vs. desktop.

**How to apply:** Any new full-bleed top-of-page section (hero, page header, etc.) needs top padding of roughly `pt-24` to `pt-32` on mobile to clear the fixed nav — match the pattern already used in `About.tsx` / `CountryPage.tsx` / `Properties.tsx` rather than picking an arbitrary value. Verify visually on a mobile viewport screenshot, not just desktop, since the nav's mobile height differs from desktop.
