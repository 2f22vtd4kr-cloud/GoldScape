# EstateofMind

A Russian-language luxury real estate brokerage site targeting Russian-speaking investors seeking international property (Serbia, Montenegro) as capital preservation and residency vehicles. The visual identity is dark, cinematic noir with liquid-chrome typography and 3D isometric property visualizations. Every listing is a **real property fetched from a real agency** — no placeholder or invented listings.

---

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS v4, Wouter (routing), Framer Motion, shadcn/ui components
- **Backend**: Node.js/Express API server (esbuild-bundled, port 8080)
- **Workspace**: pnpm monorepo (`pnpm-workspace.yaml`)
- **Shared libs**: `lib/db` (Drizzle ORM + PostgreSQL), `lib/api-spec` (OpenAPI 3.1 schema), `lib/api-zod` (Zod schemas), `lib/api-client-react` (TanStack Query hooks)

## How to run

```bash
pnpm install          # install all workspace dependencies (required after fresh clone)
```

Workflows start automatically:
- **Frontend** (`artifacts/gory-resort`): Vite dev server on **port 5000**
- **API Server** (`artifacts/api-server`): Express API on **port 8080**
- **Mockup Sandbox** (`artifacts/mockup-sandbox`): Component preview server on **port 8081**

---

## Key directories

