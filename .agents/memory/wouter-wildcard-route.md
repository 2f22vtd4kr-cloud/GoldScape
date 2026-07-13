---
name: wouter v3 wildcard route syntax
description: wouter@3.x catch-all routes must use path="/*", not the named-param "/:rest*" syntax — using the latter causes the Route to silently never match, with no thrown error anywhere.
---

## The problem
A catch-all route written as `<Route path="/:rest*">` in `wouter@3.10.0` never
matches, including at `/`. `<Switch>` then renders nothing, and the entire
app tree below it disappears — with **zero** console errors, **zero**
`pageerror` events, and `componentDidCatch`/error boundaries never firing.
`root.render()` returns normally and React commits an empty tree. This
reproduces identically in dev (Vite) and in a static production build, so
it is not a dev-plugin or HMR artifact.

**Why:** wouter v3's path matching only recognizes the bare `*` wildcard
segment (e.g. `"/*"`), not the named-capture form `":name*"` that some
other routers (and older wouter docs/examples) use. A non-matching Route
is not an error condition to wouter/React — it's just "no match," so
nothing throws and nothing logs.

**How to apply:** If a wouter-based app renders a blank page below the
static HTML shell (root div ends up with 0 children, no errors anywhere),
suspect a non-matching catch-all/wildcard route first. Use `path="/*"` for
a catch-all in wouter v3. To diagnose this class of bug fast: render
plain marker `<div>`s at each nesting level (Router → Switch → Route) via
a throwaway edit to the app entrypoint and check `document.getElementById('root').innerHTML`
with Puppeteer — the layer where markers stop appearing pinpoints the
failure without needing any thrown exception.
