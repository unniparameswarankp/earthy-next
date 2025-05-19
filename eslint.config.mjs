import js from "@eslint/js";
import next from "eslint-plugin-next";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      next
    },
    rules: {
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off" // Needed for Next.js since React is auto-imported
    }
  }
];
