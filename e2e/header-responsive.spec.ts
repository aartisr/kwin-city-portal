import { test, expect } from './fixtures';

const route = '/';

test.describe('Responsive header controls', () => {
  test('keeps compact search and Menu controls available on a narrow phone', async ({ page }: any) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(route, { waitUntil: 'networkidle' });

    await expect(page.getByTestId('mobile-header-actions')).toBeVisible();
    await expect(page.getByTestId('mobile-header-search')).toBeVisible();
    await expect(page.getByTestId('mobile-header-menu')).toBeVisible();
    await expect(page.getByTestId('mobile-header-trust')).toBeHidden();
    await expect(page.getByTestId('desktop-header-utilities')).toBeHidden();

    await page.getByTestId('mobile-header-menu').click();
    await expect(page.getByTestId('header-menu-sheet')).toBeVisible();
  });

  test('shows Search, Trust, and Menu together on a laptop and each control works', async ({ page }: any) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(route, { waitUntil: 'networkidle' });

    await expect(page.getByTestId('desktop-header-navigation')).toBeVisible();
    await expect(page.getByTestId('desktop-header-utilities')).toBeVisible();
    await expect(page.getByTestId('desktop-header-search')).toBeVisible();
    await expect(page.getByTestId('desktop-header-trust')).toBeVisible();
    await expect(page.getByTestId('desktop-header-menu')).toBeVisible();
    await expect(page.getByTestId('mobile-header-actions')).toBeHidden();

    await page.getByTestId('desktop-header-trust').click();
    await expect(page.getByText('Trust Protocol:', { exact: false })).toBeVisible();

    await page.getByTestId('desktop-header-menu').click();
    await expect(page.getByTestId('header-menu-sheet')).toBeVisible();
    await expect(page.getByTestId('desktop-header-menu')).toHaveAttribute('aria-expanded', 'true');

    await page.getByTestId('desktop-header-search').click();
    await expect(page.getByRole('dialog', { name: 'Site search' })).toBeVisible();
  });

  test('progressively reveals language and contact controls on wide screens', async ({ page }: any) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(route, { waitUntil: 'networkidle' });

    await expect(page.getByTestId('desktop-header-utilities')).toBeVisible();
    await expect(page.getByLabel('Language')).toBeVisible();
    const utilities = page.getByTestId('desktop-header-utilities');
    await expect(utilities.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(utilities.getByLabel('Explore KWIN')).toBeHidden();
  });
});
