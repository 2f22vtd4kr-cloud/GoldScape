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

## 3D scene generation — visual style guide & blueprint-anchored mandate

> **Read this section in full before generating a single image.** Ignoring it produces a random
> assortment of stock-looking renders that share no DNA with each other or with the property's
> floor plan. Every past session that drifted did so because it started generating before
> anchoring to the blueprint. Do not repeat that mistake.

### What these images are

All scenes are **photorealistic 3D dollhouse renders** — the camera floats above the property
at roughly a 40–55° downward angle (bird's-eye isometric), the roof/ceiling is removed to
reveal the interior, and the surrounding real geography is visible through windows and outside
the building envelope. They are not photographs, not flat illustrations, not eye-level renders.
Think of each image as an architectural model photographed from a crane — you see the full floor
plate, all rooms simultaneously, and the landmark view through every window.

Resolution/framing: square or near-square (1:1 to 4:3). Ultra-high detail, cinematic. No
cartoon, no sketch, no low-poly. The render quality must read as "developer sales brochure."

### Visual reference images (on disk right now)

These are the canonical style anchors. Before generating anything, open them and study them.
All paths are relative to `artifacts/gory-resort/public/images/scenes/`.

| Image | What to study in it |
|---|---|
| `p1-section.jpg` | **The gold standard section cut.** Camera angle, roof-off dollhouse framing, warm sunset sky, Dubai skyline + sea through curved glass balcony, marble floors, cream furniture, warm brass/wood kitchen — *this is the target quality and mood for all UAE luxury renders* |
| `p1-floorplan.jpg` | **The gold standard floorplan.** Luxury developer style: cream background, gold brand accents, room labels with metric dimensions, north compass, key plan inset, key section inset — replicate this format exactly for every new floorplan |
| `p1-bbq.jpg` | **Blueprint-anchored life scene, same apartment as p1-section.** Note: identical curved balcony rail, identical marble floors, identical kitchen island position, *same* Dubai skyline view through the same windows — only the people, lighting, and table setting changed. Sunset golden hour |
| `p1-matchday.jpg` | **Same apartment, third scene.** Camera moved inside to living room level but the skyline view through floor-to-ceiling glass is the same Palm Jumeirah + Dubai Marina panorama. Night mode; blue TV glow; same marble floors and ceiling profile |
| `p3-section.jpg` | **Vertical section cut (duplex).** Shows two full floors stacked; Burj Khalifa + Dubai Fountain visible outside to the right; room labels overlaid; dark luxury palette (charcoal, dark marble, warm gold lighting) — contrasts with p1's cream palette |
| `p2-party.jpg` | **Studio blueprint-anchored life scene.** Top-down dollhouse of a compact studio: same floor plan for all p2 scenes — open plan with bed zone, kitchen bar, and bathroom visible simultaneously. Dubai Marina canal with yachts through full-width glass. Night/neon lighting |
| `p5-family.jpg` | **Historic Istanbul apartment.** Completely different material vocabulary: brick exterior walls, arched windows with Ottoman profile, herringbone oak parquet floor, Turkish kilim rugs, warm afternoon Bosphorus light — style adapts to local architecture, NOT copy-pasted UAE palette |
| `p7-life.jpg` | **Cyprus villa blueprint-anchored.** White concrete exterior, rooftop infinity pool visible above, Mediterranean Sea + Limassol coastline through glass, light oak wood floors, open-plan living + kitchen + 2 bedrooms all visible, garage below grade |
| `p9-party.jpg` | **Batumi seafront apartment.** White contemporary exterior, Batumi's lit coastline at night through floor-to-ceiling glass, fireworks over sea — another region, another material palette (lighter stone, contemporary European finishes) |
| `p17-life.jpg` | **Under-construction / off-plan scene.** Raw concrete shell, exposed columns, no finishes yet — valid scene type for off-plan listings; two people with blueprints on rooftop; Limassol marina below |

### The blueprint-anchored rule — non-negotiable

**Every scene for a given property is a different story told inside the exact same building.**

The following elements are **frozen** across all scenes of a property. They must be identical
in every render — exterior, section, floorplan, life, bizarre:

1. **Floor plan shape** — the outline of the apartment/villa on its floor plate: which walls
   exist, where the rooms are, which direction they face, how large each room is. A living room
   that is 8.6m × 5.2m in the section cut is 8.6m × 5.2m in the matchday scene.

2. **Window positions, sizes, and profile shapes** — floor-to-ceiling glass in a Dubai tower
   stays floor-to-ceiling glass in every scene. Arched Ottoman windows in Istanbul stay arched.
   A 12m wrap-around balcony stays 12m wrap-around. **You cannot make up new windows for a
   life scene.**

3. **The view through those windows** — this is the most commonly broken rule. The specific
   real-world geography visible through each window is part of the building's identity:
   - p1: Palm Jumeirah frond + Dubai Marina skyline + Arabian Gulf to the right, Burj Al Arab
     visible on the horizon
   - p2: Dubai Marina canal with yachts, towers on both sides
   - p3: Burj Khalifa directly outside (right side), Dubai Fountain below
   - p5: Bosphorus strait with ferry, European shore in the distance
   - p6: Mediterranean coast, beach directly below
   - p7: Mediterranean Sea + Limassol coastline (low-rise white city)
   - p9: Batumi coastline with lit towers, Black Sea
   - p17: Limassol Old Port marina, yachts, Old Town waterfront
   **The window view is a geographical fingerprint. Do not swap it between properties.**

4. **Structural materials (the "monumental stuff"):**
   - Floor material: marble/travertine (UAE luxury), herringbone oak parquet (Istanbul),
     light-tone wood-look tile (Cyprus contemporary), marble (Batumi)
   - Exterior wall finish: curved glass + white concrete (p1), dark steel frame + glass (p3),
     brick (p5), white render (p6/p7/p9)
   - Ceiling height — visible in section cuts, must match in life scenes

5. **Kitchen island and major structural furniture** — the island position, its material (always
   marble top in the current set), and its size relative to the room do not move between scenes.

6. **Building envelope profile** — the curved balcony rail of p1 is part of that building's
   silhouette; the cantilevered terrace of p7 is part of that building's silhouette. They appear
   in every exterior-facing render.

### What IS allowed to change between scenes

- **People** — their number, outfits, activity
- **Lighting/time of day** — golden sunset (bbq), deep night (matchday), neon night (party),
  bright midday (family breakfast)
- **Soft furnishings and props** — throw pillows, table settings, food, bottles, laptops
- **Plants** — can be added/moved slightly for compositional balance
- **Small decorative objects** — art on walls, books, candles
- **Camera angle within the dollhouse** — can zoom in on one zone (e.g. the living room for
  matchday) while keeping all the structural geometry correct behind it

### How to generate correctly — the Property DNA string

Every property gets a **DNA string** written before any image is generated. It encodes all the
frozen elements so every prompt is anchored to the same source. The DNA string lives as a
comment in `artifacts/gory-resort/src/data/scenes.ts` above each property's scene array.

Format (adapt to each property):

```
DNA: [building type] · [floor/level] · [room count] · [ceiling height]
     floor: [material]  walls: [finish]  structure: [key detail]
     windows: [description of shape, size, coverage fraction]
     view N: [what is visible through north-facing windows]
     view S/E/W: [other cardinal views if different]
     landmark: [the single most recognisable feature of this window view]
     exterior: [key silhouette feature — curved balcony, cantilevered terrace, etc.]
     palette: [3-5 dominant colours in hex or plain English]
```

Every image generation prompt for that property MUST paste the full DNA string, then describe
only what changes (the scene, the people, the lighting).

### Scene types — generation approach per type

**`section` (horizontal section cut / dollhouse):**
Prompt must specify: camera at ~45° overhead, roof removed, all rooms visible simultaneously,
property info text overlay top-left (property name, floor, bedroom count, ceiling height),
landmark callout annotation top-right, icon legend left side. See `p1-section.jpg` and
`p3-section.jpg` for exact annotation style. This is the most important scene — it anchors
all subsequent renders.

**`floorplan`:**
2D overhead technical drawing in developer-brochure style. Cream/white background, gold/warm
brand accents, all rooms labelled with names + metric dimensions, north compass bottom-left,
key plan inset (building footprint with this unit highlighted), key section inset (building
elevation with this floor highlighted), legend of icons for bedrooms/bathrooms/features on
the left panel. See `p1-floorplan.jpg` for exact layout. Do not make it look like AutoCAD or
a plain line drawing — it must look like a luxury developer's PDF.

**`exterior`:**
Standard architectural visualisation: the building seen from outside at street level or slight
elevation. Daytime, clear sky or golden hour. The landmark view (what makes this location
special) visible in the background. No interior visible.

**`life_bbq`, `life_party`, `life_family`, `life_matchday`, `life_remote_work`:**
Blueprint-anchored dollhouse (same camera as section cut), roof removed, all rooms visible.
The scene's activity happens in the correct zone of the floor plan (bbq on the terrace, matchday
in the living room, family breakfast at the dining table). The window view behind the activity
must match the DNA. Lighting matches the scene mood.

