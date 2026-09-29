import fs from "node:fs/promises";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import ViteRestart from "vite-plugin-restart";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import pkg from "./package.json" with { type: "json" };

import type { UserConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(async () => {
  const filename = `resume.${process.env.DATA_ENV || "online"}.json`;
  const rawJsonResume = await fs.readFile(filename, "utf-8");
  const version = pkg.version || "1.0.0";
  const buildTime = Date.now();

  return {
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      ViteRestart({ restart: ["./**/resume.*.json"] }),
    ],
    define: {
      __RESUME_DATA__: JSON.stringify(rawJsonResume),
      __RESUME_VERSION__: JSON.stringify(version),
      __BUILD_TIMESTAMP__: JSON.stringify(buildTime),
    },
    resolve: {
      tsconfigPaths: true,
    },
    css: {
      transformer: "lightningcss",
    },
    devtools: true,
  } satisfies UserConfig;
});
