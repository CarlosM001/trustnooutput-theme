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
        debounce: 'readonly',
        throttle: 'readonly',
        trapFocus: 'readonly',
        removeTrapFocus: 'readonly',
        onKeyUpEscape: 'readonly',
        routes: 'readonly',
        fetchConfig: 'readonly',
        publish: 'readonly',
        subscribe: 'readonly',
        PUB_SUB_EVENTS: 'readonly',
        CartPerformance: 'readonly',
        CartItems: 'readonly',
        ModalDialog: 'readonly',
        DetailsModal: 'readonly',
        DeferredMedia: 'readonly',
        BulkAdd: 'readonly',
        DetailsDisclosure: 'readonly',
        SearchForm: 'readonly',
        HTMLUpdateUtility: 'readonly',
        SectionId: 'readonly',
        enableZoomOnHover: 'readonly',
        variantItemErrorMobile: 'readonly',
        overlay: 'writable',
        ON_CHANGE_DEBOUNCE_TIMER: 'readonly',
        initializeScrollAnimationTrigger: 'readonly',
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
