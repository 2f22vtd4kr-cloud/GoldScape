# Consistency QA Screenshots — 2026-08-11

Visual review of existing AI-generated isometric / architectural scenes for EstateofMind (GoldScape).

These are the **real production assets** currently in `artifacts/gory-resort/public/images/scenes/` plus real agency photos for comparison.

## Files

| # | File | Property | Finding |
|---|------|----------|---------|
| 01 | p18-exterior-master | Dobrota / Kotor | **WRONG BUILDING.** AI invented white glass villa on rocks in the water. |
| 02 | p18-section | Dobrota | Follows the wrong building language. |
| 03 | p18-floorplan | Dobrota | Follows the wrong building language. |
| 04 | p18-bbq-life | Dobrota | Attractive but still the wrong building type. |
| 05 | p18-bizarre-boat | Dobrota | Same issue + wrong props vs DNA. |
| 06 | p20-exterior-window-bug | Belgrade Waterfront | Severe window-interior hallucination. |
| 07 | p12-exterior | Savski Venac | Solid pre-war limestone + Kalemegdan context. |
| 08 | p19-exterior | Sveti Stefan | Strong island landmark pin. |
| 09 | p19-remote-work | Sveti Stefan | One of the best single frames. |
| 10 | p20-section | Belgrade Waterfront | Section for p20. |
| 11–13 | REAL-p18-agency-* | Dobrota | **Ground truth** from Sotheby's: multi-storey block, terracotta roof, coastal road, beach, neighbours. |

## Critical finding (p18)

AI exterior invented a white glass villa floating on rocks in the bay.  
Real Sotheby's photos show a multi-storey residential building with **terracotta pan-tile roof** sitting on the coastal road with beach, cars and neighbours.

DNA for p18 has been rewritten to match the real building. All current p18 scene images are invalid and must be regenerated.

## Web research takeaways for realism

- Prefer “architectural photography / restrained / matte finishes / natural weathering” over “luxury CGI render”.
- ControlNet depth + canny (when available) for geometry lock; Gemini multi-image reference is the current substitute.
- Always ground the building on land with correct street/beach context — never let the model invent a different building type.
- Use real agency photos as reference images when regenerating.

## Next

1. Regenerate p18 master exterior from corrected DNA (must show terracotta roof + road + beach).
2. Regenerate all other p18 scenes with master-reference.
3. Audit p12 / p19 / p20 DNA against their real agency photos the same way.
4. Keep adding screenshots here (desktop + mobile when the app is running).
