import Hero from '@/components/Hero';
import BengaluruPride from '@/components/BengaluruPride';
import SiteFrame from '@/components/SiteFrame';
import HomeSummary from '@/components/HomeSummary';
import HomeProgressiveDisclosure from '@/components/HomeProgressiveDisclosure';
import HomeTrustSnapshot from '@/components/HomeTrustSnapshot';
import HomeRouteGrid from '@/components/HomeRouteGrid';
import EvidencePreview from '@/components/EvidencePreview';
import ImageStrip from '@/components/ImageStrip';
import InnovationCanvas from '@/components/InnovationCanvas';
import ShareKwinMoment from '@/components/ShareKwinMoment';
import PersonaHub from '@/components/PersonaHub';
import JsonLd from '@/components/JsonLd';
import { generateHomeMetadata } from '@/lib/home/metadata';
import { getHomeSchemas } from '@/lib/home/schemas';

export const generateMetadata = generateHomeMetadata;

export default function Home() {
  return (
    <SiteFrame>
      <JsonLd data={getHomeSchemas()} />
      <main id="main-content" role="main">
        <Hero />
        <HomeSummary />
        <HomeProgressiveDisclosure>
          <ImageStrip />
          <InnovationCanvas />
          <ShareKwinMoment />
          <BengaluruPride />
          <HomeTrustSnapshot />
          <PersonaHub />
          <HomeRouteGrid />
          <EvidencePreview />
        </HomeProgressiveDisclosure>
      </main>
    </SiteFrame>
  );
}
