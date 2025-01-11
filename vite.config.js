import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/.netlify/functions/proxy-caption/': {
        target: 'https://ccb.megafiles.store',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions\/proxy-caption/, ''),
      },
    },
  },
});
