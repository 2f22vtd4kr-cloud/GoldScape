---
name: Property listing location-map pattern (PropertyLocationMap.tsx)
description: How each property card's isometric location-map + distance stats are wired — check before adding/removing listings or touching PropertyLocationMap.
---

## Context

Each of the 16 listings in `artifacts/gory-resort/src/pages/Properties.tsx`'s `LISTINGS` array carries a `locationMap` object (type defined in `artifacts/gory-resort/src/components/PropertyLocationMap.tsx`): an isometric terrain-diorama image with a transparent background, plus a `distances` array of drive-time stats (sea, center, malls) shown with Lucide icons. The images live in `attached_assets/generated_images/`, named `listing-map-[city]-[district].png`, and are imported via the `@assets/generated_images/` alias even though the physical folder is `attached_assets`. The component overlays a `MapPin` with a `pulseGlow` keyframe / `.animate-pulse-glow` utility (added to `artifacts/gory-resort/src/index.css`) for a pin-pulse effect.

**Why:** Matches the same "no placeholder, always real generated asset" standard as the main listing photo (see `property-listing-photos.md`) — a missing or mismatched location map/distance set is easy to miss because the type-check doesn't catch a wrong-city image or stale distances.

**How to apply:** If you add, remove, or relocate a listing, generate a matching isometric map image (same style: isometric terrain diorama, transparent background) named `listing-map-[city]-[district].png` in `attached_assets/generated_images/`, and set real drive-time `distances` for that specific property's location rather than copying another listing's numbers.
