export type SearchCategory =
  | 'Page'
  | 'Timeline'
  | 'Sector'
  | 'Sustainability'
  | 'Pillar'
  | 'FAQ'
  | 'Download'
  | 'Update'
  | 'Data';

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  href: string;
  icon: string;
  tags: string[];
}
