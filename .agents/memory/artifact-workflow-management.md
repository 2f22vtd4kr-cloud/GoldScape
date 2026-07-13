---
name: Artifact-managed workflow ports/env
description: Why hand-editing workflow run commands for artifact-managed services is wrong, and what to do instead when ports collide.
---

For services registered as artifacts (have a `.replit-artifact/artifact.toml`), the `[services.env]` block in that
file is the authoritative source for env vars like `PORT`/`BASE_PATH` — not the workflow's command line. Manually
prefixing the workflow command (e.g. `PORT=8081 vite dev`) gets silently reverted the next time the platform
regenerates the artifact's workflow, and can leave orphaned node/vite processes holding the old port, causing
`EADDRINUSE` / wrong-port symptoms that look like a fresh bug.

**How to apply:** if an artifact-managed workflow fails to bind its expected port, first check `artifact.toml` for
the already-correct env config, then check for stale processes (`ps aux | grep vite`/`node`) left over from earlier
manual restarts and kill them, then `WorkflowsRestart`. Don't patch the run command.
