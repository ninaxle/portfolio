import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Set the root directory to 'src' if that's where your HTML is located
  build: {
    outDir: '../dist', // Output build to a 'dist' folder in the root
  },
  server: {
    port: 5173, // Port you want the dev server to run on
  },
  
});

