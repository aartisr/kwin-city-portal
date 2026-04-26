import { ImageResponse } from 'next/og';

export const alt = 'KWIN City — Knowledge · Wellbeing · Innovation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic Open Graph image served at /opengraph-image.
 * Used by every page's meta og:image tag, Twitter card, and WhatsApp previews.
 * Renders in ~50ms via the Edge runtime.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(150deg, #040714 0%, #07131F 55%, #04120F 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #F5A623 0%, #6366F1 50%, #06B6D4 100%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F5A623',
                color: '#040714',
                fontSize: '38px',
                fontWeight: 950,
              }}
            >
              K
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#FFFFFF', fontSize: '30px', fontWeight: 900 }}>KWIN City</div>
              <div style={{ color: '#94A3B8', fontSize: '18px', fontWeight: 700 }}>
                Knowledge · Wellbeing · Innovation
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#F5C050',
              fontWeight: 800,
            }}
          >
            kwin-city.com
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              padding: '10px 18px',
              border: '1px solid rgba(245, 198, 80, 0.45)',
              color: '#F5C050',
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: 0,
              textTransform: 'uppercase',
              marginBottom: '26px',
            }}
          >
            465-acre proposal · Source-linked
          </div>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 950,
              color: '#FFFFFF',
              lineHeight: 0.96,
              letterSpacing: 0,
              maxWidth: '980px',
            }}
          >
            North Bengaluru&apos;s knowledge city, explained in 60 seconds.
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#C9D8E8',
              lineHeight: 1.35,
              maxWidth: '860px',
              marginTop: '24px',
            }}
          >
            Share the brief, inspect the sources, and follow the evidence trail behind KWIN City.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
