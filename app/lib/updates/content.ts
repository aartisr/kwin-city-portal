import updatesData from '@/content/pages/updates.json';
import { SITE_CONFIG } from '@/config/site.config';

export type UpdateLink = {
  label: string;
  href: string;
};

export type UpdateEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  verificationTier: 'verified' | 'pending' | 'contextual';
  tags: string[];
  links: UpdateLink[];
};

const entries = [...(updatesData.entries as UpdateEntry[])].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getUpdateEntries(): UpdateEntry[] {
  return entries;
}

export function getUpdatePath(slug: string): string {
  return `/updates/${slug}`;
}

export function getUpdateUrl(slug: string): string {
  return `${SITE_CONFIG.url}${getUpdatePath(slug)}`;
}

export function getUpdateBySlug(slug: string): UpdateEntry | null {
  return entries.find((entry) => entry.id === slug) ?? null;
}
