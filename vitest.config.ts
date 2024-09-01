import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/.next/**',
        '**/tests/**',
        '**/.eslintrc.cjs',
        '**next.config.mjs',
        '**next-env.d.ts',
        '**/app/layout.tsx',
        '**/types/**',
        '**/*.props.ts',
      ],
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './') }],
  },
});
