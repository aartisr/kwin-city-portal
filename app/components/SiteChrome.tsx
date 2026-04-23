'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import TrustBanner from '@/components/TrustBanner';
import type { NavGroup } from '@/components/header/types';

type SiteChromeProps = {
  menuGroups: NavGroup[];
  headerLabels: {
    search: string;
    account: string;
    signedIn: string;
    trust: string;
    hideTrustBar: string;
    showTrustBar: string;
    toggleMenu: string;
    exploreKwin: string;
    language: string;
  };
  trustBannerCopy: {
    protocolLabel: string;
    bodyText: string;
    trustLabel: string;
    sourcesLabel: string;
    newsIntelligenceLabel: string;
  };
};

export default function SiteChrome({
  menuGroups,
  headerLabels,
  trustBannerCopy,
}: SiteChromeProps) {
  const [trustBannerVisible, setTrustBannerVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kwin-trust-banner-visible');
    if (stored === 'true') setTrustBannerVisible(true);
  }, []);

  const toggleTrustBanner = () => {
    setTrustBannerVisible((visible) => {
      const next = !visible;
      localStorage.setItem('kwin-trust-banner-visible', String(next));
      return next;
    });
  };

  return (
    <>
      <Header
        trustBannerVisible={trustBannerVisible}
        onToggleTrustBanner={toggleTrustBanner}
        menuGroups={menuGroups}
        labels={headerLabels}
      />
      <TrustBanner visible={trustBannerVisible} {...trustBannerCopy} />
    </>
  );
}