**`bizarre` (✦ Атмосфера):**
Same dollhouse view, same structure — but an absurd or cinematic scenario plays out inside
the correct floor plan. The joke lands harder when the building is recognisably the same
property.

### What went wrong in previous sessions (do not repeat)

- **Generated life scenes with no connection to the section cut** — completely different room
  shapes, different window sizes, different views outside. The buyer sees "section cut: this
  apartment has a curved panoramic balcony overlooking the Palm" and then "matchday scene: a
  generic rectangular living room with a city view." Trust is destroyed.
- **Forgot to specify the window view** — generator defaulted to a generic skyline or no view
  at all. Always name the specific landmark in the prompt.
- **Used the same material palette for every country** — UAE beige marble appeared in Istanbul
  and Batumi. Each country has its own material vocabulary (see p5-family.jpg for Istanbul,
  p7-life.jpg for Cyprus, p9-party.jpg for Batumi).
- **Skipped the DNA string** — jumped straight to generating "a luxury apartment in Dubai."
  Without the DNA the model invents its own floor plan every time.

---

## Priority for next session

**#1 — Repopulate listings with real properties from top agencies in each country.**

The current 17 listings are curated composites, not real market inventory. The next session
should go online and pull actually-listed properties from the leading agencies for each of
our seven countries, then replace (or supplement) the existing listings with real data.

