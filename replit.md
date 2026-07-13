# EstateofMind

A real-estate investment site (Russian-language) helping clients buy property abroad — UAE, Turkey, Cyprus, Georgia, Thailand, Serbia, Portugal — with full legal support and residency-permit guidance. Three pages: Home (`/`), "How we work" (`/about` — process, per-country breakdown, FAQ, contact form), and Properties (`/properties` — filterable listing grid). Visual language: dark "chrome/liquid-metal" aesthetic with iridescent gradient accents (Oxanium + Space Grotesk fonts).

This replaced an earlier "GORY Mountain Resort" ski-resort site that lived in this same artifact; that resort content (sections, bilingual EN/RU `LanguageContext`, AI-persona-review pipeline) was fully removed on 2026-07-13 when the site was re-pointed at the EstateofMind design (graduated from a Canvas mockup). The original mockup source (`artifacts/mockup-sandbox/src/components/mockups/estate-of-mind/`) was deliberately kept on the Canvas for reference rather than deleted — it's no longer wired to the live site.

## Run & Operate

- Workflows are configured in Replit: **artifacts/gory-resort: web** (frontend, Vite, port 5000), **artifacts/api-server: API Server** (Express 5, port 8080), **artifacts/mockup-sandbox: Component Preview Server** (Canvas mockup preview, port 8081)
- `pnpm --filter @workspace/api-server run dev` — run the API server manually
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `DATABASE_URL` — Postgres connection string (runtime-managed by Replit, available automatically)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, wouter for routing (3 routes: `/`, `/about`, `/properties`, plus a `/*` catch-all 404)
- API: Express 5 (not yet wired to the frontend — the contact form on `/about` is UI-only, no submit handler)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `src/pages/{Home,About,Properties}.tsx` — the three pages; each wraps its content in `src/components/Layout.tsx` (shared `Navigation` + `Footer`)
- `src/components/Navigation.tsx`, `Footer.tsx` — shared nav/footer, used by every page
- `src/components/ChromeShape.tsx` — SVG-based decorative chrome/iridescent shape component (6 variants: blob, star4, spike, ring, orb, drip); supports `breathe` and `float` animation props. **Note:** no longer used in Home.tsx (removed — looked cheap vs. AI-generated PNG assets); may still be used on About/Properties.
- `src/hooks/useScrollReveal.ts` — scroll-triggered reveal animation hook (IntersectionObserver); wired into `Layout.tsx` so it runs on every page automatically
- `src/index.css` — single source of truth for the chrome/iridescent design tokens (`.chrome-text`, `.chrome-text-accent`, `.iridescent-text`, `.eom-card`, `.eom-btn-primary/ghost/oilslick`, `.eom-nav`, `.void-wave-section`, `.face-bg-animate`, `.face-shimmer`, `.liquid-chrome-pulse`, blob animations, scroll-reveal system, testimonial cards, chrome-shape keyframes, etc.) plus the Oxanium/Space Grotesk font import
- `public/chrome/liquid/` — AI-generated chrome PNG assets used by Home.tsx (see full list in Home page sections below). All black-background assets use `mix-blend-mode: screen` so black disappears.
- `public/images/` — AI-generated property and destination photos (prop-dubai.jpg, prop-cyprus.jpg, prop-georgia.jpg, dest-dubai.jpg, dest-cyprus.jpg, dest-georgia.jpg)

## Home page sections (in order)

1. **Hero** — two-column layout: chrome headline ("Ваш капитал заслуживает свободы"), subheadline, two CTAs, stats strip (left); `chrome-blob-twisted.png` + `chrome-tendrils.png` + `chrome-starburst.png` + `chrome-hero-frame.png` (spike-tendril border frame, `mix-blend-mode: screen`, 45% opacity) as right-side accent (right). Glow div uses `min(480px, 88vw)` to prevent horizontal overflow. Mobile: `pt-28 pb-0` top-anchored, `clamp()` sizing.
2. **Destinations strip** — 7 destination cards (Dubai, Cyprus, Georgia, Turkey, Thailand, Serbia, Lisbon); Dubai/Cyprus/Georgia have real photo backgrounds, others are dark-glass. Horizontal scroll on mobile, `xl:grid-cols-7` on desktop.
3. **Void Wave** — full-bleed section; `sky-bg.jpg` background with black fades top + bottom (`.void-wave-section`). Content: `chrome-eye-v2.png` (animated `animate-float`), eyebrow "Международная недвижимость", headline "Свобода капитала" (`.chrome-text`), three key stats ($130M+ / 12 стран / 847 семей), and "Смотреть объекты" CTA button.
4. **Chrome Face (Why Us)** — two-column layout: `chrome-face-colorful.jpg` left panel (animated with `face-bg-animate` hue-rotate + `face-shimmer` overlay + stats overlay + CTA button), Why Us content right panel (3 icon rows: Shield / Globe / Zap).
5. **Trust metrics bar** — `$130M+` / `847` / `12` / `2019`; stats animate from 0 on scroll via `data-counter` + `useScrollReveal`.
6. **Process teaser** — 4 steps with AI chrome numeral images (`chrome-num-01/02/03/04.png`) replacing the old number circles; process line repositioned to `left: 27px / top: 58px` to align with the wider numeral images. Right column: free-consult CTA card with `chrome-ribbon.png` accent.
7. **Featured properties** — 3 cards with real AI-generated photos (Dubai, Cyprus, Batumi); image zoom on hover, glassmorphism location/type badges.
8. **Testimonials** — 3 Russian-language client quotes: Viktor M. (Dubai $340k), Anna & Sergei K. (Cyprus €285k), Dmitry L. (Batumi 9.4% yield); glass cards with chrome-gradient avatar initials.

