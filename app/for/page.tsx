import type { Metadata } from 'next';
import PersonaHub from '@/components/PersonaHub';
import SiteFrame from '@/components/SiteFrame';

export const metadata: Metadata = {
  title: 'Explore KWIN City | For Investors · Residents · Researchers · Journalists',
  description:
    'Tailored KWIN City overviews for every audience: investment briefings, resident livability guides, research methodology, journalist story angles, and plain-language explainers for curious citizens.',
  keywords: [
    'KWIN City investor',
    'KWIN City resident',
    'KWIN City researcher',
    'North Bengaluru investment briefing',
    'smart city for residents India',
  ],
  alternates: { canonical: 'https://kwin-city.com/for' },
  openGraph: {
    title: 'Explore KWIN City — For Investors, Residents, Researchers & More',
    description:
      'Tailored KWIN City briefings for investors, residents, researchers, journalists, and curious citizens.',
    url: 'https://kwin-city.com/for',
    type: 'website',
  },
};

export default function PersonaHubPage() {
  return (
    <SiteFrame>
      <main>
        <PersonaHub />
      </main>
    </SiteFrame>
  );
}