Target agencies by country (research and confirm current top performers at session start):
- **UAE** — fäm Properties, Betterhomes, Allsopp & Allsopp
- **Turkey** — Coldwell Banker Turkey, RE/MAX Turkey, Tolerance Homes
- **Cyprus** — H&S Real Estate, Leptos Estates, Empire Estates
- **Georgia** — Tbilisi Real Estate, MyHome.ge top brokers
- **Thailand** — Samui Exclusive Homes, Siam Real Estate, Thailand Property
- **Serbia** — Flat4Day, Novdom, Stan.co.rs
- **Montenegro** — Adriatic Properties, Montenegro Prospects, Real Estate Montenegro

For each selected property:
1. Pull real listing data: address/area, price (in USD and local currency), size (m²),
   bedrooms, bathrooms, key features, developer/agency name.
2. Use the agency's published floor-plan images and exterior photos as **generation
   references** (style/realism anchors) — do not embed or republish the originals.
3. Generate a full scene set (5+ scenes: isometric map, exterior, section cut, lifestyle
   ×1-2, atmosphere ×1) from those references so all views of the property share the
   same layout, finishes, and furniture placement.
4. Wire into `listings.ts` (with `agency` and `agencyUrl` attribution fields) and
   `scenes.ts` (PROPERTY_SCENES map).

Aim for 2-3 real properties per country (14-21 total) replacing the current composite
listings. Listing #17 (Limassol Marina) is already a real-agency import — use it as the
pattern.

---

## Session log

### July 15, 2026 — "Inside the property" gallery feature: recovered history + lost work

This feature has spanned three sessions interrupted by re-imports. Recording the full
picture here so the next re-import doesn't lose it again.

**Where it actually stands (committed, on disk right now):**
- Two Canvas mockup variants exist at
  `artifacts/mockup-sandbox/src/components/mockups/property-gallery/`:
  `TabbedCrossfade.tsx` (pill-tab nav + crossfade) and `FilmstripCarousel.tsx`
  (scroll-snap filmstrip + arrows/dots). Both render listing #4 (Arabian Ranches villa,
  Dubai) only — no other listing has gallery data yet.
- `_shared/galleryData.ts` holds 6 items for listing 4: floor1, floor2, exterior,
  lifestyle-bbq, lifestyle-party, and a per-listing "easter egg" bonus render (currently
  a tongue-in-cheek heist-movie scene, `listing-4-bizarre.png`).
