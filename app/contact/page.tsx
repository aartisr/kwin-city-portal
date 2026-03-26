import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | KWIN City',
  description:
     "Get in touch with the KWIN City team. For investors, residents, researchers, journalists, and anyone curious about North Bengaluru's proposed knowledge township.",
  alternates: { canonical: 'https://kwin-city.com/contact' },
  openGraph: {
    title: 'Contact KWIN City',
    description: 'Reach the KWIN City team — investors, residents, researchers, journalists welcome.',
    url: 'https://kwin-city.com/contact',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <ContactForm />
    </SiteFrame>
  );
}
