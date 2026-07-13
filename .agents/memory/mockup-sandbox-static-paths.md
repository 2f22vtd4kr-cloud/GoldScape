---
name: Mockup sandbox static asset paths
description: How to correctly reference public/ folder images inside mockup sandbox components, depending on access context.
---

The mockup sandbox runs on port 8081 with Vite base `/`. Its `public/` folder files are served at `/filename` from that server.

**Two access contexts produce different correct paths:**

- **Canvas iframes / screenshot tool / curl** — access the server directly at `https://domain:8081/...`. Use `/chrome/blob.png` (root-relative paths). `/__mockup/chrome/blob.png` hits Vite's SPA fallback and returns `text/html`, breaking image loads silently.
- **Replit proxy / browser preview** — the mockup sandbox artifact has `preview path: /__mockup`. Requests go through the Replit proxy which strips `/__mockup` before forwarding to port 8081. So `/__mockup/chrome/blob.png` in the browser correctly hits `/chrome/blob.png` on the server.

**Rule:** inside mockup components, use `/chrome/...` (root-relative without `/__mockup/` prefix) so images work both via canvas iframes (direct port) and proxy access.

**Why:** Vite's SPA history fallback returns `index.html` for any unmatched path — `/__mockup/*` is never a real file, so it always returns HTML with status 200, making the failure invisible (no 404 error, just a broken image).
