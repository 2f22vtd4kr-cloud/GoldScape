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
- `src/index.css` — single source of truth for the chrome/iridescent design tokens (`.chrome-text`, `.iridescent-text`, `.eom-card`, `.eom-btn-primary/ghost`, `.eom-nav`, blob animations, etc.) plus the Oxanium/Space Grotesk font import
- `public/chrome/*.png` — chrome/iridescent blob and accent images referenced by the pages

## Architecture decisions

- Design tokens live once in `src/index.css` rather than duplicated per page — the original Canvas mockup had each page re-declare the same CSS in an inline `<style>` block; that was intentionally consolidated during graduation.
- No bilingual support: the site is Russian-only (matches the approved mockup's audience — Russian-speaking buyers). The old `LanguageContext`/EN·RU system from the resort site was removed rather than adapted.
- Multi-page routing (`/`, `/about`, `/properties`) replaced the old resort site's single-page-with-anchors structure, since the mockup was designed as three distinct pages with a persistent top nav.

## Product

Marketing/lead-gen site for a real-estate investment brokerage. No transactional or account features yet — the contact form on `/about` does not submit anywhere (no backend wiring requested yet).

## Gotchas

- **React 19 + `flushSync`**: `flushSync(() => { createRoot.render() })` silently fails to commit in React 19 — `#root` stays empty. Use plain `root.render(<App />)` (already the case in `main.tsx`). Never re-introduce `flushSync` for the initial render.
- **Screenshot tool**: captures before React's async render commits, so it can only ever show the `#root:empty` CSS loading state on a cold load. This is expected — it is not evidence the app failed to mount.
- **wouter@3.x catch-all route syntax**: the fallback 404 route must be `<Route path="/*" component={NotFound} />`. Do **not** use `path="/:rest*"` — that named-wildcard form is not supported by wouter's matcher and silently matches nothing, for any path, with zero errors anywhere.
- **Workflow restarts can leave orphaned processes**: manually restarting these workflows outside the normal `WorkflowsRestart` flow (or restarting several times in quick succession) can leave old `vite`/`node` processes still holding ports 5000/8080/8081. Symptoms: `EADDRINUSE` on restart, or mockup-sandbox landing on 8082+ instead of 8081. Fix: find and `kill -9` the stale PIDs (`ps aux | grep -E "vite|dist/index.mjs"`), then restart the workflow — don't hand-edit the run command or port env vars, since artifact-managed services get their `PORT`/`BASE_PATH` from `.replit-artifact/artifact.toml`, not the workflow command line.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
