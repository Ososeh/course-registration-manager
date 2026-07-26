import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite uses this configuration when starting the development server or build.
export default defineConfig({
  plugins: [react()],
});
