import type { NavGroup } from '@/components/header/types';

export type HeaderLabels = {
  search: string;
  account: string;
  signedIn: string;
  trust: string;
  hideTrustBar: string;
  showTrustBar: string;
  toggleMenu: string;
  exploreKwin: string;
  language: string;
};

export type HeaderStory = {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
};

export const GROUP_STORIES: Record<string, HeaderStory> = {
  discover: {
    eyebrow: 'Orientation',
    title: 'Start with the story before the detail.',
    body: 'High-traffic headers like Apple and Airbnb make the first decision obvious. This section is the guided entry point into the KWIN vision.',
    accent: 'from-[#F5A623]/20 via-[#F5A623]/8 to-transparent',
  },
  ecosystem: {
    eyebrow: 'Context',
    title: 'Frame the ecosystem, not just the project.',
    body: 'Strong premium headers use fewer top-level choices and sharper grouping. This section collects the economic and sustainability case in one place.',
    accent: 'from-cyan-400/18 via-cyan-300/8 to-transparent',
  },
  research: {
    eyebrow: 'Evidence',
    title: 'Bring the proof layer forward.',
    body: 'Stripe, GitHub, and Notion surface the “serious work” paths clearly. This section keeps the data, sources, and downloads one click away.',
    accent: 'from-emerald-400/18 via-emerald-300/8 to-transparent',
  },
  intelligence: {
    eyebrow: 'Signal',
    title: 'Live context should feel immediate.',
    body: 'The best headers make evolving information feel accessible without overwhelming people. This section concentrates news, trust, and community signals.',
    accent: 'from-violet-400/16 via-fuchsia-300/6 to-transparent',
  },
  audiences: {
    eyebrow: 'Pathways',
    title: 'Different visitors need different entry routes.',
    body: 'Airbnb and LinkedIn both make intent-based routes obvious. This section helps investors, residents, researchers, and journalists self-select quickly.',
    accent: 'from-amber-300/18 via-cyan-300/8 to-transparent',
  },
};

export function splitItems(items: NavGroup['items']) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
