import Hero from '@/components/Hero';
import BengaluruPride from '@/components/BengaluruPride';
import SiteFrame from '@/components/SiteFrame';
import HomeSummary from '@/components/HomeSummary';
import HomeTrustSnapshot from '@/components/HomeTrustSnapshot';
import HomeRouteGrid from '@/components/HomeRouteGrid';
import EvidencePreview from '@/components/EvidencePreview';
import ImageStrip from '@/components/ImageStrip';
import PersonaHub from '@/components/PersonaHub';

export default function Home() {
  return (
    <SiteFrame>
      <main>
        <Hero />
        <ImageStrip />
        <BengaluruPride />
        <HomeSummary />
        <HomeTrustSnapshot />
        <PersonaHub />
        <HomeRouteGrid />
        <EvidencePreview />
      </main>
    </SiteFrame>
  );
}
