import { buildAiPolicyText } from '@/lib/discovery/policies';
import { getSiteFreshnessStatus } from '@/lib/operations/site-freshness';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const freshness = getSiteFreshnessStatus();
  const generatedAtISO = new Date().toISOString();
  const body = buildAiPolicyText({ generatedAtISO, freshness });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
