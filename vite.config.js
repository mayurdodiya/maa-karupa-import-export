import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(process.cwd(), 'src') } },
  build: { outDir: 'dist', chunkSizeWarningLimit: 900 },
  // Runs alongside the construction site's dev server (which uses 5173).
  server: { port: 5174 },
});
