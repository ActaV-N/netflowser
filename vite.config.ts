import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "./static",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: "./content/index.tsx",
        popup: "./popup/index.html",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
      },
    },
  },
});
