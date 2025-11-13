# TRUST.NO.OUTPUT Local Dev Workflow (Self-Healing)

This guide explains the resilient development setup for the Shopify theme.

## Overview

We run two cooperating processes:

1. Shopify CLI dev server (port 9292, serves the raw theme).
2. BrowserSync proxy (dynamic preview port, default 3000) for live-reload + UI.

The orchestrator (`scripts/dev-check.js`) ensures:

- Sequential startup (Shopify first, then BrowserSync).
- Dynamic port selection (3000 → 3001 → 3002…) if the preferred port is blocked.
- Reuse of an already healthy preview instead of spawning duplicates.
- Automatic BrowserSync restart if it crashes unexpectedly.
- Shared metadata in `.dev-server.json` consumed by a11y and performance scripts.

## Starting Dev

```bash
npm run dev
```

Outputs a line like:

```
[tno-dev] TNO DEV READY -> http://localhost:3000
```

If port 3000 was busy or unhealthy you'll see a fallback port (e.g. 3001).

## Restarting Dev

```bash
npm run dev:restart
```

Forces a fresh port evaluation. It will avoid reusing an existing preview even if healthy.

## How Port Detection Works

1. Attempt to bind candidate port (preferred: `DEV_PORT` env or 3000).
2. If in use, fetch `/` and inspect HTML for Shopify/theme heuristics.
3. Healthy + not forcing restart → reuse; otherwise try next port.
4. Persist chosen port: `.dev-server.json`.

## Consuming the Active Port

Accessibility smoke tests and other tooling read:

1. `DEV_PORT` env var (if set), else
2. `.dev-server.json` file, else
3. Default `3000`.

## A11y Smoke Test

After dev is running:

```bash
npm run a11y:smoke
```

The script auto-builds URLs using the active port.

## Environment Variables

- `DEV_PORT` – Preferred preview port before fallbacks.
- `BS_PORT` / `BS_UI_PORT` – Injected internally by orchestrator for BrowserSync.

## Failure Modes & Self-Heal

| Scenario                 | Behavior                                               |
| ------------------------ | ------------------------------------------------------ |
| BrowserSync crashes      | Auto-restart after 3s (simple retry loop).             |
| Shopify dev never boots  | Orchestrator aborts with error after 30s timeout.      |
| All candidate ports busy | Script exits with fatal error; expand range if needed. |

## Manual Recovery Tips

- If a stale process holds a port, kill it via Task Manager or `netstat` + `taskkill`.
- Expand candidate port list inside `scripts/dev-check.js` if you regularly collide with other services.

## Future Enhancements (Suggested)

- Add max restart count for BrowserSync to avoid infinite loops.
- Implement structured JSON logging for integration with log viewers.
- Introduce a lightweight health endpoint proxy check (/ping) instead of HTML heuristic.
- Integrate automatic Lighthouse run post startup for performance baselines.

Reality is under construction — your dev environment now reflects that philosophy: adaptive, fault-aware, and minimal.
