import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Opcional: elimina console.log y otros
        drop_debugger: true,
      },
      format: {
        comments: false, // Quitar comentarios
      },
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom'
    ],
  },
});