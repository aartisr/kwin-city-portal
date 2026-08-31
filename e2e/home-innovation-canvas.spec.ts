import { test, expect } from './fixtures';

test.describe('Home innovation canvas', () => {
  test('presents all three pillars and their meaningful next steps', async ({ page }: any) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByText('Explore the full KWIN experience').click();

    const canvas = page.getByTestId('innovation-canvas');
    await expect(canvas).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'A city idea is only interesting when its parts improve each other.' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /Explore evidence/ })).toHaveAttribute('href', '/evidence');
    await expect(canvas.getByRole('link', { name: /See the systems view/ })).toHaveAttribute('href', '/sustainability');
    await expect(canvas.getByRole('link', { name: /Discover the sectors/ })).toHaveAttribute('href', '/sectors');
  });

  test('stays usable without horizontal overflow on a narrow phone', async ({ page }: any) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByText('Explore the full KWIN experience').click();

    await expect(page.getByTestId('innovation-canvas')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
