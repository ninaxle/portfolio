import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: "dist", // Output build to a 'dist' folder in the root
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        archive: resolve(__dirname, 'archive.html'),
        footer: resolve(__dirname, 'footer.html'),
        navbar: resolve(__dirname, 'navbar.html'),
        // Add all your additional pages here
      }
    },
  },
  server: {
    port: 5173, // Port you want the dev server to run on
  },
  publicDir: "assets",
});
