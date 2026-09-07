import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    css: {
      postcss: {
        plugins: [],
      },
    },
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, './app/components'),
        '@/lib': path.resolve(__dirname, './app/lib'),
        '@/types': path.resolve(__dirname, './app/types'),
        '@/config': path.resolve(__dirname, './app/config'),
        '@/data': path.resolve(__dirname, './app/data'),
        '@/content': path.resolve(__dirname, './app/content'),
        '@/tools': path.resolve(__dirname, './app/tools'),
        '@/app': path.resolve(__dirname, './app'),
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
