'use client';

import { ContentBlock } from '@/lib/content-manager';

export default function RegionMap({ data }: { data: ContentBlock }) {
  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold mb-8">{data.title || 'Regional Map'}</h2>
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-600">Map component - Connect your map library here</p>
      </div>
    </section>
  );
}
