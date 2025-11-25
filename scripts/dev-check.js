#!/usr/bin/env node
/**
 * Self-healing Dev Orchestrator for TRUST.NO.OUTPUT
 * - Starts Shopify CLI (9292) then BrowserSync proxy (3000+)
 * - Detects and reuses healthy existing instances
 * - Persists preview port to .dev-server.json for tests/tools
 * - Monitors Shopify health and performs bounded auto-restarts
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const net = require('net');
const { spawn } = require('child_process');

const STORE = '9csvgi-16.myshopify.com';
const DEV_META_FILE = path.resolve('.dev-server.json');
const REQUEST_TIMEOUT_MS = 2500;
const SHOPIFY_PORT = 9292;
const MAX_SHOPIFY_BOOT_WAIT_MS = 30000;
const SHOPIFY_HEALTH_INTERVAL_MS = 15000;
const SHOPIFY_MAX_RESTARTS = 3;
const SHOPIFY_MAX_HEALTH_FAILS = 3;

const args = process.argv.slice(2);
const FORCE_RESTART = args.includes('--restart');

let shopifyProc = null;
let shopifyRestartCount = 0;
let shopifyHealthTimer = null;
let shopifyConsecutiveFails = 0;

function log(msg) {
  console.log(`[tno-dev] ${msg}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function portInUse(port) {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once('error', () => resolve(true))
      .once('listening', () => tester.close(() => resolve(false)))
      .listen(port, '0.0.0.0');
  });
}

async function fetchRoot(port) {
  return new Promise((resolve) => {
    const req = http.get(
      { host: '127.0.0.1', port, path: '/', timeout: REQUEST_TIMEOUT_MS },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ ok: true, status: res.statusCode, body: data }));
      }
    );
    req.on('error', () => resolve({ ok: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false });
    });
  });
}

function looksLikeThemeHtml(body) {
  if (!body) return false;
  return /Shopify|data-section-id|tno_variant|<html/i.test(body);
}

async function selectPreviewPort() {
  const preferred = parseInt(process.env.DEV_PORT || '3000', 10);
  const candidates = [preferred, preferred + 1, preferred + 2, 3010, 3011];
  for (const port of candidates) {
    const used = await portInUse(port);
    if (!used) return { port, reused: false };
    const root = await fetchRoot(port);
    const healthy = root.ok && looksLikeThemeHtml(root.body);
    if (!FORCE_RESTART && healthy) return { port, reused: true };
  }
  throw new Error('No available preview port found in candidates.');
}

async function waitForShopifyReady(timeoutMs = MAX_SHOPIFY_BOOT_WAIT_MS) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const root = await fetchRoot(SHOPIFY_PORT);
    if (root.ok && root.status < 500) return true;
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
  const command = `shopify theme dev --store=${STORE}`;
  let proc = spawn(command, { stdio: 'inherit', env: process.env, shell: true });

  proc.on('error', () => {
    log('Primary spawn failed; attempting npx fallback...');
    proc = spawn('npx', ['shopify', 'theme', 'dev', `--store=${STORE}`], {
      stdio: 'inherit',
      env: process.env,
    });
  });

  proc.on('exit', (code) => {
    log(`Shopify CLI exited with code ${code}.`);
    if (code !== 0) {
      if (shopifyRestartCount < SHOPIFY_MAX_RESTARTS) {
        shopifyRestartCount += 1;
        const delay = Math.min(5000 * shopifyRestartCount, 20000);
        log(`Auto-restart attempt ${shopifyRestartCount}/${SHOPIFY_MAX_RESTARTS} in ${delay}ms...`);
        setTimeout(async () => {
          const root = await fetchRoot(SHOPIFY_PORT);
          if (root.ok && looksLikeThemeHtml(root.body)) {
            log('Shopify already healthy on port; skip respawn.');
            return;
          }
          shopifyProc = spawnShopify();
        }, delay);
      } else {
        log('Max Shopify auto-restarts reached.');
      }
    }
  });

  shopifyProc = proc;
  return proc;
}

function spawnBrowserSync(port) {
  log(`Starting BrowserSync on port ${port} (proxy -> ${SHOPIFY_PORT})...`);
  const env = { ...process.env, BS_PORT: String(port), BS_UI_PORT: String(port + 1) };
  const command = 'npm run dev:sync';
  let proc = spawn(command, { stdio: 'inherit', env, shell: true });

  proc.on('error', () => {
    log('BrowserSync spawn failed; attempting npx fallback...');
    proc = spawn('npx', ['browser-sync', 'start', '--config', 'bs-config.js'], {
      stdio: 'inherit',
      env,
    });
  });

  proc.on('exit', async (code) => {
    log(`BrowserSync exited with code ${code}.`);
    if (code !== 0) {
      log('Attempting automatic restart of BrowserSync after 3s...');
      await sleep(3000);
      spawnBrowserSync(port);
    }
  });

  return proc;
}

function startShopifyHealthMonitor() {
  if (shopifyHealthTimer) clearInterval(shopifyHealthTimer);
  shopifyHealthTimer = setInterval(async () => {
    const root = await fetchRoot(SHOPIFY_PORT);
    if (root.ok && looksLikeThemeHtml(root.body)) {
      shopifyConsecutiveFails = 0;
      return;
    }
    shopifyConsecutiveFails += 1;
    log(`Shopify health check failed (${shopifyConsecutiveFails}/${SHOPIFY_MAX_HEALTH_FAILS}).`);
    if (shopifyConsecutiveFails >= SHOPIFY_MAX_HEALTH_FAILS) {
      if (shopifyRestartCount < SHOPIFY_MAX_RESTARTS) {
        shopifyRestartCount += 1;
        shopifyConsecutiveFails = 0;
        log(`Attempting Shopify restart ${shopifyRestartCount}/${SHOPIFY_MAX_RESTARTS}...`);
        try {
          if (shopifyProc && !shopifyProc.killed) shopifyProc.kill();
        } catch (_) {}
        setTimeout(() => {
          shopifyProc = spawnShopify();
        }, 1000);
      } else {
        log('Max Shopify auto-restarts reached; stopping health checks.');
        clearInterval(shopifyHealthTimer);
      }
    }
  }, SHOPIFY_HEALTH_INTERVAL_MS);
}

function setupCleanup() {
  const cleanup = () => {
    if (shopifyHealthTimer) clearInterval(shopifyHealthTimer);
    try {
      if (shopifyProc && !shopifyProc.killed) shopifyProc.kill();
    } catch (_) {}
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

(async () => {
  try {
    // 1) Ensure Shopify health/state first
    const portBusy = await portInUse(SHOPIFY_PORT);
    let shopifyHealthy = false;
    if (portBusy) {
      const root = await fetchRoot(SHOPIFY_PORT);
      if (root.ok && looksLikeThemeHtml(root.body)) {
        log(`Shopify CLI already running healthy on ${SHOPIFY_PORT}; reusing.`);
        shopifyHealthy = true;
      } else {
        log(
          `Port ${SHOPIFY_PORT} busy but not serving healthy theme. Please kill stale process and retry.`
        );
        log('Hint: netstat -ano | findstr :9292 then taskkill /PID <pid> /F');
        process.exit(1);
      }
    }

    // 2) Determine preview port and reuse if healthy and not forcing
    const { port, reused } = await selectPreviewPort();
    persistMeta(port);
    if (reused) {
      log('Existing healthy preview detected; skipping startup of new processes.');
      log(`TNO DEV READY (reused) -> http://localhost:${port}`);
      setupCleanup();
      startShopifyHealthMonitor();
      return;
    }

    // 3) Start Shopify if needed and wait for readiness
    if (!shopifyHealthy) {
      spawnShopify();
      const ready = await waitForShopifyReady();
      if (!ready) {
        log('Timed out waiting for Shopify dev server. Aborting.');
        process.exit(1);
      }
    }

    // 4) Start BrowserSync and health monitor
    spawnBrowserSync(port);
    log(`TNO DEV READY -> http://localhost:${port}`);
    setupCleanup();
    startShopifyHealthMonitor();
  } catch (err) {
    log(`FATAL: ${err.message}`);
    process.exit(2);
  }
})();
