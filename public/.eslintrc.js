module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'semi': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
    "no-var": 1,
    "camelcase": 2,
    "quotes": [1, "single"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  parser: 'vue-eslint-parser'
}
