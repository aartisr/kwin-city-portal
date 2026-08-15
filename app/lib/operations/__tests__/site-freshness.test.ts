// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const readFileSync = vi.fn();

vi.mock("node:fs", () => ({ readFileSync }));

describe("getSiteFreshnessStatus", () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.resetModules();
    readFileSync.mockReset();
  });

  it("uses a newer successful operational run as the content freshness signal", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-15T12:00:00Z"));
    readFileSync.mockImplementation((path: string) =>
      path.includes("FACTUAL_CLAIM_AUDIT")
        ? "Date: 2026-08-09"
        : "- Date: 2026-08-08",
    );

    const { getSiteFreshnessStatus } = await import("../site-freshness");
    const status = getSiteFreshnessStatus("2026-08-15T09:30:00Z");

    expect(status.content).toEqual({ isoDate: "2026-08-15", ageDays: 0 });
    expect(status.degraded).toBe(false);
  });

  it("keeps server-rendered pages available when documentation files are absent", async () => {
    readFileSync.mockImplementation(() => {
      throw new Error("ENOENT: no such file or directory");
    });

    const { getSiteFreshnessStatus } = await import("../site-freshness");
    const status = getSiteFreshnessStatus();

    expect(status.factualAudit.isoDate).toBe("2026-08-09");
    expect(status.executionStatus.isoDate).toBe("2026-08-08");
    expect(status.factualAudit.ageDays).toBeGreaterThanOrEqual(0);
    expect(status.executionStatus.ageDays).toBeGreaterThanOrEqual(0);
  });
});
