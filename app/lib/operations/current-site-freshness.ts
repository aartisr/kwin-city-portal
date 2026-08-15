import { getLatestSeoAgencyRun } from "@/lib/seo-agency/store";
import {
  getSiteFreshnessStatus,
  type SiteFreshnessStatus,
} from "./site-freshness";

/**
 * Resolves the public freshness signal from durable operational evidence.
 * The checked-in content date remains a safe fallback when storage is empty or
 * unavailable, while a newer successful SEO run advances content freshness.
 */
export async function getCurrentSiteFreshnessStatus(): Promise<SiteFreshnessStatus> {
  try {
    const latestRun = await getLatestSeoAgencyRun();
    return getSiteFreshnessStatus(latestRun?.generatedAt);
  } catch {
    return getSiteFreshnessStatus();
  }
}
