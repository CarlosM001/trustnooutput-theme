#!/usr/bin/env node
/**
 * Self-healing Dev Orchestrator for TRUST.NO.OUTPUT
 * -------------------------------------------------
 * Responsibilities:
 * 1. Determine a viable BrowserSync preview port (prefers DEV_PORT || 3000, falls back 3001+).
 * 2. Detect if an existing server on the chosen port is already a healthy theme preview.
 * 3. Sequentially start: (a) Shopify CLI dev (port 9292) then (b) BrowserSync proxy.
 * 4. Persist chosen port to .dev-server.json so other tools (a11y tests, Lighthouse) can read it.
 * 5. Restart BrowserSync automatically if it crashes unexpectedly.
 * 6. Provide a --restart flag that prefers picking a fresh port if an unhealthy process occupies the current one.
 *
 * NOTE: We avoid aggressive process killing on Windows; instead we suggest manual intervention or port fallback.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const net = require('net');
const { spawn } = require('child_process');

const STORE = '9csvgi-16.myshopify.com'; // Single source of truth for store value.
const DEV_META_FILE = path.resolve('.dev-server.json');
const REQUEST_TIMEOUT_MS = 2500;
const SHOPIFY_PORT = 9292; // Default Shopify CLI dev port.
const MAX_SHOPIFY_BOOT_WAIT_MS = 30000; // 30s safety window.

const args = process.argv.slice(2);
const FORCE_RESTART = args.includes('--restart');

function log(msg) {
  // Unified prefix for easy task filtering.
  console.log(`[tno-dev] ${msg}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function portInUse(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => tester.close(() => resolve(false)))
      .listen(port, '0.0.0.0');
  });
}

async function fetchRoot(port) {
  return new Promise((resolve) => {
    const req = http.get({ host: '127.0.0.1', port, path: '/', timeout: REQUEST_TIMEOUT_MS }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ ok: true, status: res.statusCode, body: data }));
    });
    req.on('error', () => resolve({ ok: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false });
    });
  });
}

function looksLikeThemeHtml(body) {
  if (!body) return false;
  // Heuristics: presence of Shopify assets or theme-specific data attributes.
  return /Shopify|data-section-id|tno_variant|<html/i.test(body);
}

async function selectPreviewPort() {
  const preferred = parseInt(process.env.DEV_PORT || '3000', 10);
  const candidates = [preferred, 3001, 3002, 3003, 3010];

  for (const port of candidates) {
    const used = await portInUse(port);
    if (!used) {
      log(`Selected free preview port ${port}.`);
      return { port, reused: false };
    }
    // If used, check if it's already a healthy preview (allow reuse when not forcing restart)
    const root = await fetchRoot(port);
    if (!FORCE_RESTART && root.ok && looksLikeThemeHtml(root.body)) {
      log(`Reusing existing healthy preview on port ${port}.`);
      return { port, reused: true };
    } else {
      log(`Port ${port} busy (healthy=${root.ok && looksLikeThemeHtml(root.body)}); trying next.`);
    }
  }
  throw new Error('No available preview port found in candidate list. Consider expanding range.');
}

async function waitForShopifyReady(timeoutMs = MAX_SHOPIFY_BOOT_WAIT_MS) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const root = await fetchRoot(SHOPIFY_PORT);
    if (root.ok && root.status < 500) {
      log('Shopify CLI dev server responded; continuing to BrowserSync bootstrap.');
      return true;
    }
    await sleep(1200);
  }
  return false;
}

function persistMeta(port) {
  const meta = { port, timestamp: new Date().toISOString() };
  fs.writeFileSync(DEV_META_FILE, JSON.stringify(meta, null, 2));
  log(`Persisted dev meta -> ${DEV_META_FILE}`);
}

function spawnShopify() {
  log('Starting Shopify CLI dev server...');
  // Using shell invocation improves Windows compatibility (shopify.cmd / shopify.exe).
  const command = `shopify theme dev --store=${STORE}`;
  let proc = spawn(command, {
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });
  proc.on('error', (err) => {
    log(`Primary spawn failed (${err.code}); attempting npx fallback...`);
    proc = spawn('npx', ['shopify', 'theme', 'dev', `--store=${STORE}`], {
      stdio: 'inherit',
      env: process.env,
    });
  });
  proc.on('exit', (code) => {
    log(`Shopify CLI exited with code ${code}.`);
    if (code !== 0) {
      log('Non-zero exit detected. You may need to check authentication, store permissions, or network.');
    }
  });
  return proc;
}

function spawnBrowserSync(port) {
  log(`Starting BrowserSync on port ${port} (proxy -> ${SHOPIFY_PORT})...`);
  const env = { ...process.env, BS_PORT: String(port), BS_UI_PORT: String(port + 1) };
  const command = 'npm run dev:sync';
  let proc = spawn(command, { stdio: 'inherit', env, shell: true });

  proc.on('error', (err) => {
    log(`BrowserSync spawn failed (${err.code}); attempting npx fallback...`);
    proc = spawn('npx', ['browser-sync', 'start', '--config', 'bs-config.js'], { stdio: 'inherit', env });
  });

  proc.on('exit', async (code) => {
    log(`BrowserSync exited with code ${code}.`);
    if (code !== 0) {
      log('Attempting automatic restart of BrowserSync after 3s...');
      await sleep(3000);
      spawnBrowserSync(port); // Simple self-heal; could add max retry guard.
    }
  });
  return proc;
}

(async () => {
  try {
    // Check Shopify CLI health FIRST (before selecting preview port or spawning anything)
    const shopifyPortBusy = await portInUse(SHOPIFY_PORT);
    let shopifyHealthy = false;
    
    if (shopifyPortBusy) {
      const root = await fetchRoot(SHOPIFY_PORT);
      if (root.ok && looksLikeThemeHtml(root.body)) {
        log(`Shopify CLI already running healthy on ${SHOPIFY_PORT}; reusing.`);
        shopifyHealthy = true;
      } else {
        log(`Port ${SHOPIFY_PORT} busy but not serving healthy theme. Please kill stale process and retry.`);
        log('Hint: netstat -ano | findstr :9292 then taskkill /PID <pid> /F');
        process.exit(1);
      }
    }

    const { port, reused } = await selectPreviewPort();
    persistMeta(port);

    if (reused) {
      log('Existing healthy preview detected; skipping startup of new processes.');
      log(`TNO DEV READY (reused) -> http://localhost:${port}`);
      return;
    }

    // Spawn Shopify CLI ONLY if not already healthy
    if (!shopifyHealthy) {
      const shopifyProc = spawnShopify();
      const ready = await waitForShopifyReady();
      if (!ready) {
        log('Timed out waiting for Shopify dev server. Aborting.');
        shopifyProc.kill();
        process.exit(1);
      }
    }

    spawnBrowserSync(port);
    log(`TNO DEV READY -> http://localhost:${port}`);
  } catch (err) {
    log(`FATAL: ${err.message}`);
    process.exit(2);
  }
})();
