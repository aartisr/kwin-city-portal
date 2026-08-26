import { expect, test } from "./fixtures";
import { PUBLIC_ROUTES } from "./public-routes";

const ROUTES = PUBLIC_ROUTES;
const VIEWPORTS = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

test.describe("Public-route responsive contracts", () => {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${viewport.name}: ${route} fits its viewport`, async ({
        page,
      }: any) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        });
        expect(response?.status() ?? 500, route).toBeLessThan(400);

        await expect(
          page.locator('main, [role="main"], h1, h2').first(),
          route,
        ).toBeVisible();

        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.content,
          `${route} overflows at ${viewport.name}`,
        ).toBeLessThanOrEqual(dimensions.viewport + 1);
      });
    }
  }

  test("phone: visible action controls are comfortably tappable", async ({
    page,
  }: any) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ROUTES) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const controls = page.locator(
        "button:visible, input:visible, select:visible, textarea:visible",
      );
      const count = await controls.count();

      for (let index = 0; index < count; index += 1) {
        const box = await controls.nth(index).boundingBox();
        if (!box) continue;
        expect(
          Math.min(box.width, box.height),
          `${route} control ${index} is too small`,
        ).toBeGreaterThanOrEqual(36);
      }
    }
  });
});
