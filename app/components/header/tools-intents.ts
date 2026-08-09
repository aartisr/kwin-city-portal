import type { NavItem } from '@/components/header/types';

export type ToolIntentSection = {
  key: string;
  title: string;
  summary: string;
  itemHrefs: string[];
};

export const TOOL_INTENT_SECTIONS: ToolIntentSection[] = [
  {
    key: 'due-diligence',
    title: 'Due Diligence',
    summary: 'Validate parcel viability, access assumptions, and compliance pathways before commitment.',
    itemHrefs: ['/tools/risk-check', '/tools/accessibility', '/tools/regulatory-navigator'],
  },
  {
    key: 'market-intelligence',
    title: 'Market Intelligence',
    summary: 'Track value movement, tenant momentum, and investor-grade opportunity signals.',
    itemHrefs: ['/tools/valuation-index', '/tools/investment-radar', '/tools/opportunity-exchange'],
  },
  {
    key: 'spatial-progress',
    title: 'Spatial and Progress',
    summary: 'Inspect layers, satellite observations, and timeline-grade development evidence.',
    itemHrefs: ['/tools/spatial-explorer', '/updates/satellite-tracker', '/updates/change-tracker'],
  },
  {
    key: 'policy-data',
    title: 'Policy and Data',
    summary: 'Follow regulatory changes and export machine-readable planning datasets.',
    itemHrefs: ['/updates/regulatory-news', '/tools/open-data-studio'],
  },
];

export function getToolIntentSections(items: NavItem[]) {
  const byHref = new Map(items.map((item) => [item.href, item]));

  return TOOL_INTENT_SECTIONS.map((section) => ({
    ...section,
    items: section.itemHrefs
      .map((href) => byHref.get(href))
      .filter((item): item is NavItem => Boolean(item)),
  })).filter((section) => section.items.length > 0);
}
