import { test, expect } from './fixtures';

test.describe('Value-Add Tools Smoke', () => {
  test('tools index exposes all utility entry points', async ({ page }: any) => {
    await page.goto('/tools');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('a[href="/tools/risk-check"]').first()).toBeVisible();
    await expect(page.locator('a[href="/tools/accessibility"]').first()).toBeVisible();
    await expect(page.locator('a[href="/tools/regulatory-navigator"]').first()).toBeVisible();
    await expect(page.locator('a[href="/updates/change-tracker"]').first()).toBeVisible();
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

  test('spatial explorer supports all-phase and per-phase acquisition toggles', async ({ page }: any) => {
    await page.goto('/tools/spatial-explorer');

    const phase1 = page.getByLabel('Phase 1', { exact: true });
    const phase2 = page.getByLabel('Phase 2', { exact: true });
    const phase3 = page.getByLabel('Phase 3', { exact: true });

    await expect(page.getByRole('button', { name: 'Show all' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hide all' })).toBeVisible();

    await expect(phase1).toBeChecked();
    await expect(phase2).not.toBeChecked();
    await expect(phase3).not.toBeChecked();

    await page.getByRole('button', { name: 'Show all' }).click();
    await expect(phase1).toBeChecked();
    await expect(phase2).toBeChecked();
    await expect(phase3).toBeChecked();

    await phase2.uncheck();
    await expect(phase1).toBeChecked();
    await expect(phase2).not.toBeChecked();
    await expect(phase3).toBeChecked();

    await page.getByRole('button', { name: 'Hide all' }).click();
    await expect(phase1).not.toBeChecked();
    await expect(phase2).not.toBeChecked();
    await expect(phase3).not.toBeChecked();
  });

  test('spatial explorer lists future projects with original and mirror source links', async ({ page }: any) => {
    await page.goto('/tools/spatial-explorer');

    await expect(page.getByRole('heading', { name: 'Future Projects Around The Area' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Original source links:')).toBeVisible();
    await expect(page.getByText('Mirror links:')).toBeVisible();

    await expect(
      page.getByText('Priority: Acquisition Notification Buffers should be validated against original Gazette publication records first.')
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Original: Karnataka eRajyapatra/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Mirror: K-RIDE Land Acquisition Notifications/i })).toBeVisible();
  });
});