- **Each of those 6 images was generated independently** — different room, different
  framing, no shared reference — so they don't read as photos of *one* real property.

**What the user actually asked for (repeated verbatim this session because it was lost
after a re-import mid-implementation):**
1. A **third gallery variant**: filmstrip carousel, but with quick-jump display buttons
   per view (borrowed from the tabbed-crossfade variant) — a hybrid of the two existing
   variants.
2. Stop generating listings/scenes from imagination. Instead, **source real, currently
   listed properties from top real estate agencies in each of our countries** (UAE,
   Turkey, Cyprus, Georgia, Thailand, Portugal, Serbia) — agency sites usually publish
   both floor-plan blueprints and real photos, which should be used as generation
   references so results are close to reality.
3. Solve the "each view is disconnected" problem with a real technique — every
   generated view of a given property (floor plan, exterior, lifestyle scenes) must be
   anchored to the *same* real property (same layout, same finishes, same furniture
   placement) so they visibly belong together. Lifestyle scenes in particular should
   show the *whole* room/property context (e.g. "watching the game" should read as a
   scene in *this* living room, not a generic stock room), so a prospective buyer can
   feel what living there would be like.

**What was in progress when the last session was interrupted (visible in
`attached_assets/IMG_3252_1784128394817.jpeg`, a screenshot of that session's activity
feed, but never reached disk/git):** the agent had started a "pilot" pass on listing 4 —
activity log showed "Detailing floor plan activities" → "Regenerated pilot images with
whole-floor framing" → 2 new images generated — before several image-generation
subagents were stopped ("Subagent stopped: You are producing content...", likely a
content-policy trip, possibly related to the heist-themed easter egg or to reproducing
a real, identifiable property/agency's imagery). **None of that regeneration work or
any agency research survived** — `git log` for this feature stops at the original
commit that added the two variants with the old, disconnected per-room images; nothing
about whole-floor framing or real agencies was ever committed. Re-imports wipe anything
that only exists in the agent's working state and isn't committed, so mid-flight visual
R&D like this needs to land in git (or at least in `attached_assets/generated_images/`)
before it's safe from a re-import.

**Not yet resolved / needs a product decision before continuing:** whether "import
real, currently listed" properties means literally scraping specific live agency
listings and their copyrighted photos to use as AI-generation reference (legal/ethical
exposure — using another brokerage's real, currently-for-sale listing with fabricated
interior/lifestyle scenes could look like unauthorized use of their IP, and to a site
visitor could look like *this* site is the seller of a property it has no relationship
to), versus using real listings only as **style/realism reference** (grounding fictional
composites in how real floor plans and real interiors in that market actually look,
without claiming a specific real address is for sale here). Flagged to the user for a
decision rather than assumed.

### July 15, 2026 — Re-import setup (round 3)

Project was re-imported again with all 3 workflows failing (no `node_modules`).
Ran `pnpm install` at the workspace root, confirmed `DATABASE_URL` was already
provisioned and `drizzle-kit push` (via `pnpm --filter @workspace/db run push`)
reported no pending schema changes, then restarted all 3 workflows. Verified
with a screenshot — homepage renders correctly. No code changes needed.

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

### July 15, 2026 — PropertyScenesCarousel polish + listing #17 bug fix (re-import round 4)

#### Re-import setup

Project was re-imported from GitHub again with no `node_modules`. Ran `pnpm install` at the
workspace root and restarted all 3 workflows. No schema changes needed (Drizzle reported
nothing pending). Site renders correctly on all routes after setup.

#### Bug fix — listing #17 (Limassol Marina) was outside the LISTINGS array

`artifacts/gory-resort/src/data/listings.ts` had a stray `];` that closed the `LISTINGS`
array before listing #17's object literal. The listing compiled fine (TypeScript saw it as a
standalone variable expression, not an array element) but was never actually part of the
exported array. Result: the site showed "16 объектов · 6 стран" instead of 17/7 and the
Limassol Marina property was completely invisible. Fixed by removing the premature `];`.

**File changed:** `artifacts/gory-resort/src/data/listings.ts`

#### PropertyScenesCarousel — 5-persona sim + full implementation

Ran a full 5-persona evaluation of `PropertyScenesCarousel` (Viktor, Irina, Dmitri, Alex,
Nika) across desktop and mobile. Key findings and every fix applied:

