#!/usr/bin/env node
/**
 * Validate JSON files in config/ to prevent invalid JSON from being committed.
 * Usage: node scripts/validate-json.js
 * Exit code: 0 = success, 1 = validation error
 */
const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'config');
const files = ['settings_schema.json', 'settings_data.json'];

let hasError = false;

files.forEach((file) => {
  const filePath = path.join(CONFIG_DIR, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${file} not found, skipping...`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`✅ ${file} is valid JSON`);
  } catch (err) {
    console.error(`❌ ${file} is INVALID:`);
    console.error(`   ${err.message}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('\n🚫 JSON validation failed. Fix errors before committing.');
  process.exit(1);
} else {
  console.log('\n✨ All JSON files valid.');
  process.exit(0);
}
