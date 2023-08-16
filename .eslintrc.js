module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'node': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {version: 'detect',},
  },
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  plugins: [
    'react',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-whitespace-before-property': 'error',
    'no-template-curly-in-string': 'error',
    'array-callback-return': 'error',
    'no-multi-spaces': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'no-console': 'warn',
    'eqeqeq': 'error',
    'key-spacing': ['error', { 'afterColon': true }],
    'array-bracket-spacing': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
  }
};
