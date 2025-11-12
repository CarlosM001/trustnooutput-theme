// Flat ESLint config for TRUST.NO.OUTPUT theme
// Focus: assets/**/*.js (ES2022), browser + limited Node (for build scripts)
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['assets/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        Shopify: 'readonly',
      },
    },
    ignores: ['**/node_modules/**', 'backup-phase1/**'],
    rules: {
      ...js.configs.recommended.rules,
      'no-console': ['warn', { allow: ['error'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
    },
  },
];
