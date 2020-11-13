module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true,
    },
    'ecmaVersion': 6,
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    'semi': ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
  },
};
