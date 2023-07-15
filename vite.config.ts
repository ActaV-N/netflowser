import { defineConfig } from "vite";
import TsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: ".",
  publicDir: "./static",
  plugins: [TsconfigPaths()],
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