```
artifacts/
  gory-resort/          # Main frontend app
    src/
      pages/            # Route-level page components
      components/       # Reusable UI components
      components/ui/    # shadcn/ui Radix primitives
      data/             # Static data: listings, scenes, countries
      contexts/         # React contexts (theme, language, favorites, compare)
      hooks/            # Custom hooks
    public/images/      # Property cover photos + scene images
    public/images/scenes/  # Carousel scene images (p12-*, p18-*, p19-*, p20-*)
  api-server/           # Express backend
    src/
      routers/          # Route handlers (currently: health.ts)
      lib/              # Logger
  mockup-sandbox/       # Isolated Vite environment for Canvas component previews
lib/
  db/                   # Drizzle ORM schema + migrations (PostgreSQL)
  api-spec/             # openapi.yaml + Orval codegen config
  api-zod/              # Zod schemas from OpenAPI spec
  api-client-react/     # TanStack Query hooks (generated)
attached_assets/
  generated_images/     # Isometric location maps + terrain maps (PNG, transparent bg)
scripts/                # Terrain map processing, screenshot tooling
PERSONAS.md             # Visitor persona definitions for copy/design review
```

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home.tsx` | Hero landing, destination grid, featured properties, process steps, testimonials |
| `/properties` | `Properties.tsx` | Full listing grid with filters (country, type, price, beds, crypto) |
| `/properties/:id` | `PropertyDetail.tsx` | Full detail page: carousel, location map, description, legal/yield/risk analysis |
| `/countries/:code` | `CountryPage.tsx` | Country-level investment guide with isometric terrain map, stats, and market table |
| `/compare` | `Compare.tsx` | Side-by-side comparison of up to 4 properties (sessionStorage) |
| `/favorites` | `Favorites.tsx` | Saved listings (localStorage, persists across sessions) |
| `/tax` | `TaxGuide.tsx` | Tax and legal guidance per jurisdiction |
| `/about` | `About.tsx` | Agency mission and team |

---

## Key components

### Property display
- **`PropertyCard.tsx`** — listing card with image, price, tags, favorite/compare buttons, glow-on-hover
- **`PropertyScenesCarousel.tsx`** — carousel shows **only** the 3D terrain bird-view («Птичий полёт»). AI exterior/section/life/bizarre renders are product-banned. Pulsating accent dot permanently removed.
- **`PropertyLocationMap.tsx`** — isometric site map with animated pin, drive-time distances

### UI / chrome
- **`Navigation.tsx`** — fixed top nav with dark/light mode toggle, favorites count badge, language switcher
- **`Footer.tsx`** — full-width footer with country links and service columns
- **`CompareBar.tsx`** — sticky bottom compare tray, appears when ≥1 property selected
- **`FavoriteButton.tsx`** — heart toggle wired to localStorage via `useFavorites` context
- **`WhatsAppFloat.tsx`** — floating WhatsApp CTA button
- **`ChromeShape.tsx`** — liquid-chrome iridescent blob (hero decoration)
- **`Layout.tsx`** — shared page wrapper (nav + footer + scroll-to-top)

### Contexts
- **`ThemeContext`** — dark/light mode, persisted to localStorage
- **`LanguageContext`** — Russian UI strings (all copy is in Russian)
- **`FavoritesContext`** — favorite listing IDs (localStorage)
- **`CompareContext`** — compare selection (sessionStorage, max 4)

---

## Data model

### `listings.ts` — `LISTINGS: Listing[]`

**Only real listings from real estate agencies.** Each entry has a verifiable `agencyUrl`.

| ID | Property | City | Price | Agency |
|----|----------|------|-------|--------|
| 12 | Pre-war apartment, Savski Venac | Belgrade, Serbia | €88,000 | Estitor |
| 20 | Corner apartment, Beograd na vodi | Belgrade, Serbia | €370,000 | Atrium Property Services |
| 18 | Seafront apartment, Dobrota | Kotor, Montenegro | €943,800 | Sotheby's Int'l Realty Montenegro |
| 19 | Hillside apartment, Sveti Stefan | Budva, Montenegro | €174,900 | Monteonline |

Each `Listing` has: `id`, `country` (ISO 2-letter), `city`, `district`, `type`, `price`, `pricePerSqm`, `beds`, `baths`, `area`, `image`, `agency`, `agencyUrl`, `exclusive`, `tags`, `crypto`, `locationMap`, `description`, `neighborhood`, `legalFit`, `yieldEstimate`, `riskNote`.

### `scenes.ts` — terrain-only product surface

`getScenesForListing()` returns **only** the isometric site/terrain map (`type: 'site'`, «Птичий полёт»).
`ACTIVE_SCENE_TYPES` is empty — archived `PROPERTY_SCENES` entries (exterior/section/life/bizarre) are **not shown** and must not be regenerated.

### `countries.ts` — `COUNTRIES: CountryData[]`

8 countries with investment market data: UAE, Turkey, Cyprus, Georgia, Thailand, Portugal, Serbia, Montenegro. Each has: `code`, `listingCode`, `nameRu`, `capital`, `currency`, `entryPrice`, `mapImage` (terrain map PNG), `tagline`, `stats[]`, `features[]`, `markets[]`, `visa`, `taxNote`.

> Countries remain even when they have no active listings — their pages provide informational investment guides.

---

## Image generation — HARD PRODUCT RULE (2026-08-11)

> **ONLY 3D isometric terrain / bird-view map tiles are allowed as generated scene art.**
> Do **NOT** generate, regenerate, or ship: exterior CGI, section cutaways (Разрез), floorplans (Планировка), life_* lifestyle scenes, or bizarre scenes.
> Those AI property renders are banned — they look inconsistent and do not represent the real listings.

### What is allowed
| Asset | Purpose | Location |
|-------|---------|----------|
| **3D isometric terrain / site map** (`listing-map-*.png`, transparent bg) | «Птичий полёт» bird-view for each listing | `attached_assets/generated_images/` → wired as `locationMap.image` |
| **Country terrain map** (`terrain-map-*-nobg.png`) | Country page iso tile | same |
| **Real agency photos** | Card/detail photography | `agencyPhotos` on the listing — never invent photos |

### What is banned (do not generate)
- `exterior`, `section`, `floorplan`, `life_*`, `bizarre` AI renders
- Any “dolls-house” cutaway, monofin living-room, American Psycho set dressing, tiger-in-shower, etc.
- Photoreal “agency exterior” CGI that is not a real agency photo

### Runtime behaviour
`getScenesForListing()` injects **only** the site terrain map (`type: 'site'`, label **Птичий полёт**).
`ACTIVE_SCENE_TYPES` is an **empty Set** — the `PROPERTY_SCENES` catalog may still exist on disk for archive, but **nothing from it is shown** until a future explicit product decision re-enables specific types.

### DNA system (`property-dna.ts`)
DNA anchors remain useful for **terrain-map** prompts (building massing, coast, city context) and for future work **if** product ever re-enables a scene type. Do **not** use DNA to mass-generate banned scene types.

### Adding a listing image set
1. Verify real listing + `agencyUrl`.
2. Prefer real `agencyPhotos` from the agency page for the card/detail gallery.
3. Generate **one** 1024×1024 **isometric terrain / site map** (white studio bg → `pnpm process-maps` → `*-nobg.png`).
4. Wire as `locationMap.image`. That is the only generated scene.

## Adding a new real listing

1. Verify the listing exists on the agency's website and save its exact URL as `agencyUrl`.
2. Add the entry to `LISTINGS` in `artifacts/gory-resort/src/data/listings.ts`.
3. Pull real photos into `agencyPhotos` when possible (card + detail gallery).
4. Generate **only** an isometric terrain / site map (1024×1024 PNG) and run `pnpm process-maps` → `*-nobg.png` in `attached_assets/generated_images/`.
5. Import the map and wire it as `locationMap.image`.
6. Optional cover: `artifacts/gory-resort/public/images/prop-<slug>.jpg` from a real agency photo — not AI exterior CGI.
7. Do **not** add exterior / section / floorplan / life / bizarre AI scenes. `ACTIVE_SCENE_TYPES` stays empty.

## Adding a new country

1. **Generate the terrain map** — 1024×1024 isometric aerial PNG → `attached_assets/generated_images/terrain-map-<country>.png`.
2. **Strip the white background** — `pnpm process-maps` → creates `terrain-map-<country>-nobg.png`. If white patches remain, use `FUZZ=8 pnpm process-maps`.
3. **Import in `countries.ts`** — add a new `CountryData` entry. Point `mapImage` at the `-nobg.png` file.
4. **CSS reminder** — `.iso-tile` in `index.css` must NOT have `box-shadow` or `border` (they clip to the rectangular bounding box, not the terrain shape). Use `filter: drop-shadow()` in `CountryPage.tsx` instead.

---

## Design system

- **Dark mode first** — background near `#050505`, surfaces at `#0a0a0a` / `#111`
- **Typography**: Oxanium (headings/prices), Space Grotesk (body/UI), both loaded via Google Fonts HTML link tags (not CSS `@import` — avoids mobile render-blocking)
- **Chrome text**: `.chrome-text` = platinum sweep gradient; `.chrome-text-accent` = iridescent conic gradient. These are the primary hero/headline treatments.
- **Accent colors**: per-property `accentColor` (HSL) drives filmstrip borders, glow, and active states in `PropertyScenesCarousel`
- **Light mode**: supported via `ThemeContext`; text opacity alphas must be re-tuned for light backgrounds — do not reuse dark-mode values directly

---

## Known architectural decisions

- **No backend for property data** — all listings and scenes are static TypeScript data files. The API server exists for future lead/enquiry storage.
- **Favorites = localStorage** (persist across sessions); **Compare = sessionStorage** (cleared on tab close).
- **Routing**: Wouter v3 — catch-all route must be `path="/*"` not `/:rest*`.
- **React 19 + concurrent rendering** — never wrap `createRoot.render()` in `flushSync`; screenshot tools capture before async render commits.

---

## User preferences
