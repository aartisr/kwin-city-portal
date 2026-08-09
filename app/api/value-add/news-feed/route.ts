import { NextRequest, NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getGazetteNews, normalizeNewsLimit } from '@/lib/server/value-add/news-feed';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/news-feed',
      fallbackMessage: 'News feed is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const limit = normalizeNewsLimit(req.nextUrl.searchParams.get('limit'));
      const { result, sourceIds } = getGazetteNews(limit);

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
