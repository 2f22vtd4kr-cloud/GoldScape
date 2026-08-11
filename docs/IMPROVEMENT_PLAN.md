# EstateOfMind improvement plan — status

Tracking the follow-up plan from 2026-08-11.

## Done

| Item | Status |
|------|--------|
| P0 Agency-primary gallery (detail already had it; cards show photo count + link) | Done |
| P0 Verified listing helpers (`listingIntegrity.ts`) | Done |
| P0 CI audit (`pnpm audit:listings`) | Done — 19/19 hard PASS |
| P0 p12 price/DNA aligned to Estitor BW Simfonija | Done |
| P1 AI property scenes disabled; only terrain bird-view | Done |
| P1 Agency attribution + outbound link on card & detail | Done |
| P2 Residency filter (ВНЖ / резидентство) | Done |
| P2 Investment blocks already on detail (legal / yield / risk) | Present |
| P2 Compare page / bar | Already existed |
| P3 DNA coverage audit | Done |
| P3 Visual regression script for scenes | Done |
| P3 Multi-provider image regen (dormant without paid keys) | Done |

## Partial / next

| Item | Notes |
|------|--------|
| Agency photos for all listings | Many still `agencyPhotos: []` — scrape/add manually |
| Terrain map visual consistency | Same angle/lighting across countries — creative pass |
| Pin accuracy audit | Manual geo check per `pinPos` |
| Monthly agencyUrl health check | Automate 404/price drift later |
| Country deep-dive content | Editorial |

## Commands

```bash
pnpm audit:listings   # hard-fail if missing agencyUrl / core fields
pnpm audit:dna        # DNA vs listings coverage
pnpm audit:visual     # scene baseline compare
pnpm process-maps     # strip white bg from terrain-map-*.png
```
