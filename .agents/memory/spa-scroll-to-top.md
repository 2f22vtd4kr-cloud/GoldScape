---
name: SPA scroll position persists across wouter route changes
description: wouter (like the browser's default history API) does not reset scroll on navigation — any new route needs to go through the existing ScrollToTop mechanism.
---

## Context

Navigating between routes with wouter's `Link`/`useLocation` does not reset `window.scrollY` — if a user is scrolled down on one page and follows a link, the next page renders already scrolled past its own top. This caused country-tab pages to appear to "not load at the top."

**Why:** This is the default behavior of the browser History API that wouter builds on; nothing resets it automatically, and there's no compile-time signal that a new page needs it.

**How to apply:** `artifacts/gory-resort/src/App.tsx` has a `ScrollToTop` component (a `useLocation`-keyed `useEffect` calling `window.scrollTo(0, 0)`) mounted inside the `Router`. It already covers every route since routes are children of the same `Router`; no per-page action needed unless the routing structure changes (e.g. a route rendered outside this `Router`).
