# Consistency QA Screenshots — 2026-08-11

Visual review of existing AI-generated isometric / architectural scenes for EstateofMind (GoldScape).

These are the **real production assets** currently in `artifacts/gory-resort/public/images/scenes/`.

## Files

| # | File | Property | Finding |
|---|------|----------|---------|
| 01 | p18-exterior-master | Dobrota / Kotor | Best master. White render, glass rail, anthracite frames, Gospa od Škrpjela correct. Minor window-interior glow. |
| 02 | p18-section | Dobrota | Materials + landmark OK, but renders as single-floor cutaway instead of 3-floor stacked dolls-house. |
| 03 | p18-floorplan | Dobrota | Clean isometric, light floors, water edge. Slight void edges. |
| 04 | p18-bbq-life | Dobrota | Excellent blue-hour terrace. Strong identity match to exterior. |
| 05 | p18-bizarre-boat | Dobrota | Building identity holds; prop is wooden boat instead of DNA “Big Blue / monofin” brief. |
| 06 | p20-exterior-window-bug | Belgrade Waterfront | Severe window-interior hallucination — every glass panel shows furnished rooms. Priority regen target. |
| 07 | p12-exterior | Savski Venac | Solid pre-war limestone + Kalemegdan context. |
| 08 | p19-exterior | Sveti Stefan | Strong island landmark pin. |
| 09 | p19-remote-work | Sveti Stefan | One of the best single frames; island fills glass correctly. |
| 10 | p20-section | Belgrade Waterfront | Section for p20. |

## Verdict

- DNA system already improved cross-scene identity vs pre-DNA collage look.
- Remaining issues the new master-reference `generateImage` + strengthened PROHIBITIONS target:
  1. Window-interior bug (p20 exterior worst)
  2. Section camera not producing stacked multi-floor
  3. Bizarre props not matching written DNA briefs
  4. Occasional void backgrounds

## Next

Regenerate masters first, then all dependent scenes with `{ withMasterReference: true }`.
