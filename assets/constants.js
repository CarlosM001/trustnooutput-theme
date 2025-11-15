// eslint-disable-next-line no-unused-vars -- Exposed as global config constant for other scripts
const ON_CHANGE_DEBOUNCE_TIMER = 300;

// eslint-disable-next-line no-unused-vars -- Shared pub/sub event map used across assets via global scope
const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  optionValueSelectionChange: 'option-value-selection-change',
  variantChange: 'variant-change',
  cartError: 'cart-error',
};
