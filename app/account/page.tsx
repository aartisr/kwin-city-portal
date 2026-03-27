import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import AuthPreferences from '@/components/AuthPreferences';

export const metadata: Metadata = {
  title: 'Account and Preferences',
  description: 'Sign in and manage saved user preferences for KWIN City',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <SiteFrame>
      <AuthPreferences />
    </SiteFrame>
  );
}
