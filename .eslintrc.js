module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: [
          "tsconfig.json"
        ],
        createDefaultProgram: true
      },
      rules: {
        eqeqeq: "error",
        quotes: [
          "error",
          "double"
        ],
        indent: [
          "error",
          "tab",
          {
            SwitchCase: 1
          }
        ],
        "no-empty-function": [
          "error",
          {
            "allow": [
              "constructors"
            ]
          }
        ],
        "no-cond-assign": "error",
        "no-extra-parens": "error",
        "no-trailing-spaces": "error",
        "no-console": "warn",
        "space-before-blocks": "warn",
        "comma-spacing": "warn",
        "@typescript-eslint/explicit-member-accessibility": [
          "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
          "error"
        ]
      }
    },
    {
      files: [
        "*.html"
      ],
      rules: {
        eqeqeq: "error",
        quotes: [
          "error",
          "double"
        ],
        indent: [
          "error",
          "tab",
          {
            SwitchCase: 1
          }
        ],
        "no-empty-function": [
          "error",
          {
            "allow": [
              "constructors"
            ]
          }
        ],
        "no-cond-assign": "error",
        "no-extra-parens": "error",
        "no-trailing-spaces": "error",
        "no-console": "warn",
        "space-before-blocks": "warn",
        "comma-spacing": "warn",
        "@typescript-eslint/explicit-member-accessibility": [
          "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
          "error"
        ]
      }
    }
  ]
};
