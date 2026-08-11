// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const readFileSync = vi.fn();

vi.mock('node:fs', () => ({ readFileSync }));

describe('getSiteFreshnessStatus', () => {
  beforeEach(() => {
    vi.resetModules();
    readFileSync.mockReset();
  });

  it('keeps server-rendered pages available when documentation files are absent', async () => {
    readFileSync.mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory');
    });

    const { getSiteFreshnessStatus } = await import('../site-freshness');
    const status = getSiteFreshnessStatus();

    expect(status.factualAudit.isoDate).toBe('2026-08-09');
    expect(status.executionStatus.isoDate).toBe('2026-08-08');
    expect(status.factualAudit.ageDays).toBeGreaterThanOrEqual(0);
    expect(status.executionStatus.ageDays).toBeGreaterThanOrEqual(0);
  });
});
