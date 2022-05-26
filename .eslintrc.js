/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  env: {
    browser: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
  },
  parserOptions: {
    ecmaVersion: "2022",
  },
  rules: {
    eqeqeq: ["error"],
    camelcase: ["error"],
    yoda: ["error", "never", { exceptRange: true }],
    "no-var": ["error"],
    "no-use-before-define": ["error"],
    "prefer-const": ["error"],
    "prefer-arrow-callback": ["error"],
    "prefer-template": ["warn"],
    "array-callback-return": ["error", { checkForEach: true }],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-constructor-return": ["error"],
    "no-self-compare": ["error"],
    "no-unreachable-loop": ["error"],
    "no-else-return": ["error", { allowElseIf: false }],
    "no-lonely-if": ["error"],
    "no-multi-assign": ["error"],
    "no-multi-str": ["error"],
    "require-await": ["error"],
    "spaced-comment": ["error"],
    "vue/eqeqeq": ["error"],
    "vue/camelcase": ["error"],
    "vue/prefer-template": ["warn"],
    "vue/no-template-target-blank": ["warn"],
    "vue/no-static-inline-styles": ["warn"],
  },
};
