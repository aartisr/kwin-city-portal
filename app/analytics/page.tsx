import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'On-device page tracking dashboard for KWIN City',
  robots: { index: false },
};

export default function AnalyticsPage() {
  return (
    <SiteFrame>
      <AnalyticsDashboard />
    </SiteFrame>
  );
}
