import js from "@eslint/js";
import globals from "globals";
import solid from "eslint-plugin-solid/dist/configs/typescript.js";
import * as tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    ignores: ["*.config.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },
  },
];
