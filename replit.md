# GORY Mountain Resort

A resort landing page for GORY Mountain Resort (Caucasus, opening 2027). Visitor-persona review (Investor / Skier / Traveller / Dev-Designer-Owner / God-Tier Web Designer) is done by the agent directly — reasoning through each persona and writing content/design patches straight into the codebase. There is no automated LLM API pipeline for this; it was removed as dead weight. Full persona roster and the god-tier web-designer's expertise brief live in `artifacts/gory-resort/PERSONAS.md` — read it before running a sim.

## Run & Operate

- Workflows are configured in Replit: **artifacts/gory-resort: web** (frontend, Vite, port 5000) and **artifacts/api-server: API Server** (Express 5, port 8080)
- `pnpm --filter @workspace/api-server run dev` — run the API server manually
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `DATABASE_URL` — Postgres connection string (runtime-managed by Replit, available automatically)
- Persona review process: the agent reads the live site, reasons through each persona's critique, and writes the resulting copy patches directly into `artifacts/gory-resort/src/contexts/ai-content.ts` (imported by `LanguageContext.tsx`) — see the `aiRunMeta` entry in that file for the latest pass. No API key or external LLM call is involved.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- **Sim runs must consult the internet, not just internal reasoning.** When personas propose suggestions or critiques, look things up live (web search) rather than relying solely on training knowledge. Sources are never an exclusive list — search wherever is useful. Design work benchmarks primarily against Awwwards (Site of the Day/Month), plus other current design references as needed. Backend/architecture critiques lean on engineering sources instead (e.g. ByteByteGo, Netflix/Stripe/Cloudflare eng blogs, Hacker News, roadmap.sh, The Pragmatic Engineer) — full, non-exclusive list in `artifacts/gory-resort/PERSONAS.md`.
- **Stay current, not outdated.** Today's date matters for sims — reason and recommend using July 2026-era web design and backend engineering practice, not stale patterns from training data. If unsure whether a technique/library/trend is current, verify via web search before recommending it.

## Gotchas

- **React 19 + `flushSync`**: `flushSync(() => { createRoot.render() })` silently fails to commit in React 19 — `#root` stays empty, all sections invisible. Use plain `root.render(<App />)` (already fixed in `main.tsx`). Never re-introduce `flushSync` for the initial render.
- **Screenshot tool**: Always captures before React's async render commits (React 19 uses macrotask scheduling). Screenshots show only the `#root:empty` CSS loading state (mountain hero). To screenshot below-fold sections, a server-side rendering or puppeteer approach with explicit wait is needed.
- **`#root:empty` CSS**: `index.html` has a CSS loading state (`background-image: url('/images/hero.jpg')`, `min-height: 100dvh`) that mimics the Hero while React hydrates. This is intentional — do not remove it.
- **`wouter@3.x` catch-all route syntax — DO NOT use `"/:rest*"`** (July 12, 2026 incident, see full writeup below). The catch-all route in `App.tsx` must be written as:

  ```tsx
  <Route path="/*">
    <MainSite />
  </Route>
  ```

  NOT `<Route path="/:rest*">`. The named-wildcard form (`":name*"`) is **not** supported by `wouter@3.10.0`'s path matcher — it looks like valid syntax (and is valid in some other routers, e.g. path-to-regexp-based ones), but wouter simply never matches it, for any path, including `/`. There is no warning, no thrown error, no console output of any kind when this happens.

### Incident writeup: "the site isn't scrollable / everything below the hero is blank" (July 12, 2026)

**Symptom reported by user:** phone screenshot showing only the hero/header; nothing below it, and the page did not scroll.

**Why this was hard to diagnose:** the failure produced *zero* signal through every normal debugging channel:
- No error in the Vite dev server terminal.
- No error in the browser console (`page.on('console')`).
- No uncaught exception (`page.on('pageerror')`, `window.onerror`).
- No error caught by a React error boundary (`componentDidCatch` never fired).
- `root.render(<App />)` returned normally — the synchronous call did not throw.
- Reproduced identically in the Vite dev server *and* in a static production build (`vite build` + serve `dist/public`), which ruled out any dev-only plugin (cartographer, dev-banner, HMR) as the cause.
- The built-in `Screenshot` tool is *not useful* for this class of bug either way, because (see the `flushSync`/screenshot gotcha above) it always captures the pre-hydration CSS loading state regardless of whether React ever mounts anything — a screenshot showing just the hero is the same whether the app is healthy or completely broken. Do not trust it to confirm or deny a rendering bug; a below-fold section screenshot is required (see Debugging technique below).

**Root cause:** `App.tsx`'s top-level catch-all route used `<Route path="/:rest*">` inside a `<Switch>`. `wouter@3.10.0` does not match that pattern against any URL. Since it's "just a non-match" rather than an error, `<Switch>` rendered nothing, so the entire `MainSite` tree (Navigation, Hero, Vision, Ski, Stay, Experiences, Investment, PressStrip, Gallery, Contact, Footer) never mounted — `#root` stayed at exactly the pre-render CSS loading state forever. `LanguageProvider` and `Router` above it rendered fine, so the outer shell looked plausible while everything inside `<Switch>` silently disappeared.

**Debugging technique that worked (useful for any "renders blank, no errors anywhere" bug):** stop trusting the `Screenshot` tool for this class of bug and instead drive a headless Puppeteer session directly against the dev server (`scripts/screenshot-sections.mjs` already exists for a similar purpose — see Pointers). Binary-search the render tree by temporarily editing the app entrypoint (`main.tsx`) to insert plain marker `<div>`s at each nesting level — outside `LanguageProvider`, inside `LanguageProvider` but outside `Router`, inside `Router` but outside `Switch`, inside the `Route` itself — then reload and inspect `document.getElementById('root').innerHTML` via `page.evaluate()`. The layer at which markers stop appearing pinpoints the exact failing component, with no reliance on anything being thrown. This is how the failing layer (`Switch`/`Route`, specifically the path pattern) was isolated in a handful of iterations, after which swapping test `Route` path values (`"/"` worked, `"/:rest*"` didn't, `"/*"` did) confirmed the exact fix.

**Fix applied:** changed the one route in `App.tsx` from `path="/:rest*"` to `path="/*"`. No other files were touched for this fix. Verified by rebuilding the `screenshots/` set (`scripts/screenshot-sections.mjs`) and confirming real content (not just the hero) appears in every section screenshot, in both dev and a production build.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/gory-resort/PERSONAS.md` for the full visitor-persona roster (including the god-tier web-designer persona's expertise brief) used in every sim run
