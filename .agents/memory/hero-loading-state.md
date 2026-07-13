---
name: Hero black screen / loading state
description: Why the GORY hero shows as pure black in screenshots and on slow mobile — and how to fix it
---

## The Rule
The CSS `#root:empty` loading state must look like the actual hero. If it shows pure black or low-opacity text, that IS what users and screenshot tools see.

**Why:** The screenshot tool (Puppeteer `waitUntil: 'domcontentloaded'`) fires before React 19's concurrent renderer commits to the DOM. React `createRoot().render()` is asynchronous — the module script completes but the DOM update is deferred. So `#root` is still `:empty` at screenshot time. Using `flushSync` does NOT help because the screenshot fires before the module script itself finishes loading all its imports.

**How to apply:** In `index.html`:
- Set `#root:empty { background-image: url('/images/hero.jpg'); background-size: cover; ... }` 
- Use `#root:empty::before` for overlays and `#root:empty::after` for the wordmark
- Match font-size, letter-spacing, and color exactly to the React component
- Add `<link rel="preload" href="/images/hero.jpg" as="image" fetchpriority="high">` to start the image download immediately

The preload link ensures the image is in the browser cache by the time React renders, so there's no flash of black when React takes over from the CSS loading state.