### AI chrome assets (`public/chrome/liquid/`)

| File | Usage |
|---|---|
| `chrome-blob-twisted.png` | Hero — main right-side chrome object |
| `chrome-tendrils.png` | Hero — wispy accent overlay |
| `chrome-starburst.png` | Hero — starburst accent |
| `chrome-hero-frame.png` | Hero — ornate spike-tendril border frame, `mix-blend-mode: screen`, 45% opacity |
| `chrome-eye-v2.png` | Void Wave — centered eye, `animate-float` |
| `sky-bg.jpg` | Void Wave — full-bleed sky background |
| `chrome-face-colorful.jpg` | Chrome Face / Why Us — iridescent face, left panel |
| `chrome-burst-overlay.png` | Chrome Face — overlay accent |
| `chrome-ribbon.png` | Process — CTA card accent |
| `chrome-num-01/02/03/04.png` | Process — step numerals replacing CSS circles |

## ChromeShape component

`src/components/ChromeShape.tsx` — 6 SVG variants matched to the Softulka "3D Chrome Shapes" pack aesthetic:

| variant | shape |
|---|---|
| `blob` | organic amoeba with specular + rim highlights |
| `star4` | 4-pointed cusped Bezier star |
| `spike` | 12-spike burst starburst |
| `ring` | chrome torus (even-odd annulus fill) |
| `orb` | sphere with two-point specular |
| `drip` | liquid teardrop |

Props: `variant`, `size` (px), `className`, `breathe` (boolean), `float` (boolean), `iridescent` (switches to purple-violet tones). All animations respect `prefers-reduced-motion`. CSS keyframes `chrome-shape-breathe` (scale + rotate + brightness, 7s) and `chrome-shape-float` (translateY, 6s) live in `index.css`.

**Known limitation**: when both `breathe` and `float` classes are on the same element, `transform` from each keyframe fights — only the last keyframe's `transform` wins. Workaround: wrap in a container (outer floats, inner breathes), or upgrade keyframes to use separate `translate` / `scale` properties (CSS Motion Level 2).

## Properties page (`/properties`)

16 hand-researched listings across 8 countries with verified 2025/2026 prices from real agencies:

| # | Location | Price | Agency |
|---|---|---|---|
| 1–4 | Dubai (Palm Jumeirah, Marina, Downtown, JBR) | $320k–$1.8M | fäm Properties |
| 5–6 | Istanbul (Beşiktaş, Kadıköy) | $185k–$290k | Imtilak Real Estate |
| 7–8 | Cyprus (Limassol, Paphos) | €285k–€520k | H&S Real Estate |
| 9–10 | Georgia (Batumi, Tbilisi) | $88k–$145k | Levantino |
| 11–12 | Thailand (Phuket Rawai, Koh Samui Chaweng Noi) | $210k–$318k | Samui Exclusive Homes |
| 13–14 | Portugal (Lisbon Campo de Ourique, Algarve Vale do Lobo) | €410k–€1.38M | Sotheby's / Knight Frank |
| 15 | UAE (Business Bay) | $695k | fäm Properties |
| 16 | Serbia (Belgrade Savamala) | €125k | — |

Each card shows: country flag + code badge, property tag ("Вид на море", "Golden Visa", "Golf & Ocean", etc.), price/m² data, and agency name. Header: "847 объектов · 8 стран · от $88 000".

**Note:** The filter dropdowns (Country / Type / Price) are static UI — no React state or filtering logic is wired. The grid always shows all 16 cards regardless of filter selection.

## Scroll-reveal animation system

