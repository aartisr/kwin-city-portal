import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";

// Keep this list in step with the public-route regression smoke suite. Contrast
// is part of the rendered interface contract, so every public entry point is
// checked rather than treating the home page as a special case.
const ROUTES = [
  "/",
  "/about",
  "/account",
  "/analytics",
  "/community",
  "/contact",
  "/data-insights",
  "/download",
  "/downloads",
  "/evidence",
  "/evidence-library",
  "/faq",
  "/for",
  "/for/curious-citizens",
  "/for/investor",
  "/for/journalist",
  "/for/researcher",
  "/for/resident",
  "/news-intelligence",
  "/news-reader",
  "/offline",
  "/region-map",
  "/search?q=kwin",
  "/sectors",
  "/sectors/comparison",
  "/sources",
  "/sustainability",
  "/terms",
  "/timeline",
  "/tools",
  "/tools/accessibility",
  "/tools/investment-radar",
  "/tools/open-data-studio",
  "/tools/opportunity-exchange",
  "/tools/regulatory-navigator",
  "/tools/risk-check",
  "/tools/spatial-explorer",
  "/tools/valuation-index",
  "/trust",
  "/updates",
  "/updates/change-tracker",
  "/updates/regulatory-news",
  "/updates/satellite-tracker",
  "/why-north-bengaluru",
];

test.describe("WCAG AA contrast", () => {
  for (const route of ROUTES) {
    test(`has no rendered text contrast failures on ${route}`, async ({
      page,
    }: any) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2aa", "wcag21aa"])
        .include("body")
        .analyze();
      const contrastViolations = results.violations.filter(
        (violation) => violation.id === "color-contrast",
      );

      expect(contrastViolations, `Contrast failures on ${route}`).toEqual([]);
    });
  }
});
