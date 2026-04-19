import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to the most common questions about KWIN City — for investors, residents, researchers, journalists, and curious citizens.',
  keywords: [
    'KWIN City FAQ',
    'KWIN questions answers',
    'KIADB investment FAQ',
    'North Bengaluru development questions',
    'knowledge wellbeing innovation township',
  ],
  alternates: { canonical: 'https://kwin-city.com/faq' },
  openGraph: {
    title: 'KWIN City FAQ — All Your Questions Answered',
    description:
      'Transparent, verified answers for every type of visitor to KWIN City — from investment to sustainability to source methodology.',
    url: 'https://kwin-city.com/faq',
    type: 'website',
    images: [{ url: 'https://kwin-city.com/faq/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City FAQ — All Your Questions Answered',
    description:
      'Transparent, verified answers for every type of visitor to KWIN City — from investment to sustainability to source methodology.',
    images: ['https://kwin-city.com/faq/opengraph-image'],
  },
};

export default function FaqRoute() {
  return (
    <SiteFrame>
      <FaqPage />
    </SiteFrame>
  );
}
