# EstateofMind

A real estate brokerage website for Russian-speaking clients investing in international property (UAE, Turkey, Cyprus, Georgia, Thailand, Serbia, Montenegro). Built for capital preservation investors navigating tight Russian financial restrictions.

## Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + shadcn/ui (`artifacts/gory-resort`)
- **Backend**: Express 5 + Drizzle ORM (`artifacts/api-server`)
- **Canvas/mockup sandbox**: Vite isolated component previews (`artifacts/mockup-sandbox`)
- **Package manager**: pnpm workspaces (monorepo)

## Running the project

Dependencies are installed at the workspace root:

```bash
pnpm install
```

Workflows start automatically:
- **Frontend** (port 5000): `pnpm --filter @workspace/gory-resort run dev`
- **API server** (port 8080): `pnpm --filter @workspace/api-server run dev`
- **Mockup sandbox** (port 8081): `PORT=8081 pnpm --filter @workspace/mockup-sandbox run dev`

## Project structure

```
artifacts/
  gory-resort/       # React frontend (the main website)
  api-server/        # Express API backend
  mockup-sandbox/    # Component preview server for canvas work
libs/                # Shared workspace libraries (api-zod, db, api-client-react, etc.)
scripts/             # Post-merge and utility scripts
PERSONAS.md          # Visitor persona roster for UX review
```

## Session log

### July 14, 2026 — Mobile/tablet nav overflow fix (theme toggle off-screen)

**Bug report:** on mobile, the light/dark toggle button was invisible — pushed past the
right edge of the screen.

**Root cause 1:** `.eom-btn-oilslick` (the "Консультация" nav CTA) declared its own
`display: inline-flex`, which won the CSS cascade over Tailwind's `hidden` utility (same
specificity, declared later in `index.css`). The button stayed visible on mobile, pushing
the theme toggle and hamburger off-screen. Fixed by removing the conflicting `display`
declaration from `.eom-btn-oilslick` and letting `Navigation.tsx`'s `hidden lg:inline-flex`
fully control visibility.

**Root cause 2:** even after that fix, the desktop nav (links + CTA) didn't actually fit
in the viewport right at 768px (a common tablet-portrait width) — content overflowed by
~50px, pushing the theme toggle off-screen again, just at a different breakpoint. Moved the
breakpoint that reveals the full desktop nav from `md` (768px) to `lg` (1024px) in
`Navigation.tsx`, so tablets keep the hamburger menu. Verified with a scripted sweep across
320–1440px — the theme toggle now stays fully visible at every width.

**Related bug found during the sweep:** the mobile dropdown menu only sized itself to its
own content, so on the home page the hero's "Подобрать объект" CTA (positioned behind it in
normal page flow) poked out from under the menu's bottom edge, visually overlapping into a
double-pill glitch. Fixed by adding `min-h-screen` to the dropdown panel and locking body
scroll while the menu is open.

See `.agents/memory/nav-breakpoint-content-fit.md` for the full writeup and the testing
lesson (screenshot the exact breakpoint width, not just "mobile" and "desktop").

### July 14, 2026 — Liquid Glass system hardening + blob animation

#### Nika design review (5 findings fixed)

