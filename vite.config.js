import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "./src/dist", // Output build to a 'dist' folder in the root
  },
  server: {
    port: 5173, // Port you want the dev server to run on
  },
  publicDir: "public",
});
