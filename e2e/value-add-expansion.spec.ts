import { test, expect } from './fixtures';

test.describe('Value-Add Expansion Smoke', () => {
  test('tools index exposes expansion routes', async ({ page }: any) => {
    await page.goto('/tools');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('a[href="/tools/spatial-explorer"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/valuation-index"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/investment-radar"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/opportunity-exchange"]')).toBeVisible();
    await expect(page.locator('a[href="/tools/open-data-studio"]')).toBeVisible();
    await expect(page.locator('a[href="/updates/satellite-tracker"]')).toBeVisible();
    await expect(page.locator('a[href="/updates/regulatory-news"]')).toBeVisible();
  });

  test('spatial explorer renders map and phase metadata', async ({ page }: any) => {
    await page.goto('/tools/spatial-explorer');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Spatial Explorer' }).first()).toBeVisible();
    await Promise.all([
      page.waitForResponse((response: any) => response.url().includes('/api/value-add/spatial-explorer?phase=phase-2') && response.ok()),
      page.getByLabel('Phase').selectOption('phase-2'),
    ]);
    await expect(page.getByText('Highlights')).toBeVisible({ timeout: 15000 });
  });

  test('valuation and investment tools render interactive data', async ({ page }: any) => {
    await page.goto('/tools/valuation-index');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Market Rate / sq.ft')).toBeVisible({ timeout: 15000 });
    await Promise.all([
      page.waitForResponse((response: any) => response.url().includes('/api/value-add/valuation?zone=nelamangala') && response.ok()),
      page.getByLabel('Zone').selectOption('nelamangala'),
    ]);
    await expect(page.getByText('Trend:')).toBeVisible();

    await page.goto('/tools/investment-radar');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('Category').selectOption('biotech');
    await expect(page.getByRole('heading', { name: 'North Bengaluru Biotech Consortium' })).toBeVisible();
  });

  test('updates pages render satellite and regulatory feeds', async ({ page }: any) => {
    await page.goto('/updates/satellite-tracker');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Satellite Development Tracker' })).toBeVisible();

    await page.goto('/updates/regulatory-news');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Gazette and Regulatory News Engine' })).toBeVisible();
  });
});
