module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'quote-props': ['error', 'consistent'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [{
    files: ['*.ts'],
    env: {
      es2021: true,
      node: true
    },
    extends: ['standard-with-typescript'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      project: ['./tsconfig.json']
    },
    plugins: [
      '@typescript-eslint'
    ],
    rules: {
      '@typescript-eslint/array-type': ['error', {
        default: 'generic',
        readonly: 'generic'
      }],
      '@typescript-eslint/prefer-readonly': 'off'
    }
  }]
}
