import { createHash, randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/server/supabase-client";
import type {
  KwinSeoAgencyRun,
  PublishAttempt,
  SocialPlatform,
  SocialPostDraft,
} from "./types";

type Reservation = { id: string; leaseToken: string };

function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("utm_") || ["fbclid", "gclid"].includes(key)) {
        url.searchParams.delete(key);
      }
    }
    url.hostname = url.hostname.toLowerCase();
    return url.toString().replace(/\/$/, "");
  } catch {
    return value.trim().toLowerCase();
  }
}

/** External stories are permanent; evergreen topics get one slot per month. */
export function publicationSubject(run: KwinSeoAgencyRun): string {
  const source = run.newsSignals[0]?.url;
  if (source) {
    try {
      const sourceHost = new URL(source).hostname.replace(/^www\./, "");
      const siteHost = new URL(run.dailyArticle.canonicalUrl).hostname.replace(
        /^www\./,
        "",
      );
      // Keep the external subject compatible with the original v1 ledger.
      if (sourceHost !== siteHost) return normalizeUrl(source);
    } catch {
      return normalizeUrl(source);
    }
  }
  const month = /^\d{4}-\d{2}/.exec(run.runDate)?.[0] ?? "unknown-month";
  return `evergreen:${run.topic.id}:${month}`;
}

export function publicationFingerprint(
  platform: SocialPlatform,
  run: KwinSeoAgencyRun,
): string {
  return createHash("sha256")
    .update(`v1|${platform}|${publicationSubject(run)}`)
    .digest("hex");
}

async function reserve(
  draft: SocialPostDraft,
  run: KwinSeoAgencyRun,
): Promise<Reservation | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin client is not configured");
  const leaseToken = randomUUID();
  const sourceUrl = publicationSubject(run);
  const { data, error } = await supabase.rpc(
    "acquire_social_publish_reservation",
    {
      p_platform: draft.platform,
      p_fingerprint: publicationFingerprint(draft.platform, run),
      p_source_url: sourceUrl,
      p_run_id: run.id,
      p_lease_token: leaseToken,
    },
  );
  if (error) {
    throw new Error(
      `Could not reserve ${draft.platform} publication: ${error.message}`,
    );
  }
  const result = data?.[0];
  return result?.acquired && result.reservation_id
    ? { id: result.reservation_id, leaseToken }
    : null;
}

async function complete(
  reservation: Reservation,
  attempt: PublishAttempt,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin client became unavailable");
  const status = attempt.status === "skipped" ? "failed" : attempt.status;
  const { error } = await supabase
    .from("social_publish_reservations")
    .update({
      status,
      platform_post_id: attempt.platformPostId ?? null,
      failure_reason: status === "published" ? null : attempt.note,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", reservation.id)
    .eq("lease_token", reservation.leaseToken);
  if (error) {
    throw new Error(
      `Could not record ${attempt.platform} publication: ${error.message}`,
    );
  }
}

export async function publishOnce(
  draft: SocialPostDraft,
  run: KwinSeoAgencyRun,
  publish: (draft: SocialPostDraft) => Promise<PublishAttempt>,
): Promise<PublishAttempt> {
  let reservation: Reservation | null;
  try {
    reservation = await reserve(draft, run);
  } catch (error) {
    return {
      platform: draft.platform,
      status: "skipped",
      note: `Skipped safely: idempotency storage is unavailable (${error instanceof Error ? error.message : "unknown error"}).`,
    };
  }
  if (!reservation) {
    return {
      platform: draft.platform,
      status: "skipped",
      note: "Skipped: this platform already handled the same publication subject.",
    };
  }

  let attempt: PublishAttempt;
  try {
    attempt = await publish(draft);
  } catch (error) {
    attempt = {
      platform: draft.platform,
      status: "indeterminate",
      note: `Provider outcome is unknown: ${error instanceof Error ? error.message : "unexpected publisher error"}`,
    };
  }
  try {
    await complete(reservation, attempt);
  } catch (error) {
    return {
      ...attempt,
      note: `${attempt.note} Audit update failed (${error instanceof Error ? error.message : "unknown error"}); the reservation remains held to prevent an automatic duplicate.`,
    };
  }
  return attempt;
}
