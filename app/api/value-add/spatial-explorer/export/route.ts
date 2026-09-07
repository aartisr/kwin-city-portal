import { NextResponse } from 'next/server';
import { withApiRoute } from '@/lib/server/api-route';
import { createAcquisitionBufferDerivedGeoJson } from '@/lib/server/value-add/spatial-buffer-export';

export async function GET() {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/spatial-explorer/export',
      fallbackMessage: 'Unable to generate derived GeoJSON export at this time.',
    },
    async () => {
      const payload = createAcquisitionBufferDerivedGeoJson();
      return new NextResponse(JSON.stringify(payload, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/geo+json; charset=utf-8',
          'Content-Disposition': 'attachment; filename="acquisition-notification-buffers-derived.geojson"',
          'Cache-Control': 'no-store',
        },
      });
    }
  );
}
