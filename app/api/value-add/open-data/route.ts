import { NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getOpenDataCatalog } from '@/lib/server/value-add/open-data';

export async function GET() {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/open-data',
      fallbackMessage: 'Open data catalog is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const { result, sourceIds } = getOpenDataCatalog();

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
