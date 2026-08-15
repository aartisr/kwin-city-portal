import { NextResponse } from "next/server";
import { getCurrentSiteFreshnessStatus } from "@/lib/operations/current-site-freshness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const freshness = await getCurrentSiteFreshnessStatus();

  return NextResponse.json(
    {
      service: "kwin-city-portal",
      operation: "always-current",
      measuredAt: new Date().toISOString(),
      freshness,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