`useScrollReveal` (in `src/hooks/`) uses `IntersectionObserver` to drive three effects:

- **Directional reveals**: `data-reveal="up|left|right|scale"` on any element → fades and slides in on scroll. Opacity uses `cubic-bezier(0, 0, 0.2, 1)` (ease-out); transform uses `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint).
- **Stagger groups**: `data-stagger` on a container → its `[data-reveal]` children get diminishing CSS `transition-delay` offsets (0 / 65 / 115 / 155 / 185 / 205 ms) for an easeOut-feel cascade.
- **Chrome heading sweep**: `.section-reveal-heading` class on headings → a `::after` pseudo-element sweeps left-to-right using `clip-path: inset()` (not `overflow: hidden`, which clips Oxanium descenders). `mix-blend-mode: overlay` makes it visible over the chrome gradient text.
- **Counter animation**: `data-counter` on a stat element → reads the element's text content, extracts the number, and animates from 0 using easeOutExpo. Duration scales with magnitude. Respects `prefers-reduced-motion`.

The system went through 5 critique iterations before landing on v5 (see comments in `useScrollReveal.ts` and `index.css`).

## Canvas mockup

### Liquid-spill before/after comparison (desktop)

Two components sit side-by-side on the Canvas board (y=0, each 1280×900):

| Shape ID | Component | Description |
|---|---|---|
| `current-preview` | `liquid-spill/Current.tsx` | **Before** — chrome shapes as small centred featured visuals in a dedicated right column |
| `liquid-spill-preview` | `liquid-spill/LiquidSpill.tsx` | **After** — same shapes at 3–4× scale, edge-bleeding as atmospheric section backgrounds behind copy |

Both use the proven chrome PNG set in `artifacts/mockup-sandbox/public/chrome/` (`blob-iridescent-3.png`, `spike-chrome.png`, `ring-chrome.png`, `drip-chrome.png`) via direct `/chrome/…` root-relative paths (see Gotchas).

### Mobile liquid-chrome redesign

A full mobile mockup (390×844) lives at `artifacts/mockup-sandbox/src/components/mockups/mobile-chrome/MobileHome.tsx`, placed on the Canvas board below the desktop comparison (shape ID `mobile-home-preview`, y=1110).

It uses three new AI-generated chrome images inspired by the "Liquid Chrome Poster Series" (industrial techno aesthetic — silver/steel chrome, not iridescent):

| File | Subject | Placement |
|---|---|---|
| `src/assets/images/chrome-wire.png` | Twisted sinuous silver wire ribbon | Hero — top-right bleed, rotate −18°, opacity 0.72 |
| `src/assets/images/chrome-burst.png` | Explosive starburst with jagged silver spikes | Hero lower-right + CTA upper-right (two uses) |
| `src/assets/images/chrome-organic.png` | Organic bone-lattice chrome sculptural form | Why Us — left bleed, opacity 0.22 |

Images are stored in `artifacts/mockup-sandbox/src/assets/images/` and referenced via Vite `import` statements (`import chromeWire from '@/assets/images/chrome-wire.png'`). This works on both proxy access and direct port 8081 access, unlike URL-path approaches (see Gotchas).

### Earlier design reference

`artifacts/mockup-sandbox/src/components/mockups/estate-redesign/HomeRedesign.tsx` — original DESIGN-subagent full-page mockup that was graduated to the live site. Kept for reference; no longer wired to any live shape.

## Architecture decisions

- Design tokens live once in `src/index.css` rather than duplicated per page — the original Canvas mockup had each page re-declare the same CSS in an inline `<style>` block; that was intentionally consolidated during graduation.
- No bilingual support: the site is Russian-only (matches the approved mockup's audience — Russian-speaking buyers). The old `LanguageContext`/EN·RU system from the resort site was removed rather than adapted.
- Multi-page routing (`/`, `/about`, `/properties`) replaced the old resort site's single-page-with-anchors structure, since the mockup was designed as three distinct pages with a persistent top nav.
- `useScrollReveal` is called from `Layout.tsx` (not individual pages) so any new page automatically gets the reveal system without extra wiring.
- ChromeShape uses inline SVG (not raster PNGs) so shapes scale without pixelation and gradients can be parameterised via props.

## Product

Marketing/lead-gen site for a real-estate investment brokerage. No transactional or account features yet — the contact form on `/about` does not submit anywhere, and WhatsApp/Telegram links in the footer are still `href="#"` placeholders (real links not yet provided).

## Outstanding / not yet built

- **WhatsApp / Telegram links** — all still `href="#"` in `Footer.tsx` and `About.tsx`. Need the actual handles from the client before wiring.
- **Contact form submit** — `About.tsx` form has no submit handler; API endpoint exists in spec but not wired.
- **Properties page filtering** — the Country/Type/Price dropdowns are static HTML; no React state or filter logic applied. Grid always renders all 16 cards.
- **Properties listing photos** — cards use CSS gradients as placeholder images (the three Featured Properties on Home use real AI photos from `/images/`). Actual per-listing photos would require sourcing.
- **About.tsx / Properties.tsx** — have not yet received the new AI chrome assets, updated typography, or mobile layout fixes applied to Home.tsx. Those pages still use the original graduation styles.
- **ChromeShape breathe + float stacking** — when both props are true on one element, `transform` from the two keyframes fights (only one `transform` per frame applies). Fix: nest in a wrapper (outer floats, inner breathes), or split into `translate` + `scale` separate CSS properties.

## Gotchas

- **Mockup sandbox image paths — proxy vs direct port**: The mockup sandbox Vite server runs with `base: '/'` on port 8081. The Replit platform proxy maps `/__mockup/` → port 8081 root. This creates two access contexts with different correct image URL prefixes:
  - **Canvas iframes via proxy** (no port in URL, e.g. `https://domain/__mockup/preview/…`): `/__mockup/images/foo.png` resolves correctly (proxy strips `/__mockup`, Vite serves `/images/foo.png`).
  - **Direct port access** (localhost:8081, or canvas iframes using `:8081` URL): `/__mockup/images/foo.png` hits Vite's SPA fallback and returns `text/html` with HTTP 200 — the browser silently gets HTML instead of an image. Use `/images/foo.png` (no `/__mockup/` prefix) or `/chrome/foo.png`.
  - **Best practice — use Vite imports**: `import img from '@/assets/images/foo.png'` works on both proxy and direct port with zero configuration. Preferred for new mockup components. Files go in `artifacts/mockup-sandbox/src/assets/images/`.
  - **URL-path option**: Place file in `artifacts/mockup-sandbox/public/chrome/` and reference as `/chrome/foo.png`. Works for direct port + proxy (proxy strips `/__mockup` → `/chrome/foo.png` on server). Do not use `/__mockup/chrome/foo.png` in component src attributes.

