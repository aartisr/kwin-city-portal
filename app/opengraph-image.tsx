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
          justifyContent: 'flex-end',
          padding: '64px',
          background: 'linear-gradient(150deg, #040714 0%, #0D1640 50%, #07131F 100%)',
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

        {/* Pillar badges */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Knowledge', color: '#3B82F6' },
            { label: 'Wellbeing', color: '#22C55E' },
            { label: 'Innovation', color: '#F59E0B' },
          ].map(({ label, color }) => (
            <div
              key={label}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                background: `${color}22`,
                border: `1px solid ${color}55`,
                color,
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          KWIN City
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#94A3B8',
            lineHeight: 1.4,
            maxWidth: '800px',
          }}
        >
          A 465-acre knowledge-economy township in Doddaballapura, North Bengaluru.
          Evidence-first · Net-zero · KIADB
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '64px',
            fontSize: '18px',
            color: '#64748B',
            fontWeight: 600,
          }}
        >
          kwin-city.com
        </div>
      </div>
    ),
    { ...size },
  );
}
