---
name: Graduating a multi-page Canvas mockup into a full site replacement
description: Pattern used when a Canvas mockup (several standalone page components, each with duplicated nav/footer/CSS) replaces an entire existing app, not just one component.
---

When a mockup consists of N "page" components that were each authored standalone (own inline `<style>` block, own
copy-pasted nav/footer JSX) and the user wants them to *replace* the whole site rather than add one component:

- Consolidate the repeated design tokens/CSS into the target app's single global stylesheet once, not per page.
- Extract the repeated nav/footer JSX into one shared `Layout`/`Navigation`/`Footer` in the target app, used by every
  new page — do not keep N duplicated copies just because the mockup had them.
- If the mockup's nav links point to in-page anchors (`#about`) but the pages are becoming separate routes, decide
  whether anchors survive (same page) or become route links (`/about`) — anchors to a section that moved to another
  page must be updated, not carried over verbatim.
- If the existing app has infrastructure (i18n context, an "AI persona review" content pipeline, etc.) that is
  specific to the *old* content being replaced, remove it rather than trying to adapt it — check for other files
  that import it (persona docs, applied-improvements trackers) and remove those too so nothing points at deleted
  content.

**Why:** shipping the mockup's per-page duplication forward into production code creates drift risk (three copies of
the same CSS token set) and is not what "transform mockup code to production patterns" means during graduation.
