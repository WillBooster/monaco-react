import { expect, test } from '@playwright/test';

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
