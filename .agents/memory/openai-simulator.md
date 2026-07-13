---
name: AI Simulator backend (OpenAI)
description: Durable lessons for the GORY resort AI visitor-persona simulator backend (OpenAI-based, previously Gemini).
---

## insufficient_quota vs rate limit — check err.code, not err.message

OpenAI's SDK returns HTTP 429 for both transient rate-limiting and permanent quota exhaustion (no billing on the account). Don't distinguish them by matching text in `err.message` — the human-readable message isn't a stable substring to key off. Use the structured `err.code` property instead (OpenAI's `APIError.code`, e.g. `"insufficient_quota"`).

**Why:** A retry-with-backoff wrapper that doesn't make this distinction will retry a permanent quota error for ~100s per call, every call, forever — it will never succeed and wastes real time.

**How to apply:** Any retry wrapper around an OpenAI call should check `(err as { code?: string })?.code === "insufficient_quota"` and throw immediately (no backoff) for that case.

## Fallback when no paid LLM billing is available

If the user won't add billing to unblock an automated LLM pipeline, the fallback is the agent itself manually reasoning through the same task the LLM would have done (e.g. persona critique), then applying the result directly to the affected content/config files — bypassing the API for that round.

**Update:** for the GORY resort project specifically, the user later confirmed this manual-agent approach as the permanent architecture (not a temporary fallback) and had the automated OpenAI-based pipeline (simulate/improve/apply routes, the `/simulator` UI page, the `openai` dependency) deleted entirely. Don't assume "leave dormant code in place" is always the right call — ask/check if the project has since standardized on the manual approach before recommending restoring an API-based pipeline.

## Orphaned background processes

A script started directly via shell (not through the workflow supervisor) keeps running even after its *workflow* is removed via `removeWorkflow` — the workflow entry and the OS process are independent. If a workflow is gone but its traffic keeps showing up in another service's logs, check `ps aux` and kill the PID directly.
