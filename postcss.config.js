// 🔧 postcss.config.js
// PostCSS-Konfiguration für TRUST.NO.OUTPUT Theme
// Optimiert CSS automatisch beim Bauen oder Beobachten

module.exports = {
  plugins: {
    // Fügt automatisch Vendor-Prefixe hinzu (z. B. -webkit-, -moz-, ...)
    autoprefixer: {},

    // Komprimiert das CSS (entfernt Leerzeichen, Kommentare usw.)
    cssnano: {
      preset: 'default'
    }
  }
};
