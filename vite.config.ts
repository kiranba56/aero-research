import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

const projectRoot = fs.realpathSync(process.cwd());
process.chdir(projectRoot);

// https://vite.dev/config/
export default defineConfig({
  root: projectRoot,
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
  }
});
