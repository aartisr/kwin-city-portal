import { test, expect } from './fixtures';

type ViewportCase = {
  width: number;
  height: number;
};

const VIEWPORTS: ViewportCase[] = [
  { width: 1024, height: 900 },
  { width: 1200, height: 900 },
  { width: 1280, height: 900 },
  { width: 1366, height: 900 },
  { width: 1440, height: 900 },
];

function right(box: { x: number; width: number }) {
  return box.x + box.width;
}

test.describe('Header layout regression', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Header layout regression is calibrated for the chromium desktop project.');
  });

  for (const viewport of VIEWPORTS) {
    test(`home header does not overlap at ${viewport.width}x${viewport.height}`, async ({ page }: any) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const header = page.getByTestId('site-header');
      const brand = page.getByLabel('KWIN City home');

      await expect(header).toBeVisible();
      await expect(brand).toBeVisible();

      const headerBox = await header.boundingBox();
      const brandBox = await brand.boundingBox();

      expect(headerBox).toBeTruthy();
      expect(brandBox).toBeTruthy();
      if (!headerBox || !brandBox) {
        return;
      }

      // Brand lockup should stay inside the fixed header frame.
      expect(brandBox.y).toBeGreaterThanOrEqual(headerBox.y - 1);
      expect(brandBox.y + brandBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height + 1);

      const discoverButton = page.getByRole('button', { name: 'Discover' });
      const searchUtility = page.getByLabel('Search KWIN City (Cmd+K)');
      const toggleButton = page.getByLabel('Toggle menu');

      const desktopVisible = (await discoverButton.isVisible()) && (await searchUtility.isVisible());
      if (desktopVisible) {
        const discoverBox = await discoverButton.boundingBox();
        const utilityBox = await searchUtility.boundingBox();

        expect(discoverBox).toBeTruthy();
        expect(utilityBox).toBeTruthy();
        if (!discoverBox || !utilityBox) {
          return;
        }

        expect(right(brandBox)).toBeLessThanOrEqual(discoverBox.x - 4);
        expect(right(discoverBox)).toBeLessThanOrEqual(utilityBox.x - 4);
      }

      if (await toggleButton.isVisible()) {
        const toggleBox = await toggleButton.boundingBox();
        expect(toggleBox).toBeTruthy();
        if (!toggleBox) {
          return;
        }

        expect(right(brandBox)).toBeLessThanOrEqual(toggleBox.x - 4);
      }
    });
  }

  test('tools page intro stays below fixed header', async ({ page }: any) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/tools/risk-check', { waitUntil: 'domcontentloaded' });

    const header = page.getByTestId('site-header');
    const heading = page.getByRole('heading', { name: 'Risk Check' }).first();

    await expect(header).toBeVisible();
    await expect(heading).toBeVisible();

    const headerBox = await header.boundingBox();
    const headingBox = await heading.boundingBox();

    expect(headerBox).toBeTruthy();
    expect(headingBox).toBeTruthy();
    if (!headerBox || !headingBox) {
      return;
    }

    expect(headingBox.y).toBeGreaterThan(headerBox.y + headerBox.height - 2);
  });
});
