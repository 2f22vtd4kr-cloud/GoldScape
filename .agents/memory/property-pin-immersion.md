---
name: Property card pin marker & "fly into building" immersion
description: The isometric location-map pin was redesigned from a literal MapPin icon (misread as a lightbulb) to an animated glow marker that opens a full-screen immersion transition.
---

## Context

`PropertyLocationMap.tsx`'s marker used to be a filled, glow-shadowed Lucide `MapPin` — at small size with heavy blur, its round head + narrow stem silhouette reads as a lightbulb, not a location pin. Replaced with `.property-pin` (in `index.css`): a small button with a slow-breathing (`pin-breathe`) iridescent oil-slick halo (`pin-spill-spin`, same conic-gradient palette family as `.iridescent-spill`/`.hero-glow-spill`) around a solid white core — draws the eye without resembling a generic icon.

Clicking the pin now opens `PropertyImmersion.tsx`: a full-screen `clip-path: circle()` iris-wipe anchored at the exact click coordinates (passed up as `{x,y}` viewport %), which crossfades the isometric map into the listing's real photo — simulating "flying into" the marked building. It reuses each listing's existing single hero photo (`item.image`) rather than a multi-photo gallery, framed with price/specs/CTA overlay.

**Why:** Building true multi-photo per-listing galleries (16 listings × several new generated images) was out of scope for a single UI fix; the single-hero-photo immersion still satisfies "feels like you're inside the property" without that cost. Revisit if the user wants a real gallery per listing later.

**How to apply:** If adding a similar "marker that opens a detail/immersion view" elsewhere, reuse `.property-pin` classes and the `PropertyImmersion` click-origin pattern rather than inventing a new transition mechanism.
