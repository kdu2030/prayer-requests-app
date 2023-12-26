/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    root: true,
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "simple-import-sort/imports": "error"
    }
};