import { NextRequest, NextResponse } from 'next/server';

const CKAN_BASE = 'https://data.opencity.in/api/3/action';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const dataset = searchParams.get('dataset');
  const resourceId = searchParams.get('resource_id');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '500', 10), 1000);

  if (!dataset && !resourceId) {
    return NextResponse.json({ error: 'dataset or resource_id param required' }, { status: 400 });
  }

  try {
    let targetResourceId = resourceId;

    if (!targetResourceId) {
      // Step 1: discover the datastore-active resource from the dataset slug
      const pkgRes = await fetch(
        `${CKAN_BASE}/package_show?id=${encodeURIComponent(dataset!)}`,
        { next: { revalidate: 3600 } }
      );
      if (!pkgRes.ok) throw new Error(`package_show HTTP ${pkgRes.status}`);

      const pkg = await pkgRes.json();
      if (!pkg.success) {
        return NextResponse.json(
          { error: pkg.error?.message ?? 'CKAN returned error', ckan_error: pkg.error },
          { status: 422 }
        );
      }

      const resources: { id: string; datastore_active: boolean; format: string; name: string }[] =
        pkg.result?.resources ?? [];

      // Prefer datastore-active resource; fall back to CSV
      const active =
        resources.find((r) => r.datastore_active) ??
        resources.find((r) => r.format?.toUpperCase() === 'CSV');

      if (!active) {
        return NextResponse.json(
          {
            error: 'No queryable datastore resource found on this dataset.',
            hint: 'The dataset may only contain PDFs or documents.',
            resources: resources.map((r) => ({ id: r.id, name: r.name, format: r.format })),
          },
          { status: 422 }
        );
      }

      targetResourceId = active.id;
    }

    // Step 2: fetch actual tabular data
    const dataRes = await fetch(
      `${CKAN_BASE}/datastore_search?resource_id=${encodeURIComponent(targetResourceId)}&limit=${limit}`,
      { next: { revalidate: 3600 } }
    );
    if (!dataRes.ok) throw new Error(`datastore_search HTTP ${dataRes.status}`);

    const data = await dataRes.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error fetching from OpenCity';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
