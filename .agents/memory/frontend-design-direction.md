---
name: Frontend Design Direction (EstateofMind)
description: Aesthetic lock derived from Anthropic frontend-design skill principles. Distinctive liquid-chrome noir identity — never default AI startup template.
---

# Frontend Design Direction — EstateofMind

Grounded in Anthropic’s **frontend-design** skill: commit to a specific aesthetic *before* coding; avoid the three AI-default looks (warm cream + terracotta serif; acid-green on black; broadsheet dense columns) unless the brief demands them.

## Subject (locked)

| Axis | Choice |
|------|--------|
| **Product** | Luxury real-estate brokerage for Russian-speaking capital seeking hard assets abroad (Serbia, Montenegro primary) |
| **Audience** | Anxious, high-stakes savers (Viktor / Irina / Dmitri personas) — trust > trendiness |
| **Page job** | Convert skepticism into a consultation / property view with cinematic proof of real listings |
| **Material world** | Polished chrome, noir cinema, agency photography, Balkan coast limestone, liquid mercury |

## Signature (one memorable thing)

**Liquid chrome as living metal** — specular type (`.chrome-text`), oil-slick CTAs, chrome shapes/blobs, metal-rim controls. Everything else stays disciplined noir glass and calm layout so the metal reads as proprietary, not decoration.

## Token system

### Color (named)
| Token | Hex / note | Role |
|-------|------------|------|
| Void black | `#080808` / near-black | Dark mode ground |
| Warm paper | `#FAF9F6` (hsl 40 25% 97%) | Light mode ground |
| Platinum peak | `#faf8f4` / `#ffffff` in chrome stops | Specular highlights |
| Chrome trough | `#4c4c48`–`#2a2824` | Metal body shadows |
| Gold warm | `#c9a36a` → `#a67c3d` | Primary solid CTA (not rainbow) |
| Oilslick spectrum | deep violet → electric blue → cyan → magenta → gold | Decorative chrome only |
| Pink accent | `#f596b4` | Favorites / sparse UI accent |

**Anti-defaults:** No Inter. No purple mesh gradient hero. No generic “01 / 02 / 03” unless content is a real sequence. No acid-green accent.

### Type
| Role | Face | Notes |
|------|------|--------|
| Display / chrome | Oxanium + Space Grotesk (with `.chrome-text`) | Personality lives in material treatment, not novelty fonts |
| Body | System / project sans | Readable, quiet |
| Utility | Oxanium uppercase tracking | Labels, nav, buttons |

### Layout
- Cinematic full-bleed hero with liquid-chrome blob + chrome headline
- Property proof via real agency listings + isometric AI scenes (PropertyDNA)
- Floating glass nav over content; metal for interactive brand controls
- Mobile: ≥44px targets; glass budget limited; chrome controls stay CSS-only

### Motion
- Springs on chrome switches (ζ ≈ 0.83 thumb / 0.61 icon)
- Slow sheen / rim spin only where metal lives; reduced-motion disables
- Prefer one orchestrated moment over scattered micro-animations

## Process (every UI change)

1. **Name the job** of the surface (e.g. “theme toggle in glass nav”).
2. **Pick material:** glass (floating UI) vs chrome (brand metal) — see `liquid-glass-system.md` / `liquid-chrome-textures.md`.
3. **Check anti-slop:** Would this look the same on a SaaS landing page? If yes, revise.
4. **One risk only:** e.g. metal rim on CTA, not metal rim + prism + noise + extra animation.
5. **Critique:** Chanel rule — remove one accessory before shipping.

## What we explicitly reject (AI slop checklist)

- Inter / Roboto / system-only “safe” display stacks without chrome treatment  
- Purple/blue mesh gradient heroes  
- Generic numbered feature grids without sequential meaning  
- Identical card grids with stock-photo energy  
- Over-animated particles that signal “AI demo”  
- Mixing heavy `backdrop-filter` onto chrome controls (double GPU, muddy identity)

## Related memory
- `liquid-chrome-typography.md`
- `liquid-chrome-textures.md`
- `liquid-glass-system.md`
- `gas-spill-chrome-system.md`
- `PERSONAS.md` (Nika = craft lens)
