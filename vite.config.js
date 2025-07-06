import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // Todos los assets en una carpeta
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  },
  server: {
    headers: {
      // Headers para desarrollo local
      'Content-Type': 'text/css; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    }
  }
});