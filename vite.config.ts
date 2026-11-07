import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

const projectRoot = fs.existsSync(process.cwd()) ? fs.realpathSync(process.cwd()) : process.cwd();
try {
  process.chdir(projectRoot);
} catch (e) {}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  root: projectRoot,
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
