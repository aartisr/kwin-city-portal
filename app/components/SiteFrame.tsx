import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBanner from '@/components/TrustBanner';

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <TrustBanner />
      {children}
      <Footer />
    </>
  );
}
