import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

//import eslintPluginPrettier from "eslint-plugin-prettier"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module', // Use ES modules
      globals: {
        ...globals.browser, // Add browser globals (e.g., `window`, `document`)
      },
    },
    plugins: { prettier: eslintPluginPrettier }, // integrate prettier

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          singleQuote: true,
          parser: 'flow',
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
        },
      ], // Enforce Prettier formatting
      // 'no-console': 'warn',
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  eslintConfigPrettier, // Disable ESLint rules that conflict with Prettier
  pluginJs.configs.recommended, // default by init eslint
];
