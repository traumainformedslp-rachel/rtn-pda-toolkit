import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE_PATH is set by the GitHub Actions workflow to "/<repo-name>/"
// Locally and on drag-and-drop hosts (Netlify, Vercel), it falls back to "./"
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || './',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: false,
    host: true,
  },
});
