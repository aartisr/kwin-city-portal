import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KWIN City — Knowledge · Wellbeing · Innovation',
    short_name: 'KWIN City',
    description:
      'Knowledge-economy intelligence portal for North Bengaluru\'s 465-acre KWIN City township. Data-first, source-verified, built for investors, residents, and researchers.',
    start_url: '/?source=pwa',
    id: '/',
    display: 'standalone',
    background_color: '#040714',
    theme_color: '#040714',
    orientation: 'portrait',
    categories: ['news', 'government', 'productivity'],
    lang: 'en-IN',
    dir: 'ltr',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Data Insights',
        short_name: 'Data',
        url: '/data-insights',
        description: 'Live evidence dashboards',
      },
      {
        name: 'News Intelligence',
        short_name: 'News',
        url: '/news-reader',
        description: 'KWIN live news feed',
      },
      {
        name: 'Why North Bengaluru',
        short_name: 'Why',
        url: '/why-north-bengaluru',
        description: 'Regional strategic case',
      },
    ],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
        // @ts-ignore - label is valid per spec
        label: 'KWIN City Portal home screen',
        form_factor: 'wide',
      },
    ],
    prefer_related_applications: false,
  };
}
