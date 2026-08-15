// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetSupabaseAdmin = vi.hoisted(() => vi.fn());

vi.mock("@/lib/server/supabase-client", () => ({
  getSupabaseAdmin: mockGetSupabaseAdmin,
}));

import {
  publicationFingerprint,
  publicationSubject,
  publishOnce,
} from "../publish-deduplication";
import type {
  KwinSeoAgencyRun,
  SocialPlatform,
  SocialPostDraft,
} from "../types";

const platforms: SocialPlatform[] = ["instagram", "facebook", "linkedin", "x"];

function draftFor(platform: SocialPlatform): SocialPostDraft {
  return {
    platform,
    format: "image",
    hook: "KWIN City update",
    body: "A source-linked update.",
    hashtags: ["#KWINCity"],
    link: "https://kwin-city.com/seo-agency/articles/example",
    mediaUrl:
      platform === "instagram" ? "https://kwin-city.com/image.png" : undefined,
    utmCampaign: "test",
    evidenceStatus: "verified",
    approvalStatus: "approved_by_rule",
    publishStatus: "draft",
    publishNote: "test",
  };
}

const run = {
  id: "2026-08-15",
  runDate: "2026-08-15",
  topic: { id: "innovation" },
  dailyArticle: { canonicalUrl: "https://kwin-city.com/articles/example" },
  newsSignals: [{ url: "https://news.example.com/kwin-story?utm_source=rss" }],
} as KwinSeoAgencyRun;

describe("social publish deduplication", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(platforms)(
    "does not contact %s when the primary source is already reserved or published",
    async (platform) => {
      const rpc = vi.fn().mockResolvedValue({
        data: [{ acquired: false, reservation_id: null }],
        error: null,
      });
      mockGetSupabaseAdmin.mockReturnValue({ rpc });
      const publish = vi.fn();

      const attempt = await publishOnce(draftFor(platform), run, publish);

      expect(attempt).toMatchObject({ platform, status: "skipped" });
      expect(attempt.note).toContain(
        "already handled the same publication subject",
      );
      expect(publish).not.toHaveBeenCalled();
      expect(rpc).toHaveBeenCalledWith(
        "acquire_social_publish_reservation",
        expect.objectContaining({ p_platform: platform }),
      );
    },
  );

  it("records a successful platform post against its atomic reservation", async () => {
    const update = vi.fn().mockReturnValue({
      eq: vi
        .fn()
        .mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) }),
    });
    const from = vi.fn().mockReturnValue({ update });
    const rpc = vi.fn().mockResolvedValue({
      data: [{ acquired: true, reservation_id: "reservation-1" }],
      error: null,
    });
    mockGetSupabaseAdmin.mockReturnValue({ rpc, from });
    const publish = vi.fn().mockResolvedValue({
      platform: "instagram",
      status: "published",
      note: "Published to Instagram Business account.",
      platformPostId: "instagram-post-1",
    });

    await expect(
      publishOnce(draftFor("instagram"), run, publish),
    ).resolves.toMatchObject({
      status: "published",
      platformPostId: "instagram-post-1",
    });

    expect(publish).toHaveBeenCalledOnce();
    expect(from).toHaveBeenCalledWith("social_publish_reservations");
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "published",
        platform_post_id: "instagram-post-1",
      }),
    );
  });

  it("canonicalizes tracking parameters but preserves meaningful query parameters", () => {
    const variant = {
      ...run,
      newsSignals: [
        {
          url: "https://NEWS.example.com/kwin-story?id=42&utm_medium=social#top",
        },
      ],
    } as KwinSeoAgencyRun;
    expect(publicationSubject(variant)).toBe(
      "https://news.example.com/kwin-story?id=42",
    );
  });

  it("uses platform-scoped fingerprints", () => {
    expect(publicationFingerprint("facebook", run)).not.toBe(
      publicationFingerprint("instagram", run),
    );
  });

  it("retains a successful result if the audit update fails", async () => {
    const eq2 = vi
      .fn()
      .mockResolvedValue({ error: { message: "write failed" } });
    const eq1 = vi.fn().mockReturnValue({ eq: eq2 });
    const update = vi.fn().mockReturnValue({ eq: eq1 });
    mockGetSupabaseAdmin.mockReturnValue({
      rpc: vi.fn().mockResolvedValue({
        data: [{ acquired: true, reservation_id: "reservation-2" }],
        error: null,
      }),
      from: vi.fn().mockReturnValue({ update }),
    });

    const attempt = await publishOnce(draftFor("facebook"), run, async () => ({
      platform: "facebook",
      status: "published",
      note: "Published.",
      platformPostId: "post-2",
    }));

    expect(attempt.status).toBe("published");
    expect(attempt.note).toContain("reservation remains held");
  });

  it("fails closed before contacting a provider when storage is unavailable", async () => {
    mockGetSupabaseAdmin.mockReturnValue(null);
    const publish = vi.fn();
    const attempt = await publishOnce(draftFor("x"), run, publish);
    expect(attempt.status).toBe("skipped");
    expect(attempt.note).toContain("idempotency storage is unavailable");
    expect(publish).not.toHaveBeenCalled();
  });
});
