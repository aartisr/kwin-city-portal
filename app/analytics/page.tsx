import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description:
    'Private on-device analytics dashboard for KWIN City page views, route activity, engagement signals, and operational checks without exposing the report to search indexes.',
  alternates: { canonical: 'https://kwin-city.com/analytics' },
  robots: { index: false },
};

export default function AnalyticsPage() {
  return (
    <SiteFrame>
      <AnalyticsDashboard />
    </SiteFrame>
  );
}
