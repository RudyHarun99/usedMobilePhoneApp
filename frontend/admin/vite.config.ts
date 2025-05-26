import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
      "@backend": path.resolve(__dirname, "../../backend/src"),
    },
  },
  optimizeDeps: {
    exclude: [
      "@react-router/node",
      "@react-router/serve",
    ],
  },
});
