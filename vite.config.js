import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = import.meta.dirname;

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        movieList: resolve(__dirname, 'src/movie-list/index.html'),
        movie: resolve(__dirname, 'src/movie/index.html'),
        watchlist: resolve(__dirname, 'src/watchlist/index.html')
      }
    }
  }
});
