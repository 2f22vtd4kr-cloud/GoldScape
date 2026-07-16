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
- **`PropertyScenesCarousel.tsx`** — multi-scene image carousel with filmstrip, crossfade, category pill filter (architecture / life / bizarre), keyboard navigation. The pulsating accent dot has been **permanently removed**.
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

### `scenes.ts` — `PROPERTY_SCENES: Record<number, PropertyScene[]>`

Maps listing IDs to ordered scene arrays. Scene 0 is always the isometric site map (injected by `getScenesForListing()`). Scenes are categorized as `architecture` | `life` | `bizarre`.

Each `PropertyScene`: `id`, `type` (exterior / section / floorplan / life_* / bizarre / site), `category`, `label` (Russian), `sublabel`, `image` (public path).

### `countries.ts` — `COUNTRIES: CountryData[]`

8 countries with investment market data: UAE, Turkey, Cyprus, Georgia, Thailand, Portugal, Serbia, Montenegro. Each has: `code`, `listingCode`, `nameRu`, `capital`, `currency`, `entryPrice`, `mapImage` (terrain map PNG), `tagline`, `stats[]`, `features[]`, `markets[]`, `visa`, `taxNote`.

> Countries remain even when they have no active listings — their pages provide informational investment guides.

---

## Image generation rules

All property scene images must follow these rules — **no exceptions**:

- **Style**: 3D isometric architectural visualization — clean, technical precision, dramatic directional lighting, high detail. Think architect's isometric render, not illustration.
- **No people**: zero human figures in any image. Life-scenario scenes (BBQ, remote work, match day) show the *space set up for the activity* — furniture, objects, atmosphere — never the people doing it.
- **No hand-drawn / sketch / illustration style**: the AI generator sometimes defaults to this; always reject it.
- **No text**: no labels, annotations, street signs, or any lettering baked into the image.

### Scene naming conventions (consistent across ALL properties)

| Slot | Scene type | Russian label |
|------|------------|---------------|
| 0 | Site/location map (isometric) | **Птичий полёт** |
| 1 | Exterior view | Экстерьер |
| 2 | Cross-section cut | Разрез |
| 3 | Floor plan | **Планировка** (single floor) / **Планировка · эт. N** (multi-floor) |
| 4+ | Life/bizarre scenes | Specific descriptive label — never the generic word "Архитектура" |

Never call multiple different scene types by the same label.

---

## Adding a new real listing

1. Verify the listing exists on the agency's website and save its exact URL as `agencyUrl`.
2. Add the entry to `LISTINGS` in `artifacts/gory-resort/src/data/listings.ts`.
3. Generate an isometric location map (1024×1024 PNG) and run `pnpm process-maps` to strip the white background → saves `*-nobg.png` in `attached_assets/generated_images/`.
4. Import the map and wire it as `locationMap.image` in the listing.
5. Add a scene set to `PROPERTY_SCENES` in `scenes.ts` following the DNA comment convention (architecture, materials, palette, distinctive features — used as the generation prompt base).
6. Generate all scene images using `generateImage()` following the image generation rules above. Minimum scenes: exterior, section, floorplan + at least one life scene + one bizarre.
7. Add a cover image to `artifacts/gory-resort/public/images/prop-<slug>.jpg`.

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
