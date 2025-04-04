/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "react-hooks"],
  root: true,
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn"
  },
};
