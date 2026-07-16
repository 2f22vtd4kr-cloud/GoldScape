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

## Adding a new country

1. **Generate the terrain map** — produce a 1024×1024 isometric terrain/aerial PNG and save it as `attached_assets/generated_images/terrain-map-<country>.png`.

2. **Strip the white background** — AI-generated terrain PNGs always have a solid white background. Run:
   ```bash
   pnpm process-maps
   ```
   This creates `terrain-map-<country>-nobg.png` via ImageMagick corner floodfill (5% fuzz). If the result still has white patches, raise the fuzz level: `FUZZ=8 pnpm process-maps`.

3. **Import in countries.ts** — add a new entry to `artifacts/gory-resort/src/data/countries.ts`. Point `mapImage` at the **`-nobg.png`** file (not the original). Follow the existing shape for all other fields (`slug`, `nameRu`, `capital`, `stats`, `highlight`, etc.).

4. **CSS reminder** — `.iso-tile` in `index.css` must NOT have `box-shadow` or `border` (they apply to the rectangular bounding box, not the terrain shape). Only `transform` + `transform-style` live there; the per-image `filter: drop-shadow()` in `CountryPage.tsx` handles the shadow correctly.

## User preferences
