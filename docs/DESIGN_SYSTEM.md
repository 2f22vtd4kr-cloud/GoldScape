# EstateOfMind design system

One coherent visual language — auction-house / global brokerage, not proptech neon.

## References (style only — not copied assets)

| Reference | Takeaway |
|-----------|----------|
| **Sotheby’s Realty** | Photography carries weight; cream/white or deep dark; lifestyle over database |
| **Christie’s / auction catalogues** | Serif display, restrained captions, lots of air |
| **Compass** | Strict palette discipline; B/W + one accent |
| **Knight Frank** | Institutional calm; research tone |

We do **not** mix random Figma UI-kit chrome, glassmorphism packs, and neon Dribbble accents. Decorative `/chrome/*` blobs are legacy — avoid new uses.

## Typography

| Role | Font | Use |
|------|------|-----|
| Display / H1–H2 | **Cormorant Garamond** | Page titles, hero lines |
| UI / body | **Space Grotesk** | Nav, cards, filters, body |
| Avoid for new UI | Oxanium (legacy) | Feels gamer/tech; phase out |

Loaded in `index.html` via Google Fonts.

## Color

- **Dark canvas:** near-black blue-gray (`--background` ~ `#0b0d10`)
- **Cards:** slightly lifted surface, 1px hairline border
- **Accent:** warm gold `#a67c3d` → `#c9a36a` (primary buttons, yields, highlights)
- **Success / verified:** emerald, used sparingly
- **No** rainbow iridescent text on catalogue/detail content

## Components

### Property card
1. Large photo (4:3)
2. Price on photo
3. Place + type
4. Specs row
5. Terrain map (secondary)
6. Agency attribution

### Buttons
- Primary: pill, solid gold gradient (`.eom-btn-primary`)
- Secondary: ghost / hairline border

### Filters
- Quiet chips; active = gold or emerald border, not loud glass stacks

## Imagery rules

| Asset | Style |
|-------|--------|
| Agency photos | Real bureau only |
| Terrain maps | Consistent 3D extruded geo block, white studio ground |
| Decorative chrome PNGs | Do not expand; prefer pure type + photo |

## Anti-patterns

- Mixing serif + Oxanium + iridescent in one section
- Badge spam over photography
- Metallic “chrome-text” on every heading
- Random stock UI kits with conflicting radii/shadows

## Implementation files

- Tokens: `artifacts/gory-resort/src/index.css` (`:root`, `.dark`, `.eom-card`, `.eom-btn-primary`)
- Cards: `components/PropertyCard.tsx`
- Catalogue header: `pages/Properties.tsx`
