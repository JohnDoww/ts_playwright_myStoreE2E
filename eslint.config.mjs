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
      "no-console": "warn",
      "playwright/no-standalone-expect": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      // enforces a maximum line length to increase code readability and maintainability
      "max-len": [
        "warn",
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
      "array-bracket-newline": ["warn", "consistent"],
      // enforces consistent spacing inside array brackets
      "array-bracket-spacing": ["warn", "never"],
      // enforces line breaks between array elements
      "array-element-newline": ["warn", "consistent"],
      // normalize style of spacing before/after an arrow function's arrow(=>)
      "arrow-spacing": ["warn", { before: true, after: true }],
      // or inside a close block token and previous token on the same line
      "block-spacing": ["warn", "always"],
      // enforces consistent use of trailing commas in object and array literals
      "comma-dangle": ["warn", "never"],
      // object literals, function parameters, and sequences
      "comma-spacing": ["warn", { before: false, after: true }],
      // enforce newline consistency in member expressions
      "dot-location": ["warn", "property"],
      // enforces line breaks between arguments of a function call
      "function-call-argument-newline": ["warn", "consistent"],
      // enforces spacing around the colon in object literal properties
      "key-spacing": ["warn", { beforeColon: false, afterColon: true }],
      // disallows unnecessary semicolons
      "no-extra-semi": "warn",
      // number either before or after it
      "no-floating-decimal": "warn",
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
      "no-multi-spaces": "warn",
      // disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines
      "no-trailing-spaces": "warn",
      // disallows whitespace around the dot or before the opening bracket before properties of objects if they
      // the same line
      "no-whitespace-before-property": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
