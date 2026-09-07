import { test, expect } from './fixtures';

test.describe('Always Current Operations Signal', () => {
  test('should expose freshness status and mirror it in trust banner state', async ({ page }) => {
    const statusResponse = await page.request.get('/api/operations/status');
    expect(statusResponse.ok()).toBeTruthy();

    const payload = await statusResponse.json() as {
      freshness: {
        degraded: boolean;
        content: { ageDays: number };
        factualAudit: { ageDays: number };
        executionStatus: { ageDays: number };
      };
    };

    expect(typeof payload.freshness.degraded).toBe('boolean');
    expect(payload.freshness.content.ageDays).toBeGreaterThanOrEqual(0);
    expect(payload.freshness.factualAudit.ageDays).toBeGreaterThanOrEqual(0);
    expect(payload.freshness.executionStatus.ageDays).toBeGreaterThanOrEqual(0);

    await page.addInitScript(() => {
      localStorage.setItem('kwin-trust-banner-visible', 'true');
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const banner = page.locator('[data-testid="trust-banner"]');
    await expect(banner).toBeVisible();

    if (payload.freshness.degraded) {
      await expect(banner).toContainText('Freshness watch:');
      await expect(banner).toHaveClass(/border-amber-200/);
    } else {
      await expect(banner).toContainText('Last verification sweep:');
      await expect(banner).not.toHaveClass(/border-amber-200/);
    }
  });
});
