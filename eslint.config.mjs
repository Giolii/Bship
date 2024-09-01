import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      "node_modules/*", // ignore its content
      "webpack.*",
      "dist",
    ],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    compilerOptions: {
      noUnusedLocals: false,
    },
  },
  pluginJs.configs.recommended,
];
