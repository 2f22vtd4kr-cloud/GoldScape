---
name: Nav content-fit must be verified at the exact breakpoint width, not just "mobile" and "desktop"
description: A `hidden md:flex` / `md:inline-flex` nav can fit at 1024px+ but overflow right at 768px itself, pushing trailing icons (theme toggle, etc.) off-screen with no scrollbar to reveal it.
---

## The bug
`Navigation.tsx` showed the full desktop nav (4 links + a CTA pill) starting at Tailwind's
`md:` (768px). The trailing theme-toggle button was flush right in a `flex justify-between`
row. Content width (logo + links + CTA + toggle) exceeded 768px by ~50px, so the toggle
button was laid out past the right edge of the viewport — invisible, with no horizontal
scrollbar to reveal it (the row itself doesn't force page-level overflow).

**Why it went undetected:** desktop screenshots (1280px+) had plenty of room, and mobile
screenshots (< 768px) were on the hamburger-menu layout. Nobody screenshotted *exactly*
768px — the one width where the breakpoint flips content on but the viewport is still
narrow. Any `hidden {bp}:flex` nav is only safe at widths where `{bp}` classes are active;
"looks fine on mobile and desktop" does not imply "looks fine at the breakpoint boundary."

## Fix
Moved the breakpoint for showing the full desktop nav from `md` (768px) to `lg` (1024px),
so tablet-portrait widths keep the hamburger menu instead of a cramped/overflowing inline
nav. Verified with a scripted sweep across 320–1440px (see mobile-viewport-screenshots.md
for the puppeteer-core recipe) checking the trailing element's `getBoundingClientRect().right
<= window.innerWidth` at every width, not just a couple of screenshots.

**How to apply:** when adding or reviewing a `hidden {bp}:flex` nav/toolbar with multiple
inline items, measure total content width against the viewport at the exact `{bp}` value,
not just comfortably-above/-below it. Prefer bumping to a wider breakpoint (or shrinking
gaps) over guessing that "it'll probably fit."

## Related bug found in the same nav
The mobile dropdown menu (`absolute top-full`, sized to its own content) didn't reach
`min-h-screen`, so on a viewport where the menu's content was shorter than the screen, a
page element behind it (a hero CTA pill) sat exactly at the boundary and poked out from
under the menu's bottom edge — two chrome/pill buttons overlapping into what read as a
rendering glitch. Fixed by adding `min-h-screen` to the dropdown panel and locking body
scroll while it's open. Any absolutely-positioned "opaque overlay" panel needs an explicit
height guarantee — sizing to content is not equivalent to covering the viewport.
