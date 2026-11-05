import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // /api calls backend (port 4000) par forward honge
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});