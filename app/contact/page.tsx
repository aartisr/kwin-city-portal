import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import ContactForm from '@/components/ContactForm';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Contact Us', kn: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', hi: 'संपर्क करें'
    }),
    description: pickByLocale(locale, {
      en: "Get in touch with the KWIN City team. For investors, residents, researchers, journalists, and anyone curious about North Bengaluru's proposed knowledge township.",
      kn: 'KWIN City ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      hi: 'KWIN City टीम से संपर्क करें।',
    }),
    alternates: { canonical: 'https://kwin-city.com/contact' },
    openGraph: {
      title: pickByLocale(locale, { en: 'Contact KWIN City', kn: 'KWIN City ಸಂಪರ್ಕ', hi: 'KWIN City संपर्क' }),
      description: pickByLocale(locale, {
        en: 'Reach the KWIN City team — investors, residents, researchers, journalists welcome.',
        kn: 'KWIN City ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ — ಹೂಡಿಕೆದಾರರು, ನಿವಾಸಿಗಳು, ಸಂಶೋಧಕರು, ಪತ್ರಕರ್ತರು ಎಲ್ಲರೂ ಸ್ವಾಗತ.',
        hi: 'KWIN City टीम से संपर्क करें — निवेशक, निवासी, शोधकर्ता और पत्रकार सभी स्वागत योग्य हैं।',
      }),
      url: 'https://kwin-city.com/contact',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/contact/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pickByLocale(locale, { en: 'Contact KWIN City', kn: 'KWIN City ಸಂಪರ್ಕ', hi: 'KWIN City संपर्क' }),
      description: pickByLocale(locale, {
        en: 'Reach the KWIN City team — investors, residents, researchers, journalists welcome.',
        kn: 'KWIN City ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ — ಹೂಡಿಕೆದಾರರು, ನಿವಾಸಿಗಳು, ಸಂಶೋಧಕರು, ಪತ್ರಕರ್ತರು ಎಲ್ಲರೂ ಸ್ವಾಗತ.',
        hi: 'KWIN City टीम से संपर्क करें — निवेशक, निवासी, शोधकर्ता और पत्रकार सभी स्वागत योग्य हैं।',
      }),
      images: ['https://kwin-city.com/contact/opengraph-image'],
    },
    robots: { index: true, follow: true },
  };
}

export default function ContactPage() {
  return (
    <SiteFrame>
      <ContactForm />
    </SiteFrame>
  );
}
