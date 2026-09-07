import { ImageResponse } from 'next/og';

export const alt = 'KWIN City share kit - 60-second source-linked brief';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ShareOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#04120F',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(245,166,35,0.28), transparent 34%), linear-gradient(315deg, rgba(6,182,212,0.24), transparent 38%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 8,
            background: 'linear-gradient(90deg, #F5A623 0%, #06B6D4 52%, #10B981 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: 64,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F5A623',
                  color: '#04120F',
                  fontSize: 38,
                  fontWeight: 900,
                }}
              >
                K
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 30, fontWeight: 900 }}>KWIN City</div>
                <div style={{ color: '#9DB7CF', fontSize: 18, fontWeight: 700 }}>
                  North Bengaluru source-linked brief
                </div>
              </div>
            </div>
            <div style={{ color: '#F5C050', fontSize: 18, fontWeight: 800 }}>kwin-city.com/share</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                padding: '10px 18px',
                border: '1px solid rgba(245, 198, 80, 0.45)',
                color: '#F5C050',
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 0,
                textTransform: 'uppercase',
                marginBottom: 26,
              }}
            >
              Copy. Send. Verify.
            </div>
            <div style={{ maxWidth: 940, fontSize: 76, fontWeight: 950, lineHeight: 0.95 }}>
              Share KWIN City in 10 seconds.
            </div>
            <div style={{ marginTop: 24, maxWidth: 840, color: '#C9D8E8', fontSize: 29, lineHeight: 1.32 }}>
              A 60-second brief, social-ready angles, launch carousel visuals, and the full evidence trail.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
