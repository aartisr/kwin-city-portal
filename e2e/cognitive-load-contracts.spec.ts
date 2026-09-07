import { expect, test } from './fixtures';

test.describe('Cognitive-load contracts', () => {
  test('homepage presents orientation before optional depth', async ({ page }: any) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const disclosure = page.getByTestId('home-progressive-disclosure');
    await expect(disclosure).not.toHaveAttribute('open', '');
    await expect(page.getByText('Explore the full KWIN experience')).toBeVisible();
    await expect(page.getByText('Eight dimensions of', { exact: false })).not.toBeVisible();

    await page.getByText('Explore the full KWIN experience').click();
    await expect(disclosure).toHaveAttribute('open', '');
    await expect(page.getByText('Eight dimensions of', { exact: false })).toBeVisible();
  });
});
