import { defineConfig, externalizeDepsPlugin, swcPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    build: {
      outDir: "./dist/main",
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      // alias: {
      //   // "@renderer": resolve("src/renderer/src"),
      // },
    },
    plugins: [react()],
  },
});
