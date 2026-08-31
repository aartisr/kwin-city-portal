import { expect, test } from './fixtures';

test.describe('Public identity and install-consent contracts', () => {
  test('publishes a machine-readable author profile with distinct legal ownership', async ({ page }: any) => {
    const response = await page.goto('/aarti-s-ravikumar', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Aarti S Ravikumar' })).toBeVisible();
    await expect(page.locator('a[href="https://ai-aarti.com"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://baja.kwin-city.com"]').first()).toBeVisible();

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const profile = schemas.map((value: string) => JSON.parse(value)).find((value: any) => value['@type'] === 'ProfilePage');
    expect(profile?.mainEntity).toMatchObject({
      '@type': 'Person',
      name: 'Aarti S Ravikumar',
      sameAs: ['https://ai-aarti.com'],
    });
  });

  test('honors permanent PWA install opt-out before handling browser eligibility', async ({ page }: any) => {
    await page.addInitScript(() => localStorage.setItem('kwin-pwa-install-opted-out', 'true'));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.dispatchEvent(new Event('beforeinstallprompt', { cancelable: true })));
    await page.waitForTimeout(100);

    await expect(page.getByRole('heading', { name: 'Install KWIN City' })).toHaveCount(0);
    const lastShown = await page.evaluate(() => localStorage.getItem('kwin-pwa-install-last-shown-at'));
    expect(lastShown).toBeNull();
  });
});
