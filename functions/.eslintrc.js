module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  rules: {
    'no-void': ['error', { allowAsStatement: true }]
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['standard-with-typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json']
      },
      plugins: [
        '@typescript-eslint'
      ],
      rules: {
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],
        'quote-props': ['error', 'consistent'],
        '@typescript-eslint/array-type': ['error', {
          default: 'generic',
          readonly: 'generic'
        }],
        '@typescript-eslint/prefer-readonly': 'off'
      }
    }
  ]
}
