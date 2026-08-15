import { describe, expect, it } from "vitest";
import manifest from "../../../manifest";
import { PWA_CONFIG } from "../config";

describe("PWA manifest contract", () => {
  it("is installable, scoped, branded, and provides reusable shortcuts", () => {
    const value = manifest();
    expect(value).toMatchObject({
      name: PWA_CONFIG.name,
      short_name: PWA_CONFIG.shortName,
      start_url: PWA_CONFIG.startUrl,
      scope: "/",
      display: "standalone",
      theme_color: PWA_CONFIG.themeColor,
      background_color: PWA_CONFIG.backgroundColor,
      prefer_related_applications: false,
    });
    expect(value.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "512x512", purpose: "any" }),
        expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
      ]),
    );
    expect(value.shortcuts).toHaveLength(PWA_CONFIG.shortcuts.length);
    expect(new Set(value.shortcuts?.map((item) => item.url)).size).toBe(
      value.shortcuts?.length,
    );
  });
});
