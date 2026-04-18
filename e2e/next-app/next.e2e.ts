import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

const testFile = fileURLToPath(import.meta.url);
const appDir = path.dirname(testFile);
const packageRoot = path.resolve(appDir, '../..');

test('resolves monaco-react from the built package files', async () => {
  const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8')) as {
    exports: { '.': { import: string; require: string; types: string } };
  };

  expect(packageJson.exports['.']).toEqual({
    import: './dist/index.js',
    require: './dist/index.cjs',
    types: './dist/index.d.ts',
  });
  await expect(readFile(path.join(packageRoot, packageJson.exports['.'].require), 'utf8')).resolves.toContain(
    '"use strict"'
  );
  await expect(readFile(path.join(packageRoot, 'dist/index.js'), 'utf8')).resolves.toMatch(/^"use client";/);
  await expect(readFile(path.join(packageRoot, 'dist/index.d.ts'), 'utf8')).resolves.toContain(
    "from 'monaco-editor/esm/vs/editor/editor.api.js'"
  );
});

test('loads monaco-react through the Next.js app router', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');

  await expect(page.getByTestId('hook-status')).toHaveText('hook-ok');
  await expect(page.getByTestId('editor-status')).toHaveText('editor-ok');
  await expect(page.getByTestId('diff-status')).toHaveText('diff-ok');
  expect(errors).toEqual([]);
});
