import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-config-prettier";
import { fileURLToPath } from "node:url";
import globals from "globals";
import { includeIgnoreFile } from "@eslint/compat";
import noBarrelFiles from "eslint-plugin-no-barrel-files";
import path from "node:path";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prettierIgnorePath = path.resolve(__dirname, ".prettierignore");

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  includeIgnoreFile(prettierIgnorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: { version: "detect" },
    },
  },
  reactHooks.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  noBarrelFiles.flat,
  ...tseslint.configs.recommended,
  // Code style rules - one component per file, max 125 lines
  // Exclude shadcn/ui components (src/components/ui) as they are generated
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**"],
    rules: {
      "react/no-multi-comp": ["error", { ignoreStateless: false }],
      "max-lines": ["warn", { max: 125, skipBlankLines: true, skipComments: true }],
    },
  },
  // Bulletproof React boundary rules - enforce unidirectional imports
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/app/*", "@/routes/*"],
              message: "shared/ cannot import from features/, app/, or routes/",
            },
          ],
        },
      ],
    },
  },
  // Block cross-feature imports: home cannot import from settings or second
  {
    files: ["src/features/home/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/settings/*", "@/features/second/*"],
              message: "home feature cannot import from other features",
            },
            {
              group: ["@/app/*"],
              message: "features/ cannot import from app/",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/second/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/home/*", "@/features/settings/*"],
              message: "second feature cannot import from other features",
            },
            {
              group: ["@/app/*"],
              message: "features/ cannot import from app/",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/settings/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/home/*", "@/features/second/*"],
              message: "settings feature cannot import from other features",
            },
            {
              group: ["@/app/*"],
              message: "features/ cannot import from app/",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/routes/*"],
              message: "components/ cannot import from features/ or routes/",
            },
          ],
        },
      ],
    },
  },
]);
