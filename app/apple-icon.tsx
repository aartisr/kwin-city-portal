import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            background: 'linear-gradient(135deg, #F5A623 0%, #E8A020 100%)',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: '#040714',
              fontFamily: 'sans-serif',
              letterSpacing: '-4px',
              lineHeight: 1,
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
