import { NextRequest, NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getInvestmentRadar, normalizeInvestmentCategory } from '@/lib/server/value-add/investment-radar';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/investment-radar',
      fallbackMessage: 'Investment radar is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const category = normalizeInvestmentCategory(req.nextUrl.searchParams.get('category'));
      const { result, sourceIds } = getInvestmentRadar(category);

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
