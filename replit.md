# EstateofMind

A real-estate investment site (Russian-language) helping clients buy property abroad — UAE, Turkey, Cyprus, Georgia, Thailand, Serbia — with full legal support and residency-permit guidance. Three pages: Home (`/`), "How we work" (`/about` — process, per-country breakdown, FAQ, contact form), and Properties (`/properties` — filterable listing grid). Visual language: dark "chrome/liquid-metal" aesthetic with iridescent gradient accents (Oxanium + Space Grotesk fonts).

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
- `src/hooks/useScrollReveal.ts` — scroll-triggered reveal animation hook (IntersectionObserver); wired into `Layout.tsx` so it runs on every page automatically
- `src/index.css` — single source of truth for the chrome/iridescent design tokens (`.chrome-text`, `.iridescent-text`, `.eom-card`, `.eom-btn-primary/ghost`, `.eom-nav`, blob animations, scroll-reveal system, testimonial cards, etc.) plus the Oxanium/Space Grotesk font import
- `public/chrome/*.png` — chrome/iridescent blob and accent images referenced by the pages
- `public/images/` — AI-generated property and destination photos (prop-dubai.jpg, prop-cyprus.jpg, prop-georgia.jpg, dest-dubai.jpg, dest-cyprus.jpg, dest-georgia.jpg)

## Home page sections (in order)

1. **Hero** — chrome headline, iridescent blob + spike accent, two CTAs, stats strip
2. **Destinations strip** — 6 destination cards; Dubai/Cyprus/Georgia have real photo backgrounds, others are dark-glass. Horizontal scroll on mobile, grid on desktop.
3. **Why us** — 3 columns (Shield/Globe/Zap icons): legal diligence, local partners, 14-day deal timeline
4. **Trust metrics bar** — `$130M+` / `847` / `12` / `2019`; stats animate from 0 on scroll via `data-counter` + `useScrollReveal`
5. **Process teaser** — 4 numbered steps (left) + free-consult CTA card with chrome blob (right)
6. **Featured properties** — 3 cards with real AI-generated photos (Dubai, Cyprus, Batumi); image zoom on hover, glassmorphism location/type badges
7. **Testimonials** — 3 Russian-language client quotes: Viktor M. (Dubai $340k), Anna & Sergei K. (Cyprus €285k), Dmitry L. (Batumi 9.4% yield); glass cards with chrome-gradient avatar initials

## Scroll-reveal animation system

`useScrollReveal` (in `src/hooks/`) uses `IntersectionObserver` to drive three effects:

- **Directional reveals**: `data-reveal="up|left|right|scale"` on any element → fades and slides in on scroll. Opacity uses `cubic-bezier(0, 0, 0.2, 1)` (ease-out); transform uses `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint).
- **Stagger groups**: `data-stagger` on a container → its `[data-reveal]` children get diminishing CSS `transition-delay` offsets (0 / 65 / 115 / 155 / 185 / 205 ms) for an easeOut-feel cascade.
- **Chrome heading sweep**: `.section-reveal-heading` class on headings → a `::after` pseudo-element sweeps left-to-right using `clip-path: inset()` (not `overflow: hidden`, which clips Oxanium descenders). `mix-blend-mode: overlay` makes it visible over the chrome gradient text.
- **Counter animation**: `data-counter` on a stat element → reads the element's text content, extracts the number, and animates from 0 using easeOutExpo. Duration scales with magnitude. Respects `prefers-reduced-motion`.

The system went through 5 critique iterations before landing on v5 (see comments in `useScrollReveal.ts` and `index.css`).

## Canvas mockup

A full-page redesign mockup lives at `artifacts/mockup-sandbox/src/components/mockups/estate-redesign/HomeRedesign.tsx` — built by a DESIGN subagent. It's embedded as a live iframe on the Canvas board (shape ID `estate-home-redesign`, 1440×5000). Images are served from `artifacts/mockup-sandbox/public/images/` (mirrored from `gory-resort/public/images/`).

## Architecture decisions

- Design tokens live once in `src/index.css` rather than duplicated per page — the original Canvas mockup had each page re-declare the same CSS in an inline `<style>` block; that was intentionally consolidated during graduation.
- No bilingual support: the site is Russian-only (matches the approved mockup's audience — Russian-speaking buyers). The old `LanguageContext`/EN·RU system from the resort site was removed rather than adapted.
- Multi-page routing (`/`, `/about`, `/properties`) replaced the old resort site's single-page-with-anchors structure, since the mockup was designed as three distinct pages with a persistent top nav.
- `useScrollReveal` is called from `Layout.tsx` (not individual pages) so any new page automatically gets the reveal system without extra wiring.

## Product

Marketing/lead-gen site for a real-estate investment brokerage. No transactional or account features yet — the contact form on `/about` does not submit anywhere, and WhatsApp/Telegram links in the footer are still `href="#"` placeholders (real links not yet provided).

## Outstanding / not yet built

- **WhatsApp / Telegram links** — all still `href="#"` in `Footer.tsx` and `About.tsx`. Need the actual handles from the client before wiring.
- **Contact form submit** — `About.tsx` form has no submit handler; API endpoint exists in spec but not wired.
- **Properties page real listings** — `/properties` shows filter UI + placeholder cards; needs DB-backed listings.

## Gotchas

- **React 19 + `flushSync`**: `flushSync(() => { createRoot.render() })` silently fails to commit in React 19 — `#root` stays empty. Use plain `root.render(<App />)` (already the case in `main.tsx`). Never re-introduce `flushSync` for the initial render.
- **Screenshot tool**: captures before React's async render commits, so it can only ever show the `#root:empty` CSS loading state on a cold load. This is expected — it is not evidence the app failed to mount.
- **wouter@3.x catch-all route syntax**: the fallback 404 route must be `<Route path="/*" component={NotFound} />`. Do **not** use `path="/:rest*"` — that named-wildcard form is not supported by wouter's matcher and silently matches nothing, for any path, with zero errors anywhere.
- **`section-reveal-heading` + chrome-text + `overflow: hidden`**: never add `overflow: hidden` to a heading that uses both `.chrome-text` and `.section-reveal-heading`. The `::after` sweep uses `clip-path: inset()` precisely to avoid needing `overflow: hidden`, which would clip Oxanium descenders on large display text.
- **Workflow restarts can leave orphaned processes**: manually restarting these workflows outside the normal `WorkflowsRestart` flow (or restarting several times in quick succession) can leave old `vite`/`node` processes still holding ports 5000/8080/8081. Symptoms: `EADDRINUSE` on restart, or mockup-sandbox landing on 8082+ instead of 8081. Fix: find and `kill -9` the stale PIDs (`ps aux | grep -E "vite|dist/index.mjs"`), then restart the workflow — don't hand-edit the run command or port env vars, since artifact-managed services get their `PORT`/`BASE_PATH` from `.replit-artifact/artifact.toml`, not the workflow command line.
- **Google Fonts `@import url()` in CSS**: render-blocking, especially on slow/blocked networks (common on Russian mobile). Always load fonts as `<link>` tags in `index.html`, never as `@import url()` in CSS. Already fixed — do not revert.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Persona profiles for UX sim work: `PERSONAS.md` in the workspace root (Viktor, Irina, Dmitri, Alex, Nika)
