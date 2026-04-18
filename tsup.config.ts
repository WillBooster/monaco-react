import { defineConfig } from 'tsup';

export default defineConfig({
  banner: {
    js: "'use client';",
  },
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['@willbooster/monaco-loader', 'monaco-editor', 'react', 'react-dom'],
  format: ['esm', 'cjs'],
  minify: false,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
  sourcemap: true,
  target: 'es2020',
});
