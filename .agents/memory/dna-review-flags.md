---
name: DNA review scene flags (all 4 listings)
description: Results of full 20-scene DNA review — which scenes pass, which need regeneration, and the window-artifact pattern.
---

# DNA scene review — all 4 listings

## Must regenerate

| File | Problem |
|---|---|
| `p20-bizarre.jpg` | Tesla coil with lightning — DNA says American Psycho business-card scene. Materials match but scene concept entirely wrong. |
| `p18-floorplan.jpg` | White/light void background in top portion — violates the "no white/grey void backgrounds" prohibition. Needs outdoor context (Gospa od Škrpjela + water). |
| `p18-bizarre.jpg` | Old wooden rowing boat in living room — DNA says Jacques Mayol's carbon-fibre monofin, wetsuit, fins (The Big Blue freediving). Concept is right, specific props are wrong. |

## Window-artifact bug (AI hallucination)

Exterior images for **p12**, **p19**, and especially **p20** all show the known "images in windows" bug: the AI renders detailed miniature furnished interior scenes visible through exterior facade windows. Most severe in p20-exterior (every glass panel shows a separate room). This is a hard prompt-side issue — hard-to-eliminate without explicit negative prompting ("no interior views through windows, windows show only sky/landscape reflections").

## Minor mismatches (low priority)

- `p18-section.jpg` renders as a single-floor top-down view rather than a 3-floor stacked section cutaway ("Разрез"). Visually attractive but technically wrong scene type.

## Passing cleanly

- All **p12** scenes: exterior (minor window bug), section ✅, floorplan ✅, bizarre ✅, remote ✅
- **p18-exterior** ✅ (no window bug here — clean exterior)
- All **p19** scenes: exterior (minor glass-door glow), section ✅, floorplan ✅ (best floorplan of all 4), remote ✅ (possibly the best single scene overall), bizarre ✅
- **p20-section** ✅, **p20-matchday** ✅ (Champions League game on TV, Sava + Kalemegdan at dusk — excellent)