**Viktor** — "Сцены объекта" sounds like theater. "Ocean's Eleven" tag in the filmstrip
felt unprofessional and broke trust for an anxious investor.

**Irina** — Thumbnails too small to tap accurately on phone. Family/life scenes are
emotionally resonant; bizarre scenes (Tiger in pool) undercut family positioning. The
hover "Смотреть" overlay was appearing on mobile where hover doesn't apply.

**Dmitri** — Properties with only 2 scenes feel like placeholders. Kills trust. The
`scenes.length < 2` threshold too low.

**Alex** — Filmstrip needs scroll affordance fade on mobile (no visual cue that more
thumbnails exist off-screen). "Все сцены" pill with only 2 categories is redundant.

**Nika** — "✦ Особое" should be renamed "✦ Атмосфера" (more evocative, less
miscellaneous). Crossfade at 0.42s is too fast — luxury standard is 0.65s with a
decelerating easing. No `max-height` cap on the stage (full-bleed landscape properties
could blow out the layout on tall screens). No image loading skeleton.

**Changes made** (all in `artifacts/gory-resort/src/components/PropertyScenesCarousel.tsx`
unless noted):

1. **`LUXURY_EASE` constant** — `[0.22, 1, 0.36, 1]` cubic-bezier extracted at the top of
   the file. Controls all scene transition timings. Crossfade duration raised from 0.42s
   to 0.65s.

2. **`AnimatePresence mode` fix** — was `mode="crossfade"` (not a valid Framer Motion mode,
   caused a TypeScript error). Changed to `mode="sync"`, which produces the same visual
   effect (enter and exit run simultaneously) and passes typecheck.

3. **`max-height: 70vh` on the stage wrapper** — prevents tall-landscape scene images from
   blowing out layout on wide viewports. The `aspectRatio: 16/9` is preserved as the
   primary sizing; `70vh` is the safety cap.

4. **Image loading skeleton (`SceneImage` component)** — new sub-component wrapping `<img>`
   with a shimmer placeholder shown while the image loads. Uses a CSS `@keyframes shimmer`
   sweep animation added to `artifacts/gory-resort/src/index.css`. Skeleton disappears the
   moment `onLoad` fires (0.3s opacity transition).

5. **Category pill cleanup** — "Все сцены" renamed to "Все виды". The "all" pill is now
   hidden when fewer than 3 categories are present (2 categories don't need an "all" toggle
   — it's just noise). Category label "✦ Особое" → "✦ Атмосфера" in `CATEGORY_CONFIG`.

6. **Filmstrip right-edge fade** — a `pointer-events-none` gradient overlay at the right
   edge of the filmstrip container signals horizontal scroll when `filtered.length > 3`.
   Uses `var(--scenes-bg, #050505)` as the fade target color (dark-mode default;
   matches the `dark:bg-[#050505]` section background in `PropertyDetail.tsx`).

7. **Hover overlay mobile hide** — the "Смотреть" quick-view overlay on thumbnails is now
   `hidden md:flex` (desktop only). On mobile it was appearing on top of tapped thumbnails
   because touch events triggered both hover and click states simultaneously.

8. **Section header rename** (`artifacts/gory-resort/src/pages/PropertyDetail.tsx`) —
   "Сцены объекта" → "Визуализация объекта". The `aria-label` on the filmstrip
   `role="tablist"` was also updated to "Виды объекта".

9. **Shimmer CSS** (`artifacts/gory-resort/src/index.css`) — `@keyframes shimmer` added,
   animating `translateX(-100%)` → `translateX(200%)` over 1.6s infinite.

**TypeScript typecheck** (`pnpm --filter @workspace/gory-resort run typecheck`) confirmed
clean after all changes.

#### Tasks proposed (all later cancelled by user — no active tasks remain)

Three follow-up tasks were proposed from the persona sim but user cancelled them:
- "Fill in missing scene views so every property feels fully explored" — 10+ properties
  have 2-3 scenes; full vision is 5+ per property including section cuts and floorplans.
- "Import 5–10 real currently-listed properties from top agencies in each country" —
  continuing from listing #17 (Limassol Marina), the first real-agency import.
- "Fix mobile carousel touch UX — thumbnails too small to tap accurately on phone" —
  swipe gesture on main stage, larger touch targets, swipe-hint animation.

---

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