- **React 19 + `flushSync`**: `flushSync(() => { createRoot.render() })` silently fails to commit in React 19 — `#root` stays empty. Use plain `root.render(<App />)` (already the case in `main.tsx`). Never re-introduce `flushSync` for the initial render.
- **Screenshot tool**: captures before React's async render commits, so it can only ever show the `#root:empty` CSS loading state on a cold load. This is expected — it is not evidence the app failed to mount. Also, hash-anchor URLs (`/#section`) do not scroll the viewport in the screenshot tool — it always captures from the top of the page.
- **wouter@3.x catch-all route syntax**: the fallback 404 route must be `<Route path="/*" component={NotFound} />`. Do **not** use `path="/:rest*"` — that named-wildcard form is not supported by wouter's matcher and silently matches nothing, for any path, with zero errors anywhere.
- **`section-reveal-heading` + chrome-text + `overflow: hidden`**: never add `overflow: hidden` to a heading that uses both `.chrome-text` and `.section-reveal-heading`. The `::after` sweep uses `clip-path: inset()` precisely to avoid needing `overflow: hidden`, which would clip Oxanium descenders on large display text.
- **Workflow restarts can leave orphaned processes**: manually restarting these workflows outside the normal `WorkflowsRestart` flow (or restarting several times in quick succession) can leave old `vite`/`node` processes still holding ports 5000/8080/8081. Symptoms: `EADDRINUSE` on restart, or mockup-sandbox landing on 8082+ instead of 8081. Fix: find and `kill -9` the stale PIDs (`ps aux | grep -E "vite|dist/index.mjs"`), then restart the workflow — don't hand-edit the run command or port env vars, since artifact-managed services get their `PORT`/`BASE_PATH` from `.replit-artifact/artifact.toml`, not the workflow command line.
- **Google Fonts `@import url()` in CSS**: render-blocking, especially on slow/blocked networks (common on Russian mobile). Always load fonts as `<link>` tags in `index.html`, never as `@import url()` in CSS. Already fixed — do not revert.
- **`.iridescent-spill` animation**: uses a `::before` pseudo-element with `transform: rotate()` + `will-change: transform` for GPU-composited conic-gradient rotation. Do **not** revert to animating `--angle` via a CSS Houdini custom property — that runs on the main thread and causes visible flicker/jitter on mobile.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Persona profiles for UX sim work: `PERSONAS.md` in the workspace root (Viktor, Irina, Dmitri, Alex, Nika)
