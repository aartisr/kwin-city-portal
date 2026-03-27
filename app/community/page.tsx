import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import CommunityDiscussion from '@/components/CommunityDiscussion';

export const metadata: Metadata = {
  title: 'Community Discussion',
  description: 'Community thread for discussion and evidence requests',
  robots: { index: false },
};

export default function CommunityPage() {
  return (
    <SiteFrame>
      <CommunityDiscussion />
    </SiteFrame>
  );
}
