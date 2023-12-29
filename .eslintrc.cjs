const prettierrc = require('./.prettierrc');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended', // for using Vue.js 2.x.
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['prettier', 'json', 'simple-import-sort'],
  rules: {
    'prettier/prettier': ['error', prettierrc],
    'json/*': ['error', { allowComments: true }],
    'json/trailing-comma': prettierrc.trailingComma === 'none' ? 'off' : 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'vue/multi-word-component-names': 'off'
  },
  ignorePatterns: ['dist', 'functions']
};
