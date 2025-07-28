import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindConfig from "./tailwind.config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindConfig()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
