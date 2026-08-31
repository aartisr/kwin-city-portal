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

  test('keeps the complete Tools finder inside a short desktop viewport', async ({ page }: any) => {
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.goto(route, { waitUntil: 'networkidle' });

    const toolsButton = page.getByRole('button', { name: 'Tools', exact: true });
    await toolsButton.click();
    const toolsMenu = page.locator('[aria-label="Tools menu"]');
    await expect(toolsMenu).toBeVisible();
    await expect(toolsMenu.getByPlaceholder('Find a tool by task…')).toBeVisible();
    await expect(toolsMenu.getByRole('link', { name: /View all tools in Command Center/ })).toBeVisible();

    const menuBounds = await toolsMenu.boundingBox();
    expect(menuBounds).not.toBeNull();
    expect((menuBounds?.y ?? 0) + (menuBounds?.height ?? 0)).toBeLessThanOrEqual(600);

    await toolsMenu.getByPlaceholder('Find a tool by task…').fill('opportunity');
    await expect(toolsMenu.getByRole('link', { name: /Opportunity Exchange/ })).toBeVisible();
    await expect(toolsMenu.getByText('1 tool', { exact: true })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toolsMenu).toBeHidden();
    await expect(toolsButton).toBeFocused();
  });

  test('lets phone users find any tool without traversing the full menu', async ({ page }: any) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(route, { waitUntil: 'networkidle' });

    await page.getByTestId('mobile-header-menu').click();
    const menuSheet = page.getByTestId('header-menu-sheet');
    await menuSheet.getByRole('button', { name: /Tools/ }).click();
    await menuSheet.getByPlaceholder('Find a tool by task…').fill('satellite');

    await expect(menuSheet.getByRole('link', { name: /Satellite Tracker/ })).toBeVisible();
    await expect(menuSheet.getByText('1 tool', { exact: true })).toBeVisible();
  });
});
