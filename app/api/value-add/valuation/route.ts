import { NextRequest, NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getValuationIndex, normalizeZone } from '@/lib/server/value-add/valuation';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/valuation',
      fallbackMessage: 'Valuation service is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const zone = normalizeZone(req.nextUrl.searchParams.get('zone'));
      const { result, sourceIds } = getValuationIndex(zone);

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: result,
          sourceIds,
        })
      );
    }
  );
}
