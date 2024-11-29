import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // Output build to a 'dist' folder in the root
  },
  server: {
    port: 5173, // Port you want the dev server to run on
  },
  publicDir: "public",
});
