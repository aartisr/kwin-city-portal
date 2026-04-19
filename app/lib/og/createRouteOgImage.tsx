import { ImageResponse } from 'next/og';

type RouteOgOptions = {
  title: string;
  subtitle: string;
  eyebrow: string;
};

const IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function createRouteOgImage(options: RouteOgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background: 'linear-gradient(145deg, #040714 0%, #0A1838 52%, #0E2232 100%)',
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              borderRadius: '999px',
              border: '1px solid #F5A62366',
              background: '#F5A62322',
              color: '#FCD58A',
              fontSize: '18px',
              fontWeight: 700,
              padding: '10px 18px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {options.eyebrow}
          </div>
          <div style={{ fontSize: '24px', color: '#94A3B8', fontWeight: 700 }}>kwin-city.com</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '78px', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            {options.title}
          </div>
          <div style={{ fontSize: '30px', lineHeight: 1.32, color: '#CBD5E1', maxWidth: '980px' }}>
            {options.subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            fontSize: '19px',
            color: '#67E8F9',
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '999px',
              background: '#22D3EE',
            }}
          />
          Evidence-first, source-linked, multilingual
        </div>
      </div>
    ),
    IMAGE_SIZE,
  );
}

export const ROUTE_OG_SIZE = IMAGE_SIZE;
