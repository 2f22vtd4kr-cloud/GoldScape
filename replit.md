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

### 2026-07-13 — Visual/legibility pass on Home & Properties
- Root-caused the "barely visible text" complaint to a single shared CSS class: `.chrome-text`'s metallic gradient dropped to near-black stops, which on longer headings and property prices could land a fully dark segment over part of the string. Raised the gradient floor to a legible charcoal across the board (fixes it site-wide, not just on the pages checked).
- Replaced off-brand imagery on the Home page: the mechanical-eye motif (3 usages) and the rainbow-neon AI face panel, both of which clashed with the platinum/violet liquid-chrome design language.
  - "Свобода капитала" section: swapped the sky photo + eye for an ambient chrome glow + `chrome-blob-twisted.png`.
  - "Почему нас выбирают": swapped the AI face for a real Dubai penthouse photo (Burj Khalifa view) — more trust-building than an abstract render.
  - CTA card: replaced both remaining eye ornaments with `ChromeShape` components (blob + orb).
  - Process-step numerals: recolored the drop-shadow glow from a mismatched neon-blue to the brand's violet/platinum.
- Verified all changes on both desktop and mobile viewports via screenshots; no regressions found. Cleaned up throwaway QA scripts/screenshots afterward.
- Fixed an unrelated port conflict (orphaned Node processes holding ports 5000/8080 from earlier manual scripts) that had crashed the `gory-resort` and `api-server` workflows; killed the stale processes and restarted both cleanly.
