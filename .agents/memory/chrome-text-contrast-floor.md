---
name: Chrome-text gradient contrast floor
description: Why decorative linear-gradient text-clip effects (chrome/metal look) need a minimum-luminance floor, and what broke without one.
---

The `.chrome-text` effect (EstateofMind, `artifacts/gory-resort/src/index.css`) clips a repeating
`linear-gradient` to text to fake a polished-metal sheen. The gradient had gone all the way to
near-black stops (`#111111`, `#181818`) to sell the "deep shadow" side of the metal look.

That works fine on a single short word, but on anything long enough to span more of the gradient's
period — a two-line heading, a price string, a multi-word title — some portion of the string
reliably lands on one of the dark stops. Against a black section background that segment becomes
functionally invisible, which read to users as "barely visible text" scattered across the site
even though the CSS was "working as designed."

**Why:** a decorative gradient tuned by eye on one string in isolation doesn't get tested against
every length/line-count of text that will ever use the class — the failure only shows up on the
unlucky strings, so it can look like scattered, unrelated bugs when it's really one shared class.

**How to apply:** for any text-clip / gradient-on-text effect meant to be reused across headings,
labels, or dynamic content (prices, names, etc.), keep every gradient stop above a legible
minimum luminance (dark charcoal, not near-black) against the section background. Keep the
specular white peaks and the shadow contrast between stops for the metal look — just raise the
floor so no stop is illegible on its own. Check the fix against the longest real string that will
use the class (a two-line heading, not just the shortest hero word).
