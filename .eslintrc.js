module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2021,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "arrow-spacing": ["warn", { before: true, after: true }],
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
    "comma-spacing": "error",
    "comma-style": "error",
    curly: ["error", "multi-line", "consistent"],
    "dot-location": ["error", "property"],
    "handle-callback-err": "off",
    "keyword-spacing": "error",
    "max-nested-callbacks": ["error", { max: 4 }],
    "max-statements-per-line": ["error", { max: 2 }],
    "no-empty-function": "error",
    "no-floating-decimal": "error",
    "no-lonely-if": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
    "no-shadow": ["error", { allow: ["err", "resolve", "reject"] }],
    "no-trailing-spaces": ["error"],
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    semi: ["error", "always"],
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": "error",
    yoda: "error",
    "vue/multi-word-component-names": "off",
  },
};