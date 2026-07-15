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

### July 15, 2026 — Re-import setup (round 2)

Project was re-imported again with all 3 workflows failing (no `node_modules`).
Ran `pnpm install` at the workspace root, confirmed `DATABASE_URL` was already
provisioned and `drizzle-kit push` reported no pending schema changes, then
restarted all 3 workflows. Verified with a screenshot — homepage renders
correctly. No code changes needed.

### July 15, 2026 — Re-import setup + ongoing persona sim (round 1)

**Re-import setup:** project was re-imported from GitHub with all 3 workflows failing
(no `node_modules`). Ran `pnpm install` at the workspace root, confirmed
`DATABASE_URL` was already provisioned and `drizzle-kit push` reported no pending
schema changes, then restarted all 3 workflows. Verified with desktop + mobile
screenshots — site renders correctly, no code changes were needed for this part.

**Persona sim run (per `PERSONAS.md`), round 1 — desktop + true mobile-viewport
(390px) screenshots across Home, Properties (+ filters), PropertyDetail, About,
Compare, Favorites, and 4 country pages (AE/TR/CY/GE), plus a 768px tablet nav
check and a light-mode pass:**

- **Fixed:** the mobile tax-comparison table (`TaxGuide.tsx`, "Краткое сравнение")
  is wider than the 390px viewport by design (`overflow-x-auto` + `min-w-[560px]`)
  so users can swipe to see the ВНЖ/Капитал columns, but there was no visual
  affordance — it looked like the table just ended. Added a right-edge gradient
  fade (`sm:hidden`) plus a small "← Листайте таблицу для всех колонок" hint
  below the table on mobile only.
- **Verified working, no changes needed:** property filters (country/type/price/
  beds) correctly narrow the 16-listing catalogue (tested via scripted `<select>`
  changes, e.g. GE filter: 16 → 2 cards); card click → detail page navigation;
  mobile hamburger menu (no overflow at 390px or the 768px tablet breakpoint);
  light mode on Home + Properties; testimonials (named, city-tagged) and team
  section (named individuals with initials avatars, not stock photos) already
  satisfy Viktor/Irina's trust-signal requirements from `PERSONAS.md`.
- Sim is ongoing per user request ("non-stop", both viewports) — later rounds
  will append here rather than duplicating this section.

**Round 2** — segment-by-segment mobile scroll sweep (PropertyDetail, CountryPage
AE, Home) covering sections not visible above the fold: PropertyDetail's
"Район"/"На что обратить внимание"/"Перевод капитала"/commission sections,
CountryPage's tax + CTA + footer sections, Home's stats/testimonials/footer.
No new defects found — layout, spacing, and footer/nav boundaries hold up at
every scroll position checked. The recurring `GET /` 404s seen in the API
server log during this sim are not caused by the frontend (grepped — no
frontend code calls the API server); harmless and unrelated to page browsing.

**Round 3** — stateful interaction testing (favorite + compare toggled via
scripted clicks, not just static screenshots): populated Favorites and Compare
pages render correctly with real listing data; the floating compare pill
(bottom-left) persists correctly across Favorites/Compare/404 without
overlapping the WhatsApp bubble (bottom-right); the 404 page matches brand
styling with a working "На главную" CTA; PropertyDetail's "similar listings"
strip at the very bottom renders correctly. Checked for JS console/page errors
across all of the above — none found. No defects found this round; sim
coverage across the site is now broad (all routes, both primary viewports,
tablet breakpoint, light mode, and key stateful interactions) with only the
one real fix from round 1 (mobile tax-table scroll hint).

### July 14, 2026 — Hero visual cleanup (contour frame, spiky blob, glow fade, transparent numerals)

**Requests:** desktop homepage hero looked unpolished — remove the spiky corner "contour
frame" SVG, remove the pointy iridescent hero blob image, make the colorful glow behind it
bigger with a seamless fade to black (no visible ring), animate that glow so its shape
slowly morphs (desktop + mobile), and fix visible black squares behind the "01–04" process
step numerals. Also audit the rest of the desktop site for similar issues.

**Changes:**
- Removed `ChromeHeroFrame` (the spike/web/star SVG frame) and the `blob-iridescent-1.png`
  hero image entirely from `Home.tsx` — the glow is now the sole hero visual, on both the
  `lg:flex` desktop block and the `lg:hidden` mobile block.
- `.hero-glow-spill` in `index.css`: replaced the two-stop hard-edged radial mask with a
  6-stop gradual one, increased blur (70px→110px desktop, added a 60px mobile variant),
  and added a `hero-blob-morph` keyframe animating `border-radius` on the `::before` conic
  layer (composed with the existing rotation) so the mass reads as a living, slowly
  reshaping blob rather than a spinning disc. Enlarged from `560px` to `760px` desktop and
  `120vw`→`150vw` mobile.
- Removed the now-dead `hero-blob-float` / `hero-blob-gasoline` / `hero-tilt-wrap` CSS and
  the `heroTiltRef` mouse-tilt logic in `Home.tsx` (only the glow keeps mouse parallax now).
