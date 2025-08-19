import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginString from "vite-plugin-string";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginString({ include: "**/*.md" })],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
});
