/**
 * BrowserSync Configuration – Optimized for TRUST.NO.OUTPUT Theme
 * ---------------------------------------------------------------
 * Syncs local CSS/JS/Liquid changes with Shopify CLI Dev Server.
 * Works seamlessly with: `npm run dev`
 */

// Dynamically resolve runtime ports so the orchestrator (scripts/dev-check.js)
// can inject fallback ports when 3000 is busy. Keeps original defaults while
// allowing override via environment variables BS_PORT / BS_UI_PORT.
const previewPort = parseInt(process.env.BS_PORT || '3000', 10);
const uiPort = parseInt(process.env.BS_UI_PORT || String(previewPort + 1), 10);

module.exports = {
  // ✅ Proxy Shopify CLI dev server (fixed default CLI port unless overridden)
  proxy: 'http://127.0.0.1:9292',

  // ✅ Local BrowserSync port (frontend preview) – dynamic / fallback capable
  port: previewPort,

  // 🔍 Watch these files for live reloads
  files: [
    'assets/**/*.css',
    'assets/**/*.js',
    'layout/**/*.liquid',
    'sections/**/*.liquid',
    'snippets/**/*.liquid',
    'templates/**/*.liquid',
    'config/*.json',
    '!node_modules/**', // prevent watch loops
  ],

  // 🚫 Don’t open browser automatically
  open: false,

  // 💬 Show visual reload notifications in browser (good for debugging)
  notify: true,

  // 🕓 Delay reload slightly so Shopify has time to process changes
  reloadDelay: 1000,

  // ⚙️ Don’t inject CSS (Shopify caches asset URLs) → reload fully
  injectChanges: false,

  // 🎛️ Optional BrowserSync UI (accessible at localhost:3001)
  ui: {
    port: uiPort,
  },

  // 👻 Disable Ghost Mode (prevents weird scroll/input syncing)
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false,
  },

  // 🧠 Watch settings
  watchOptions: {
    ignoreInitial: true,
    ignored: /node_modules/,
  },

  // 🧾 Logging settings
  logLevel: 'info', // "silent", "info", or "debug"
  logPrefix: 'TNO-SYNC', // shows prefix in console logs
  logConnections: false,
  logFileChanges: true,
};