- Regenerated `chrome-num-01..04.png` as true alpha PNGs (luminance-keyed matte, see
  `.agents/memory/screen-blend-black-bg.md`) instead of relying on `mix-blend-mode: screen`,
  which does not hide a near-black background against a pure-black page background.
- Full-page desktop sweep (Home, Properties list/detail, About, CountryPage, TaxGuide) plus
  a light-mode pass found no further instances of this defect class — the face/ribbon/void-
  wave chrome imagery elsewhere is used at large blurred scale where the same background
  never reads as a hard edge.

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

### July 15, 2026 — Persona-driven feature pass (ongoing)

Running the manual persona review (`PERSONAS.md`) end-to-end: for each gap found, ship a
real working feature, verify it, then move to the next. About/Properties/PropertyDetail
already covered most persona needs (trust content, filters, WhatsApp deep links,
investment analysis) — this pass targets genuinely *missing* functionality.

#### Feature 1 — Favorites / saved listings

**Persona gap:** Dmitri ("just show me the numbers, I'll message you myself, no calls")
and Irina (comparing a shortlist with her husband before committing to a call) had no
way to shortlist listings across visits — every return trip meant re-filtering the whole
catalogue from scratch.

**What shipped:** localStorage-backed favorites (`src/lib/favorites.ts`, no account/
backend) with a heart toggle on every listing card and the detail-page hero
(`FavoriteButton.tsx`), a nav heart icon with a live count badge (desktop + mobile menu),
and a new `/favorites` page with its own empty state and a WhatsApp CTA to discuss the
shortlist. Extracted the previously-inline Properties.tsx card markup into a shared
`PropertyCard.tsx` so the catalogue and the favorites page render identically and stay in
sync automatically.

**Bug caught in verification:** first version passed the store's `read()` function
straight to `useSyncExternalStore` as `getSnapshot`; since it built a new filtered array
every call (even with unchanged content), React treated every render as a store change,
causing "Maximum update depth exceeded" crashes on both `/properties` and the detail
page. Fixed by caching the parsed array and only re-parsing when the raw localStorage
string actually changes. See `.agents/memory/favorites-getsnapshot-caching.md`.

Verified with a scripted Puppeteer pass (toggling two hearts, confirming
`localStorage`, nav badge count, and the `/favorites` page all agree) plus screenshots —
no regressions.

#### Feature 2 — "Only USDT" filter

**Persona gap:** Viktor (crypto-first buyer) had to open every card individually to see
if a listing accepted USDT — the `crypto` field existed on listing data but wasn't
exposed as a filter.

**What shipped:** a toggle button in the Properties filter bar that filters the grid to
`item.crypto === true`, wired into the existing filter/reset logic. Verified with a
scripted click test (16 listings → 13 with the filter on).

#### Feature 3 — Contact form was fake; now actually delivers the lead

**Bug found, not just a gap:** the About page consultation form (`id="consult"`) had
required-looking fields (Name *, Phone *) with **no actual validation** — submitting
completely empty always showed the "Запрос получен" success state — and the submit
handler only did `setSubmitted(true)`; nothing was captured, stored, or sent anywhere.
Every visitor who used the form believed a human would follow up, and none would have.

**Fix:** made all fields controlled state, added real required-field validation (blocks
submission and shows an inline error if name/phone are empty), and on valid submit
builds a formatted message from all the fields and opens a prefilled `wa.me` WhatsApp
link — the same delivery channel every other CTA on this site already uses (there is no
CRM/email backend elsewhere to be consistent with, and adding one wasn't asked for).
Verified end-to-end with Puppeteer: empty submit blocked with the error shown and no
`window.open` call; filled submit produced a correctly-encoded WhatsApp message with all
5 fields and showed the success state.

#### Feature 4 — Side-by-side comparison

**Persona gap:** Irina (deciding with her husband between a handful of shortlisted
options) had no way to see specs, legal status, yield, and risk side-by-side — only one
card at a time.

**What shipped:** a second icon on every listing card (`CompareButton.tsx`, opposite the
favorite heart) adds/removes it from a session-scoped compare shortlist
(`src/lib/compare.ts`, capped at 3 — a 4th column stops being readable), a global sticky
bottom bar (`CompareBar.tsx`, mounted in `Layout.tsx` so it survives page navigation)
showing the current selection with a "Сравнить" button, and a new `/compare?ids=...`
page rendering a full comparison table (price, specs, crypto acceptance, legal fit,
yield estimate, risk note, per-listing WhatsApp CTA) driven entirely by the URL query so
the comparison is a real, shareable link rather than just in-memory state.

**Follow-on fix:** the floating WhatsApp button and the new bottom compare bar would
have overlapped at the bottom-right corner — `WhatsAppFloat.tsx` now shifts up
(`bottom-6` → `bottom-24`) whenever the compare bar is showing.

Verified with Puppeteer (adding 3 items, confirming the bar and the resulting
`/compare?ids=12,9,10` page both render) plus real mobile-viewport (390×844) screenshots
of the compare bar, the favorites empty state, and the mobile nav menu — no overlaps.

---

## User preferences
