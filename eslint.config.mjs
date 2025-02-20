import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "**/stepDecorator.ts",
      "**/playwright.config.ts",
      "**/node_modules/**",
      "/playwright-report/**",
    ],

    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      "no-console": "error",
      "playwright/no-standalone-expect": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      // enforces a maximum line length to increase code readability and maintainability
      "max-len": [
        "error",
        { code: 140, ignoreUrls: true, ignoreRegExpLiterals: true },
      ],
      // enforces a consistent indentation style
      indent: ["error", 2],
      // enforces consistent use of semicolons
      semi: ["error", "always"],
      // enforces the consistent use of either backticks, double, or single quotes
      quotes: [
        "warn",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      // enforces line breaks after opening and before closing array brackets
      "array-bracket-newline": ["error", "consistent"],
      // enforces consistent spacing inside array brackets
      "array-bracket-spacing": ["error", "never"],
      // enforces line breaks between array elements
      "array-element-newline": ["error", "consistent"],
      // normalize style of spacing before/after an arrow function's arrow(=>)
      "arrow-spacing": ["error", { before: true, after: true }],
      // or inside a close block token and previous token on the same line
      "block-spacing": ["error", "always"],
      // enforces consistent use of trailing commas in object and array literals
      "comma-dangle": ["error", "never"],
      // object literals, function parameters, and sequences
      "comma-spacing": ["error", { before: false, after: true }],
      // enforce newline consistency in member expressions
      "dot-location": ["error", "property"],
      // enforces line breaks between arguments of a function call
      "function-call-argument-newline": ["error", "consistent"],
      // enforces spacing around the colon in object literal properties
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      // disallows unnecessary semicolons
      "no-extra-semi": "error",
      // number either before or after it
      "no-floating-decimal": "error",
      // checks BinaryExpression, LogicalExpression and ConditionalExpression
      "no-mixed-operators": [
        "error",
        {
          groups: [
            ["&", "|", "^", "~", "<<", ">>", ">>>"],
            ["&&", "||"],
            ["in", "instanceof"],
          ],
          allowSamePrecedence: true,
        },
      ],
      // disallow multiple whitespace around logical expressions, conditional expressions, declarations,
      // array elements, object properties, sequences and function parameters
      "no-multi-spaces": "error",
      // disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines
      "no-trailing-spaces": "error",
      // disallows whitespace around the dot or before the opening bracket before properties of objects if they
      // the same line
      "no-whitespace-before-property": "error",
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
