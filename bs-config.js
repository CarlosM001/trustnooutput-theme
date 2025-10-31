/**
 * BrowserSync Configuration - FIXED
 * For TRUST.NO.OUTPUT Shopify Theme
 */

module.exports = {
  // Proxy the Shopify CLI dev server (CORRECTED PORT)
  proxy: "http://127.0.0.1:9292",

  // Use a fixed port for BrowserSync
  port: 3000,

  // Watch these files for changes
  files: [
    "assets/**/*.css",
    "assets/**/*.js",
    "sections/**/*.liquid",
    "snippets/**/*.liquid",
    "templates/**/*.liquid",
    "layout/**/*.liquid",
    "config/*.json",
    // Exclude node_modules to prevent watch loops
    "!node_modules/**"
  ],

  // Don't open browser automatically
  open: false,

  // Show notifications
  notify: true,

  // Reload delay to ensure Shopify processes changes
  reloadDelay: 1000,

  // Don't inject CSS changes, reload instead (more reliable with Shopify)
  injectChanges: false,

  // UI options
  ui: {
    port: 3001
  },

  // Ghost mode (syncs scrolls, clicks, forms)
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  },

  // Ignore node_modules
  watchOptions: {
    ignoreInitial: true,
    ignored: /node_modules/
  },

  // Logging
  logLevel: "info",
  logPrefix: "TNO-Sync",
  logConnections: false,
  logFileChanges: true
};
