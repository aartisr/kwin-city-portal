import { test, expect } from './fixtures';

test.describe('Value-Add Tools Smoke', () => {
  test('tools index exposes all utility entry points', async ({ page }: any) => {
    await page.goto('/tools');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('a[href="/tools/risk-check"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/accessibility"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/regulatory-navigator"]')).toBeVisible();
    await expect(page.locator('a[href="/updates/change-tracker"]')).toBeVisible();
  });

  test('risk-check returns a result panel', async ({ page }: any) => {
    await page.goto('/tools/risk-check');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('Area Name').fill('north bengaluru industrial corridor');
    await Promise.all([
      page.waitForResponse((response: any) => response.url().includes('/api/value-add/risk-check') && response.ok()),
      page.getByRole('button', { name: 'Run risk check' }).click(),
    ]);

    await expect(page.getByText('Risk band', { exact: true })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Score/i)).toBeVisible();
    await expect(page.getByText('Evidence:')).toBeVisible();
  });

  test('accessibility calculator renders travel estimate', async ({ page }: any) => {
    await page.goto('/tools/accessibility');
    await page.waitForLoadState('networkidle');

    await Promise.all([
      page.waitForResponse((response: any) => response.url().includes('/api/value-add/accessibility') && response.ok()),
      page.getByRole('button', { name: 'Calculate accessibility' }).click(),
    ]);

    await expect(page.getByRole('button', { name: 'Calculate accessibility' })).toBeEnabled({ timeout: 15000 });

    await expect(page.getByText(/^Estimated$/)).toBeVisible();
    await expect(page.getByText(/^Projected$/)).toBeVisible();
    await expect(page.getByText(/^Delta$/)).toBeVisible();
  });

  test('regulatory navigator updates checklist by persona', async ({ page }: any) => {
    await page.goto('/tools/regulatory-navigator');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Estimated timeline:')).toBeVisible({ timeout: 15000 });
    await Promise.all([
      page.waitForResponse((response: any) => response.url().includes('/api/value-add/regulatory?persona=investor') && response.ok()),
      page.getByLabel('Persona').selectOption('investor'),
    ]);
    await expect(page.getByText('Entity and investment compliance')).toBeVisible();
  });
});