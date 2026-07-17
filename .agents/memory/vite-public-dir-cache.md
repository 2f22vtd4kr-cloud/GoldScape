---
name: Vite negative cache for public dir files
description: Files added to public/ after Vite dev server starts may not be served; returns HTML 200 instead of the file.
---

# Vite negative cache for public dir files

## Rule
After writing new static files to `<project>/public/` while the Vite dev server is running, those files may silently return `Content-Type: text/html` (the SPA index.html fallback) instead of the actual file.

**Why:** Vite scans the public directory at startup and caches which files exist. New files written afterward are not picked up without a restart. The negative lookup falls through to the SPA history-mode fallback (index.html), which returns HTTP 200 — making it look like the request succeeded but shows a broken image in the browser.

**Diagnostic:** `curl -sI http://localhost:<PORT>/path/to/new-file.jpg | grep Content-Type` returns `text/html` instead of the expected MIME type.

**How to apply:** Restart the workflow (`WorkflowsRestart`) after adding new files to the public directory. This affects only newly-created files — edits to existing files are picked up via HMR.

Note: Already-existing files in subdirectories under public/ are served correctly without a restart.
