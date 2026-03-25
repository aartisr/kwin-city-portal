import type { Metadata } from 'next';
import PersonaHub from '@/components/PersonaHub';
import SiteFrame from '@/components/SiteFrame';

export const metadata: Metadata = {
  title: 'Persona Views | KWIN City',
  description: 'Dedicated KWIN City pages for investors, residents, researchers, journalists, and curious citizens.',
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
