# EstateofMind

A Russian-language real estate brokerage site targeting Russian speakers looking to invest in international property (UAE, Turkey, Cyprus, Georgia, Thailand, Serbia, Montenegro).

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS v4, Wouter (routing), Framer Motion, shadcn/ui components
- **Backend**: Node.js API server (esbuild-bundled, port 8080)
- **Workspace**: pnpm monorepo (`pnpm-workspace.yaml`)

## How to run

```bash
pnpm install          # install all workspace dependencies
```

Workflows start automatically:
- **Frontend** (`artifacts/gory-resort`): Vite dev server on port 5000
- **API Server** (`artifacts/api-server`): Express/Hono API on port 8080
- **Mockup Sandbox** (`artifacts/mockup-sandbox`): Component preview server on port 8081

## Key directories

- `artifacts/gory-resort/src/` — frontend app (pages, components, contexts, data)
- `artifacts/api-server/src/` — backend API routes and middleware
- `artifacts/mockup-sandbox/` — isolated component preview environment for Canvas
- `attached_assets/` — property photos and other media
- `PERSONAS.md` — visitor persona definitions for copy/design review

## User preferences
