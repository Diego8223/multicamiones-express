import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // 💡 ESTA LÍNEA DEBE ESTAR ASÍ 💡
  base: './', // Esto asegura que todas las rutas de activos sean relativas
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~fontawesome': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free'),
      '~leaflet': path.resolve(__dirname, 'node_modules/leaflet')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true
  }
});