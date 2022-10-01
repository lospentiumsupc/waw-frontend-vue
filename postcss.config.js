/* eslint-env node */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-prefix-selector": {
      prefix: ".primevue",
      transform: (prefix, selector) => {
        if (selector.startsWith(".p-")) {
          return `${prefix} ${selector}`;
        }
        return selector;
      },
    },
  },
};
