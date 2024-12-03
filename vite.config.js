import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  }
});
