import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto específico para evitar conflictos
  },
  build: {
    // No necesitas marcar bootstrap como external
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  },
  resolve: {
    alias: {
      // Opcional: Crea alias para rutas comunes
      '@': '/src',
      '@components': '/src/components'
    }
  }
});