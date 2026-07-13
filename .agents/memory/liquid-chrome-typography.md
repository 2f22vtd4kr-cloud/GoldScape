---
name: Liquid Chrome Typography System
description: Two-tier proprietary chrome type system for EstateofMind — placement rules, CSS technique, and persona-sim findings.
---

# Liquid Chrome Typography — EstateofMind Definitive Set

## The System (two tiers)

**`.chrome-text`** — Hard specular platinum with animated background-position sweep (11s, `chrome-sweep` keyframe). Multi-stop gradient with a warm platinum hotspot (`#faf8f4`) rather than cold white. Applies to all display headings, brand name, stats, prices.

**`.chrome-text-accent`** — Iridescent conic gradient using the existing `--angle` CSS Houdini property + `spinPrism` animation (9s). Chrome-spectrum color stops (cool violet → ice blue → warm pink → back). Reserves the iridescent quality for *one accent word per hero section* — currently "свободы" in the Home hero H1.

**Why:** Real polished chrome has a hard, narrow specular band, not a diffuse even gradient. The platinum warmth (#faf8f4 peak) reads as luxury; cold white reads as screen/tech. The iridescent accent creates a visual echo between the hero text and the iridescent chrome blob — proprietary character you can't swap out.

## Placement rules

- `chrome-text-accent` should be used **at most once per section** on the single most emotionally loaded word/phrase
- Never put `chrome-text-accent` on body copy or UI chrome (buttons, labels) — it loses meaning through overuse  
- `chrome-text` with `section-reveal-heading` works correctly: the `::after` sweep overlay blends via `mix-blend-mode: overlay` on the element's background; moving chrome-text to a child span and adding accent on a sibling span within the H1 preserves this behavior
- `background-size: 200% auto` is required for the sweep animation — don't remove it

## Persona-sim findings (3 variants evaluated)

- **Chrome Classic** (v1): gradient too uniform, specular band too wide → upgraded to hard specular
- **Liquid Mercury**: SVG feTurbulence warp too subtle at text sizes to read as liquid at first glance; better reserved for large numerics/stats; blue-steel tint interesting but screen-like
- **Mirror Glass**: iridescent accent on single word was the standout — adopted into definitive set

## CSS location

`artifacts/gory-resort/src/index.css` — search for "Liquid Chrome Typography — Definitive Set v2"

## Reduced motion

Both `.chrome-text` and `.chrome-text-accent` degrade gracefully under `prefers-reduced-motion: reduce` — sweep animation disabled, accent frozen at neutral chrome gradient.

## Canvas mockups preserved

`artifacts/mockup-sandbox/src/components/mockups/liquid-chrome/` — ChromeClassic, LiquidMercury, MirrorGlass, Definitive variants with shared `liquid-chrome.css`. The Definitive.tsx uses `def-chrome-*` classes distinct from the live site classes — kept as reference.
