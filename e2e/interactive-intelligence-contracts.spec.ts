import { expect, test } from './fixtures';

test.describe('Interactive intelligence discovery and state', () => {
  test('homepage exposes three flagship workflows without opening optional depth', async ({ page }: any) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Move from reading to doing.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Open Spatial Explorer/ })).toHaveAttribute('href', '/tools/spatial-explorer');
    await expect(page.getByRole('link', { name: /Start Risk Check/ })).toHaveAttribute('href', '/tools/risk-check');
    await expect(page.getByRole('link', { name: /Open Opportunity Exchange/ })).toHaveAttribute('href', '/tools/opportunity-exchange');
  });

  test('tools hub publishes indexable WebApplication records', async ({ page }: any) => {
    await page.goto('/tools', { waitUntil: 'domcontentloaded' });
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const catalog = schemas.map((value: string) => JSON.parse(value)).find((value: any) => value['@id']?.endsWith('/tools#interactive-applications'));
    expect(catalog?.numberOfItems).toBeGreaterThanOrEqual(8);
    expect(catalog?.itemListElement[0].item).toMatchObject({ '@type': 'WebApplication', isAccessibleForFree: true });
  });

  test('Spatial Explorer restores, updates, and saves a shareable view', async ({ page }: any) => {
    await page.goto('/tools/spatial-explorer?phase=phase-3&acquisition=phase-1%2Cphase-3', { waitUntil: 'domcontentloaded' });
    const phase = page.getByTestId('spatial-phase-select');
    await expect(phase).toHaveValue('phase-3');
    await expect(page.getByRole('checkbox', { name: 'Phase 2' })).not.toBeChecked();

    await phase.selectOption('phase-2');
    await expect(page).toHaveURL(/phase=phase-2/);
    await page.getByRole('button', { name: 'Save view' }).click();
    await expect(page.getByRole('status')).toHaveText('View saved on this device.');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('kwin-spatial-saved-view') ?? '{}'));
    expect(saved.phase).toBe('phase-2');
    expect(saved.acquisition).toEqual({ 'phase-1': true, 'phase-2': false, 'phase-3': true });
  });

  test('Opportunity Exchange exposes a structured transactional intake', async ({ page }: any) => {
    await page.goto('/tools/opportunity-exchange', { waitUntil: 'domcontentloaded' });
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Role')).toBeVisible();
    await expect(page.getByLabel('Requirement')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit requirement' })).toBeEnabled();
  });
});
