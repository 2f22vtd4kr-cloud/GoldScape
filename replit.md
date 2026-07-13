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

<!-- Add preferences here as they come up -->
