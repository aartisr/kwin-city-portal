'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBanner from '@/components/TrustBanner';

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const [trustBannerVisible, setTrustBannerVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kwin-trust-banner-visible');
    if (stored === 'true') setTrustBannerVisible(true);
  }, []);

  const toggleTrustBanner = () => {
    setTrustBannerVisible((v) => {
      const next = !v;
      localStorage.setItem('kwin-trust-banner-visible', String(next));
      return next;
    });
  };

  return (
    <>
      <Header trustBannerVisible={trustBannerVisible} onToggleTrustBanner={toggleTrustBanner} />
      <TrustBanner visible={trustBannerVisible} />
      {children}
      <Footer />
    </>
  );
}
