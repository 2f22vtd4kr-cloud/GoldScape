---
name: Favorites vs compare shortlist — storage choice convention
description: Why favorites use localStorage and the compare shortlist uses sessionStorage, for any future client-only selection feature on this site.
---

This site has no backend/account system anywhere (confirmed deliberately — see the
contact form fix, which delivers via WhatsApp deep link rather than inventing a CRM).
Any "user picks a set of listings" feature should follow the pattern already
established by favorites (`src/lib/favorites.ts`) and compare
(`src/lib/compare.ts`):

- **localStorage** for selections meant to persist indefinitely across visits
  (favorites/saved listings — a real portal "saved list" equivalent).
- **sessionStorage** for a selection scoped to one browsing task that shouldn't
  linger forever (the compare shortlist — capped at 3 items, cleared naturally when
  the tab/session ends).
- Both expose a `useSyncExternalStore`-based hook so any component can reactively
  read the current set (nav badge counts, button active states, a global sticky bar)
  without prop-drilling or a context provider.

**Why:** keeps new "client-only shortlist" features consistent with each other and
with the site's no-backend architecture, and avoids re-deciding storage semantics
each time.

**How to apply:** before adding a new localStorage/sessionStorage-backed React store,
check whether the selection should outlive the session (→ localStorage, like
favorites) or is a single-task working set (→ sessionStorage, like compare). Also see
`.agents/memory/favorites-getsnapshot-caching.md` — the getSnapshot function passed to
`useSyncExternalStore` must be cached, not rebuilt every call.
