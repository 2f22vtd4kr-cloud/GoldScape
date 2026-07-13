---
name: Mobile-viewport screenshots and lazy-image timing in this environment
description: How to get real mobile-width screenshots for persona QA, and a false-positive to avoid when checking lazy-loaded images.
---

## Mobile screenshots
The built-in Screenshot tool has no viewport/device option (desktop only, 1280×720).
For mobile-width QA, launch `puppeteer-core` with
`executablePath: process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE` from a throwaway
script run via `node script.mjs` **from inside the target app's own workspace
directory** (e.g. `artifacts/gory-resort/`) — running it from `/tmp` or the repo root
fails module resolution for `puppeteer-core`. Delete the script after use.

**Why:** this is the only way to see what mobile users actually see (safe-area,
stacked layouts, hamburger menus); desktop screenshots alone missed real overflow/
overlap bugs in this project.

## False positive: blank images after fast scripted scrolling
Scrolling through a long page quickly (e.g. 400px steps with ~60ms pauses) and then
taking a `fullPage` screenshot can show later `loading="lazy"` images as blank/black,
even though they are wired correctly and load fine for real users. The scroll passed
by before each image's network fetch + decode finished.

**Why:** native `loading="lazy"` only starts the fetch once the element nears the
viewport; a fast programmatic scroll outruns that fetch.

**How to apply:** before concluding images are broken, re-check with a slower scroll
(pause ~300ms+ per step) and confirm via
`document.querySelectorAll('img')` → `img.complete && img.naturalWidth > 0` in
`page.evaluate` before screenshotting. Only treat it as a real bug if `complete` is
false or `naturalWidth` is 0 after that wait.
