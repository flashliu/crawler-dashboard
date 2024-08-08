import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deploy from "./src/plugins/deploy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), deploy()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/admin": {
        target: "http://localhost:8765",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
