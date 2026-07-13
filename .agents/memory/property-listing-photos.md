---
name: Property listing photography wiring (Properties.tsx)
description: Where EstateofMind property-card images live and how listing IDs map to specific photos — check before adding/removing listings or noticing gradient placeholders.
---

## Context

`artifacts/gory-resort/src/pages/Properties.tsx`'s `LISTINGS` array originally rendered every card with a flat CSS `gradient` placeholder instead of a photo, even though real AI-generated photoreal images already existed for 3 of the 16 listings (used on the Home page's `FEATURED_PROPERTIES`) and matched by exact price/beds/baths/area. Fixed by adding an `image` field per listing (dropping `gradient`) and rendering an `<img className="object-cover">` inside the `aspect-[3/2]` card instead of a background-gradient div.

**Why:** Nika (design-craft persona in `PERSONAS.md`) mandates real photography on listing cards — colored gradient blocks fail the "editorial-magazine standard" and cost trust with the anxious Viktor/Irina personas.

**How to apply:** All 16 listings now have unique `/images/prop-*.jpg` files (3 reused from Home's featured set, 13 generated fresh via `generateImage`, one per city/type/price-tier). If you add a new listing, generate a matching photoreal image rather than leaving a gradient — gradients silently pass type-checking and are easy to miss in review.

Also fixed a data mismatch: Home's Cyprus featured property said "Лимасол" but its price/specs actually matched the Properties.tsx Пафос/Koloni listing — corrected the city label in Home.tsx rather than duplicating a new listing.

## Reusable asset note

`public/images/` mixes real-estate-appropriate photos (`prop-*.jpg`, `dest-*.jpg`, `gallery-1..5.jpg`) with leftover ski-resort content from the project's prior life as a resort site (`ski.jpg`, `gallery-noir-*.jpg` likely resort-themed too — verify visually before reusing). Don't assume every file in that folder is safe to reuse for real-estate contexts.
