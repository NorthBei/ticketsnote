const prettierrc = require('../.prettierrc');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier', 'json', 'simple-import-sort'],
  rules: {
    'prettier/prettier': ['error', prettierrc],
    'json/*': ['error', { allowComments: true }],
    'json/trailing-comma': prettierrc.trailingComma === 'none' ? 'off' : 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true
      },
      rules: {}
    }
  ],
  globals: {}
};
