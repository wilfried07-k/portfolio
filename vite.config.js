import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Empêche Vite d'aller chercher un postcss.config.js dans les dossiers parents
  css: { postcss: { plugins: [] } },
});
