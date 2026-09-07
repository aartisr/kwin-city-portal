import { NextRequest, NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getSatelliteTracker, normalizeSnapshotLimit } from '@/lib/server/value-add/satellite-tracker';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/satellite-tracker',
      fallbackMessage: 'Satellite tracker is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const limit = normalizeSnapshotLimit(req.nextUrl.searchParams.get('limit'));
      const { result, sourceIds } = getSatelliteTracker(limit);

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
