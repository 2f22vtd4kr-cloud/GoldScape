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

## Session log

### July 14, 2026 — Liquid Glass system hardening + blob animation

#### Nika design review (5 findings fixed)

Ran the full Nika god-tier web designer persona pass (per `PERSONAS.md`) with desktop + mobile screenshots and competitive research (Awwwards, CSS-Tricks liquid glass, Sotheby's International Realty).

**Finding 1 — Glass invisible on dark backgrounds.**  
`backdrop-filter: blur()` on a pure-black hero returns black — no refraction, no depth. Fixed by strengthening `liquid-glass-neutral` background fill from `rgba(255,255,255,0.13)` to `rgba(255,255,255,0.22)` at the top of the radial gradient, making it self-luminous regardless of what's behind it.

**Finding 2 — Rectangle buttons kill the specular arc illusion.**  
`border-radius: 8px` makes the inset specular look like a flat 1px separator, not light catching a curved surface. Added `.hero-cta-pill` utility class (`border-radius: 50px`) and applied it to both hero CTAs in `Home.tsx` (ПОДОБРАТЬ ОБЪЕКТ + НАПИСАТЬ В WHATSAPP only — other button usages unchanged).

**Finding 3 — Specular highlights were too weak to see.**  
Primary button inset specular raised from `rgba(255,255,255,0.55)` → `0.70`. Ghost button from `0.22` → `0.55`. Both now visible from arm's length on mobile.

**Finding 4 — Ghost button had no self-contained color (borrowed-refraction-only).**  
Over black hero the ghost was invisible as a glass object. Added a faint iridescent linear fill (white → indigo → sky → white) + soft ambient halo (`0 0 18px rgba(150,130,255,0.06)`) so it reads as a physical object even without interesting background content.

**Finding 5 — Nav КОНСУЛЬТАЦИЯ was a rectangle on mobile.**  
`.eom-btn-oilslick` converted to pill (`border-radius: 50px`), specular arc raised to `rgba(255,255,255,0.45)`. The oilslick gradient animation now reads as a genuine curved glass object in the mobile nav.

#### Hero blob animation upgrade

**Slow organic float.** Replaced `animate-float` (7s simple up/down) on the hero blob wrapper with a new dedicated `hero-blob-float` class using `heroBlobFloat` keyframe — 22s cycle, 6 waypoints combining `translateY` (up to −26px), `translateX` drift (±14px), rotation (±3.6°), and scale breathing (1.0→1.038) for a lazy zero-gravity figure-8 path.

**Full-spectrum color flow.** Upgraded `gasoline-hue-drift` from a 22s, 50°-range hue rock to a 28s full 360° sweep with saturation breathing (115%→195%) and per-keyframe drop-shadow color shifts (violet → magenta → cyan → emerald → indigo → purple → amber). Colors appear to travel *through* the chrome body rather than tinting the whole shape.

**Mobile color-flow fix.** The mobile hero blob had `filter: 'blur(0.5px)'` set as an inline style on the `<img>`, which silently overrode the CSS animation's `filter` property, leaving the mobile blob a static grey. Moved the blur to a wrapper `<div>` so the `gasoline-hue-drift` animation now reaches the image on mobile too.

---

## User preferences