Ran the full Nika god-tier web designer persona pass (per `PERSONAS.md`) with desktop + mobile screenshots and competitive research (Awwwards, CSS-Tricks liquid glass, Sotheby's International Realty).

**Finding 1 — Glass invisible on dark backgrounds.**  
`backdrop-filter: blur()` on a pure-black hero returns black — no refraction, no depth. Fixed by strengthening `liquid-glass-neutral` background fill from `rgba(255,255,255,0.13)` to `rgba(255,255,255,0.22)` at the top of the radial gradient, making it self-luminous regardless of what's behind it.

**Finding 2 — Rectangle buttons kill the specular arc illusion.**  
`border-radius: 8px` makes the inset specular look like a flat 1px separator, not light catching a curved surface. Added `.hero-cta-pill` utility class (`border-radius: 50px`) and applied it to both hero CTAs in `Home.tsx` (ПОДОБРАТЬ ОБЪЕКТ + НАПИСАТЬ В WHATSAPP only — other button usages unchanged).

**Finding 3 — Specular highlights were too weak to see.**  
Primary button inset specular raised from `rgba(255,255,255,0.55)` → `0.70`. Ghost button from `0.22` → `0.55`. Both now visible from arm's length on mobile.

**Finding 4 — Ghost button had no self-contained color (borrowed-refraction-only).**  
Over black hero the ghost was invisible as a glass object. Added a faint iridescent linear fill (white → indigo → sky → white) + soft ambient halo (`0 0 18px rgba(150,130,255,0.06)`) so it reads as a physical object even without interesting background content.

**Finding 5 — Nav КОНСУЛЬТАЦИЯ was a rectangle on mobile.**  
`.eom-btn-oilslick` converted to pill (`border-radius: 50px`), specular arc raised to `rgba(255,255,255,0.45)`. The oilslick gradient animation now reads as a genuine curved glass object in the mobile nav.

#### Hero blob animation upgrade

**Slow organic float.** Replaced `animate-float` (7s simple up/down) on the hero blob wrapper with a new dedicated `hero-blob-float` class using `heroBlobFloat` keyframe — 22s cycle, 6 waypoints combining `translateY` (up to −26px), `translateX` drift (±14px), rotation (±3.6°), and scale breathing (1.0→1.038) for a lazy zero-gravity figure-8 path.

**Full-spectrum color flow.** Upgraded `gasoline-hue-drift` from a 22s, 50°-range hue rock to a 28s full 360° sweep with saturation breathing (115%→195%) and per-keyframe drop-shadow color shifts (violet → magenta → cyan → emerald → indigo → purple → amber). Colors appear to travel *through* the chrome body rather than tinting the whole shape.

**Mobile color-flow fix.** The mobile hero blob had `filter: 'blur(0.5px)'` set as an inline style on the `<img>`, which silently overrode the CSS animation's `filter` property, leaving the mobile blob a static grey. Moved the blur to a wrapper `<div>` so the `gasoline-hue-drift` animation now reaches the image on mobile too.

### July 14, 2026 — Nika review: light mode "10% changed" + nav scroll jank (6 findings fixed)

Ran another Nika pass against two complaints: light mode only visibly changes a small
fraction of the screen, and the nav/logo feel janky while scrolling.

**Finding 1 — Body text opacity utilities were dark-mode-tuned, reused in light mode.**
Nearly every section (property cards, "Для кого мы работаем," testimonials, process
steps, trust stats) uses a `dark:text-white/NN text-foreground/MM` pairing. The same
alpha fraction gives much lower contrast blended against near-white than against
near-black, so most secondary text sat under ~2:1 contrast in light mode — this is the
real reason light mode "only changed the hero." Fixed with a scoped
`html:not(.dark) .text-foreground\/NN` override block in `index.css` that boosts alpha
per value in light mode only (values chosen by computing WCAG contrast ratios), leaving
dark mode untouched.

**Finding 2 — `.chrome-text` gradient (metallic headings) had no legibility floor.**
Light-mode chrome heading gradient's lightest stops (~`#b8b4b0`) dropped to ~1.9:1
against the warm-white background — multi-word headings like "СВОБОДА КАПИТАЛА" went
illegible wherever letters landed on the lightest part of the sweeping gradient.
Rebuilt the gradient with every stop capped below ~`#6c6c68` (5.3:1+).

**Finding 3 — Nav logo went rainbow-streaky in light mode.**
The light-mode logo filter used the classic `invert() + hue-rotate(180deg)` icon trick,
which only works cleanly on near-grayscale art — this logo is a saturated iridescent
chrome PNG. Replaced with `grayscale() brightness() contrast()` (matches how
`.chrome-text` is already handled for light mode).

**Finding 4 — Footer logo washed out AND was squashed into a tiny icon (both themes).**
Two separate bugs: (a) a leftover `mix-blend-mode: multiply` on `.footer-logo` blended
the image's brighter iridescent pixels into invisibility against the light footer
background; (b) the `<img>` had no `object-fit`/explicit width, so the square
1024×1024 source PNG rendered as a squashed 28×28 icon instead of showing the wordmark
band — present in dark mode too, just less noticeable. Removed the mix-blend-mode,
added `object-fit: cover` + explicit width to crop to the wordmark, and applied the
same grayscale/darken filter as the nav logo for light mode.

**Finding 5 — Broken property photo.** The Turkey/Antalya card in "Актуальные объекты"
referenced a non-existent `prop-turkey.jpg`; corrected to the real `prop-antalya.jpg`.

**Finding 6 — Nav scroll jank root cause wasn't the padding transition itself.**
`.eom-nav`'s `transition: all` was inadvertently sweeping an expensive
`backdrop-filter: blur(22px) saturate(210%)` on every scroll-driven padding change.
Fixed by transitioning explicit properties only, promoting the nav to its own
compositor layer (`transform: translateZ(0)`), trimming the blur/saturate values, and
rAF-throttling the scroll listener.

All fixes verified settled (post-animation) across desktop (1280px) and mobile (390px),
both themes — no regressions. See `.agents/memory/light-mode-contrast-fixes.md` and
`.agents/memory/mobile-viewport-screenshots.md` for the reusable lessons (alpha-blend
asymmetry between themes, and how fast scripted scrolling produces false-positive
"broken" screenshots of reveal/count-up animations mid-flight).

---

## User preferences
