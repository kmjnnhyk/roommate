import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import routesGenPlugin from "./vite-plugin-routes-gen";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    routesGenPlugin({
      routesDir: "src/routes",
      output: "src/router.gen.ts",
    }),
  ],
});
