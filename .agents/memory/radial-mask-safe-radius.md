---
name: Radial-gradient mask needs radius that fits inside its own box
description: Why an off-center CSS mask ellipse can show a hard "cliff" even with many soft gradient stops, and how to size it so it never can.
---

A `mask-image: radial-gradient(ellipse Rx% Ry% at X% Y%, ...)` is masked to the
element's own border-box on top of the gradient's own stops. If the ellipse's
radius (in px, derived from `Rx%`/`Ry%` of the box's own width/height) is
bigger than the distance from the center point to the box's *nearest* edge in
that direction, the gradient gets truncated by the box boundary before it
finishes fading — you get a real cliff (often still >40% opacity) right at
the box edge, no matter how many soft color-stops you wrote. Multi-stop
smoothness only fixes banding *within* the radius; it can't fix a mask that
never reaches the box edge in the first place.

**Why:** an off-center hot spot (e.g. `at 62% 50%`) has very unequal
distances to each edge (in a 1300px-wide box centered at 62%, that's 38% to
the right edge but 62% to the left). A single symmetric ellipse radius can't
satisfy "big enough to sweep left" and "small enough to finish before the
near edge" at the same time — pick the radius for the *tightest* side or the
far side will show a hard cutoff.

**How to apply:** before shipping any off-center radial mask/glow, compute
`distance_to_nearest_edge% = min(X%, 100-X%, Y%, 100-Y%)` and cap the radius
at roughly that value (minus a couple points of safety margin, so the
gradient's already-near-zero tail lands at/before the edge). If you need a
longer reach in one direction than the box safely allows, don't just enlarge
the radius — enlarge the box itself (or center) so the tight side gets more
room too, or use a second, independently-safe gradient layer for the long
reach instead of stretching one ellipse past its safe limit. Also don't
animate a shape via `border-radius` on a large blurred pseudo-element as a
"morph" — border-radius clips at real pixel values (a 60% radius on a
2000px+ box is 1000+px), so it can carve a visible notch straight into frame
even under heavy blur. Animate the mask gradient's own params (position/size,
same stop list across keyframes) instead — that can only ever produce a soft
fade, never a geometric edge.
