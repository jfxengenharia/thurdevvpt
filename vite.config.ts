import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: funciona no GitHub Pages (subpasta /nome-do-repo/).
  base: "./",
  build: {
    target: "es2020",
    cssCodeSplit: false,
  },
});
