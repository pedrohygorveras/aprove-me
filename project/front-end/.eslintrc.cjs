/* eslint-disable no-undef */

const commonPatternRules = {
  "import/order": [
    "error",
    {
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      pathGroups: [
        {
          group: "external",
          pattern: "react",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: ["react"],
    },
  ],
};

const typescriptPatternRules = {
  "react/react-in-jsx-scope": "off",
  "no-console": "error",
  "@typescript-eslint/no-unused-vars": "error",
  "no-useless-rename": "error",
  "typescript-sort-keys/interface": "error",
  "typescript-sort-keys/string-enum": "error",
  "no-restricted-imports": [
    "error",
    {
      patterns: ["..*"],
    },
  ],
  "sort-keys": [
    "error",
    "asc",
    {
      allowLineSeparatedGroups: true,
      caseSensitive: false,
      minKeys: 2,
      natural: true,
    },
  ],
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "prettier",
    "react",
    "import",
    "typescript-sort-keys",
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs"],
  overrides: [
    {
      files: ["*.jsx", "*.js", "*.cjs"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        ...commonPatternRules,
        "prettier/prettier": "error",
        "no-use-before-define": "off",
        "no-invalid-position-at-import-rule": "off",
        "no-console": ["error"],
        "react/prop-types": "off",
        "no-unused-vars": "error",
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      files: ["*.tsx", "*.ts"],
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        ...commonPatternRules,
        ...typescriptPatternRules,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
