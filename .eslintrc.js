module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    'simple-import-sort'
  ],
  rules: {
    'quote-props': ['error', 'consistent'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [["^\\w"], ["^(@?\\w)"], ["^", "^\\."], ["^\\u0000"]]
      }
    ]
  },
  overrides: [
    {
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
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],
        'quote-props': ['error', 'consistent'],
        '@typescript-eslint/array-type': ['error', {
          default: 'generic',
          readonly: 'generic'
        }],
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/restrict-template-expressions': ['error', {
          allowNumber: true,
          allowNullish: true
        }]
      }
    },
    {
      files: ['*.vue'],
      extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript/recommended'
      ]
    }
  ]
}
