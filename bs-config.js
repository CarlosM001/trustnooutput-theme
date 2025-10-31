/**
 * BrowserSync Configuration – Optimized for TRUST.NO.OUTPUT Theme
 * ---------------------------------------------------------------
 * Syncs local CSS/JS/Liquid changes with Shopify CLI Dev Server.
 * Works seamlessly with: `npm run dev`
 */

module.exports = {
  // ✅ Proxy Shopify CLI dev server (port shown in your CLI output)
  proxy: "http://127.0.0.1:9292",

  // ✅ Local BrowserSync port (frontend preview)
  port: 3000,

  // 🔍 Watch these files for live reloads
  files: [
    "assets/**/*.css",
    "assets/**/*.js",
    "layout/**/*.liquid",
    "sections/**/*.liquid",
    "snippets/**/*.liquid",
    "templates/**/*.liquid",
    "config/*.json",
    "!node_modules/**" // prevent watch loops
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
    port: 3001
  },

  // 👻 Disable Ghost Mode (prevents weird scroll/input syncing)
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  },

  // 🧠 Watch settings
  watchOptions: {
    ignoreInitial: true,
    ignored: /node_modules/
  },

  // 🧾 Logging settings
  logLevel: "info",        // "silent", "info", or "debug"
  logPrefix: "TNO-SYNC",   // shows prefix in console logs
  logConnections: false,
  logFileChanges: true
};
