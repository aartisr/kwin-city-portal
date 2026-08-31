import { NextRequest, NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getSpatialExplorerData, normalizePhase } from '@/lib/server/value-add/spatial-explorer';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/spatial-explorer',
      fallbackMessage: 'Spatial explorer is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const phase = normalizePhase(req.nextUrl.searchParams.get('phase'));
      const { result, sourceIds } = getSpatialExplorerData(phase);

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
