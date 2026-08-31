import { buildLlmsPolicyText } from "@/lib/discovery/policies";
import { getCurrentSiteFreshnessStatus } from "@/lib/operations/current-site-freshness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const freshness = await getCurrentSiteFreshnessStatus();
  const generatedAtISO = new Date().toISOString();
  const body = buildLlmsPolicyText({ generatedAtISO, freshness });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
