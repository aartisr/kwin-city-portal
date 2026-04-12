import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'app/components/header/**/*.ts',
        'app/components/search-modal/**/*.ts',
        'app/lib/home/**/*.ts',
        'app/lib/search-index.ts',
      ],
      exclude: [
        'node_modules/',
        '.next/',
        '.next-dev/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/__tests__/**',
        '**/types.ts',
      ],
      thresholds: {
        lines: 85,
        statements: 85,
        branches: 70,
        functions: 85,
      },
    },
    include: [
      'app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'scripts/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: ['e2e/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@components': path.resolve(__dirname, './app/components'),
      '@hooks': path.resolve(__dirname, './app/hooks'),
      '@lib': path.resolve(__dirname, './app/lib'),
      '@types': path.resolve(__dirname, './app/types'),
    },
  },
});
