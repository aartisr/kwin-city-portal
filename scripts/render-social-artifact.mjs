import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const assetDir = path.join(root, "public/social/kwin-launch");
const sourceUrl = pathToFileURL(path.join(assetDir, "index.html")).href;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1080 },
  deviceScaleFactor: 1,
});

await page.goto(sourceUrl, { waitUntil: "networkidle" });

for (let index = 1; index <= 8; index += 1) {
  const selector = `.slide[data-slide="${index}"]`;
  const slide = page.locator(selector);
  await slide.screenshot({
    path: path.join(
      assetDir,
      `kwin-launch-slide-${String(index).padStart(2, "0")}.png`,
    ),
  });
}

await browser.close();
