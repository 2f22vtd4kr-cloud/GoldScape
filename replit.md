# EstateofMind

A Russian-language real estate brokerage site for Russian speakers looking to invest in international property (UAE, Turkey, Cyprus, Georgia, Thailand, Serbia, Montenegro).

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS, shadcn/ui, Wouter (routing), Framer Motion — `artifacts/gory-resort/`
- **Backend**: Express 5 (TypeScript), Pino logging — `artifacts/api-server/`
- **Monorepo**: pnpm workspaces

## Running the project

```bash
pnpm install        # install all dependencies from root
```

Workflows (managed by Replit):
- **EstateofMind** (web) — Vite dev server on port 5000
- **API Server** — Express on port 8080

## Key files

- `artifacts/gory-resort/src/pages/` — Home, About, Properties pages
- `artifacts/gory-resort/src/components/` — UI components
- `artifacts/api-server/src/app.ts` — Express app setup
- `artifacts/api-server/src/routes/` — API routes
- `PERSONAS.md` — Visitor persona review roster for sim-run review process

## User preferences

- **Mandatory work log**: every job/task worked on in this project must be transcribed into the "Work Log" section below as it happens — not just at the end. Add a dated entry when starting a piece of work and update/finish it when done. This is obligatory for every session, not optional.

## Work Log

### 2026-07-14 — Property card fixes: badge overlap, pin marker, immersion animation, scroll-to-top
- Fixed the "ЭКСКЛЮЗИВ" badge overlapping the country/tag badges on property cards: the tag row lacked a `right-4` width constraint, so it wasn't reliably wrapping before running under the exclusive badge. Added `right-4` + conditional `pr-24` reserve when a card is exclusive.
- Diagnosed the "lightbulb" on the isometric location maps: it was the existing `MapPin` pin marker — filled + heavily glow-blurred at small size, its round head/narrow stem silhouette reads as a lightbulb, not a pin. Replaced it with a new `.property-pin` marker (slow-breathing iridescent oil-slick halo + solid white core, in `index.css`) that pinpoints the exact building and invites a tap.
- Built `PropertyImmersion.tsx`: clicking the new pin opens a full-screen `clip-path` iris-wipe anchored at the exact click point, dissolving the isometric map into the listing's real hero photo with a price/specs/WhatsApp-CTA overlay — simulates "flying into" the marked building. Reuses each listing's existing single photo rather than a new multi-photo gallery (that would need generating images for all 16 listings — flagged as a possible follow-up, not done).
- Fixed country pages appearing "not loaded at the top": wouter doesn't reset scroll position on navigation (same as default browser history behavior). Added a `ScrollToTop` effect in `App.tsx` keyed on route location.
- Also fixed (from a prior request in this session): the nav logo's black background showing as a visible box — the generated PNG had no alpha channel and relied on a fragile `mix-blend-mode: screen` + `backdrop-filter` combo. Rebaked the PNG with a real alpha channel (ImageMagick `CopyOpacity` composite using a grayscale copy as the mask) and removed the blend-mode hack. Also bumped the Home hero's mobile top padding (`pt-10` → `pt-28`) to match the site's established fixed-nav clearance convention, since it was being clipped by the fixed header.
- Verified all fixes with a scripted puppeteer-core pass (scroll to card, click the pin, confirm immersion; scroll down then follow a country link, confirm landed at top) plus visual screenshots. Cleaned up throwaway QA scripts afterward.
- Recurring housekeeping: killed orphaned Node processes squatting on ports 5000/8080/8081+ (left over from manual QA scripts in this session) that had crashed the `gory-resort` and `api-server` workflows; restarted all three workflows cleanly.

### 2026-07-13 — Visual/legibility pass on Home & Properties
- Root-caused the "barely visible text" complaint to a single shared CSS class: `.chrome-text`'s metallic gradient dropped to near-black stops, which on longer headings and property prices could land a fully dark segment over part of the string. Raised the gradient floor to a legible charcoal across the board (fixes it site-wide, not just on the pages checked).
- Replaced off-brand imagery on the Home page: the mechanical-eye motif (3 usages) and the rainbow-neon AI face panel, both of which clashed with the platinum/violet liquid-chrome design language.
  - "Свобода капитала" section: swapped the sky photo + eye for an ambient chrome glow + `chrome-blob-twisted.png`.
  - "Почему нас выбирают": swapped the AI face for a real Dubai penthouse photo (Burj Khalifa view) — more trust-building than an abstract render.
  - CTA card: replaced both remaining eye ornaments with `ChromeShape` components (blob + orb).
  - Process-step numerals: recolored the drop-shadow glow from a mismatched neon-blue to the brand's violet/platinum.
- Verified all changes on both desktop and mobile viewports via screenshots; no regressions found. Cleaned up throwaway QA scripts/screenshots afterward.
- Fixed an unrelated port conflict (orphaned Node processes holding ports 5000/8080 from earlier manual scripts) that had crashed the `gory-resort` and `api-server` workflows; killed the stale processes and restarted both cleanly.
