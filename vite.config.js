import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "src"), // Make sure this is an absolute path
  build: {
    outDir: resolve(__dirname, "dist"), // Use absolute path
    emptyOutDir: true, // Add this to clear the output directory
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
        archive: resolve(__dirname, "src/archive.html"),
        footer: resolve(__dirname, "src/footer.html"),
        navbar: resolve(__dirname, "src/navbar.html"),
        // Add all your additional pages here
      },
    },
  },
  server: {
    port: 5173,
  },
  publicDir: resolve(__dirname, "assets"), // Use absolute path for public directory
});
