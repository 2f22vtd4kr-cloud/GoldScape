---
name: React 19 flushSync with createRoot
description: flushSync + createRoot.render() silently fails to commit the DOM in React 19 — root stays empty, all content invisible.
---

# React 19: flushSync + createRoot.render() is broken

## The rule
Never wrap `createRoot.render()` in `flushSync` in React 19. It appears to succeed (no throw, MAIN_DONE logs) but `#root.innerHTML` is empty immediately after — React schedules the work but doesn't commit it synchronously.

**Why:** React 19 removed synchronous initial rendering for concurrent roots. `flushSync` used to force a sync commit with React 18, but in React 19 the scheduler ignores `flushSync` for the very first `createRoot.render()` call.

**How to apply:** Use plain `root.render(<App />)` in `main.tsx`. React renders asynchronously (macro-task scheduling). If you need to know when the DOM is ready, use `createRoot`'s `onRenderComplete` callback instead.

## Evidence
Diagnostic confirmed in dev: `IMMEDIATE_ROOT_LEN: 0` logged synchronously right after `flushSync` returned, despite no throw. Sections IDs (`vision`, `ski`, etc.) all returned `MISSING` from `getElementById`. Removing `flushSync` resolved the issue.

## Screenshot tool limitation
The Replit screenshot tool captures BEFORE React's async render commits (React uses MessageChannel/macrotask scheduling). Screenshots always show the `#root:empty` CSS loading state. To capture below-fold sections, an SSR approach or puppeteer with explicit `waitForSelector` is needed.
