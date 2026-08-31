import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

// Dynamic KWIN City app icon — no static image assets required
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #040714 0%, #0D1640 100%)',
          borderRadius: 96,
        }}
      >
        {/* Amber card */}
        <div
          style={{
            width: 360,
            height: 360,
            background: 'linear-gradient(135deg, #F5A623 0%, #E8A020 100%)',
            borderRadius: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 64px rgba(245,166,35,0.45)',
          }}
        >
          {/* K letter */}
          <span
            style={{
              fontSize: 240,
              fontWeight: 900,
              color: '#040714',
              fontFamily: 'sans-serif',
              letterSpacing: '-12px',
              lineHeight: 1,
              marginTop: -8,
            }}
          >
            K
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
