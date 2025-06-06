import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    outDir: 'dist',
    rollupOptions: {
    }
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
