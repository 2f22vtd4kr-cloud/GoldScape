---
name: Google Fonts CSS import blocking mobile
description: @import url() for Google Fonts at top of CSS file is render-blocking; causes blank white page on slow/blocked mobile connections
---

## Rule
Never load Google Fonts via `@import url('https://fonts.googleapis.com/...')` in a CSS file. Always use HTML `<link>` tags instead.

**Why:** CSS `@import` is render-blocking — the browser must fully fetch and parse the imported stylesheet before it can apply any styles from the current file. On mobile networks (especially in regions where Google services are throttled or blocked), this causes the entire stylesheet to stall, leaving the page with no styles and a white background. The issue is invisible on desktop Chrome on fast connections.

**How to apply:** In `index.html`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap" />
```
And remove the `@import url(...)` line from the CSS file. This applies to any project using Google Fonts — always prefer HTML link tags.
