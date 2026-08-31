'use client';

import Link from 'next/link';
import { KWIN_SOURCE_REGISTRY } from '@/data/constants';

type InlineSourceBadgesProps = {
  sourceIds: string[];
};

export default function InlineSourceBadges({ sourceIds }: InlineSourceBadgesProps) {
  const sources = sourceIds
    .map((id) => KWIN_SOURCE_REGISTRY[id])
    .filter(Boolean);

  return (
    <span className="inline-flex flex-wrap items-center gap-1 align-middle">
      {sources.map((source) => (
        <Link
          key={source.id}
          href={`/sources#${source.id}`}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-300 bg-white px-1.5 text-[10px] font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-700"
          title={`${source.label}: ${source.title}`}
        >
          {source.label}
        </Link>
      ))}
    </span>
  );
}