---
name: useSyncExternalStore getSnapshot must return a stable reference
description: A localStorage-backed store's getSnapshot crashed React with "Maximum update depth exceeded" because it rebuilt a new array every call.
---

`useSyncExternalStore(subscribe, getSnapshot)` compares the return value of `getSnapshot`
across renders with `Object.is`. If `getSnapshot` parses/filters the underlying storage
into a *new* array/object on every single call — even when the underlying data hasn't
changed — React sees a "changed" snapshot on every render, re-subscribes, re-renders,
and spins into an infinite loop (visible as "Maximum update depth exceeded" plus a
console warning "The result of getSnapshot should be cached").

**Why:** this bit a localStorage-backed favorites store (`gory-resort` project) whose
`getSnapshot` did `JSON.parse(raw).filter(...)` fresh every call.

**How to apply:** any custom external-store hook backed by localStorage/sessionStorage
(or similar non-React state) must cache the parsed result and only recompute when the
raw underlying value (e.g. the raw string from `localStorage.getItem`) actually differs
from the last-seen raw value. Update the cache in both the read path and the write path
so writers don't force a spurious recompute either.
