import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";
import { PUBLIC_ROUTES } from "./public-routes";

async function getContrastViolations(page: any, scope = "body") {
  // Framer Motion cards enter over 240ms. Auditing after that transition tests
  // the stable interface readers use instead of a deliberately translucent
  // intermediate animation frame.
  await page.waitForTimeout(1200);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aa", "wcag21aa"])
    .include(scope)
    .analyze();

  return results.violations.filter(
    (violation) => violation.id === "color-contrast",
  );
}

test.describe("WCAG AA contrast", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`has no rendered text contrast failures on ${route}`, async ({
      page,
    }: any) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const contrastViolations = await getContrastViolations(page);

      expect(contrastViolations, `Contrast failures on ${route}`).toEqual([]);
    });
  }

  test("keeps each updates filter selection contrast-safe", async ({
    page,
  }: any) => {
    await page.goto("/updates", { waitUntil: "domcontentloaded" });

    const filters = page.locator("main section.sticky button");
    const count = await filters.count();
    expect(count).toBeGreaterThan(1);

    for (let index = 0; index < count; index += 1) {
      await filters.nth(index).click();
      const contrastViolations = await getContrastViolations(page, "main");

      expect(
        contrastViolations,
        `Contrast failures after selecting updates filter ${index}`,
      ).toEqual([]);
    }
  });
});
