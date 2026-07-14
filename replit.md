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

## User preferences
