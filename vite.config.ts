import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: "./content/index.tsx",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
      },
    },
  },
});
