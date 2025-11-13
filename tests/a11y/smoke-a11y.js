/**
 * A11y Smoke Test using Playwright + axe-core
 * - Scans a small set of URLs for critical accessibility violations
 * - Prints violations in a compact table
 */

const { chromium } = require('playwright');
const axeSource = require('axe-core').source;
const fs = require('fs');
let paths = require('./urls.json'); // Repurposed as path-only list, dynamic port is injected.

// Determine active dev port (priority: ENV -> .dev-server.json -> default 3000)
function resolvePort() {
  if (process.env.DEV_PORT) return process.env.DEV_PORT;
  try {
    const meta = JSON.parse(fs.readFileSync('.dev-server.json', 'utf-8'));
    if (meta && meta.port) return String(meta.port);
  } catch (_) {}
  return '3000';
}

const activePort = resolvePort();
const base = `http://localhost:${activePort}`;
// Support legacy full URLs (backwards compatibility): if entry starts with http just keep; else prepend base.
const urls = paths.map((p) => (p.startsWith('http') ? p : `${base}${p}`));

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let exitCode = 0;

  for (const url of urls) {
    console.log(`\n=== A11y scan: ${url} ===`);
    await page.goto(url, { waitUntil: 'load' });

    // Inject axe-core and run
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: ['wcag2a', 'wcag2aa'],
        resultTypes: ['violations'],
      });
    });

    if (results.violations.length) {
      exitCode = 1;
      for (const v of results.violations) {
        console.log(`- ${v.id} (${v.impact}) — ${v.help}`);
        v.nodes.slice(0, 5).forEach((n, i) => {
          console.log(`  [${i + 1}] ${n.target.join(' ')}`);
        });
      }
    } else {
      console.log('No violations found.');
    }
  }

  await browser.close();
  console.log(`\nCompleted a11y smoke run on port ${activePort}.`);
  process.exit(exitCode);
}

run().catch((e) => {
  console.error(e);
  process.exit(2);
});
