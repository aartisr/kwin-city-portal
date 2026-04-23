import { ImageResponse } from 'next/og';
import { getUpdateBySlug } from '@/lib/updates/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type ImageProps = {
  params: Promise<{ slug: string }>;
};

function getVerificationAccent(tier: 'verified' | 'pending' | 'contextual') {
  if (tier === 'verified') return { label: 'Verified', color: '#10B981' };
  if (tier === 'pending') return { label: 'Pending', color: '#F59E0B' };
  return { label: 'Contextual', color: '#94A3B8' };
}

export default async function UpdateOpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const entry = getUpdateBySlug(slug);
  const accent = getVerificationAccent(entry?.verificationTier ?? 'contextual');

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
          background: 'linear-gradient(155deg, #050816 0%, #0B163A 48%, #111827 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <div
              style={{
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.06)',
                padding: '10px 16px',
              }}
            >
              KWIN
            </div>
            <div style={{ color: '#F5A623' }}>City Updates</div>
          </div>
          <div
            style={{
              borderRadius: '999px',
              border: `1px solid ${accent.color}66`,
              background: `${accent.color}22`,
              color: accent.color,
              padding: '8px 18px',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {accent.label}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              color: '#7DD3FC',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            Citation-ready project update
          </div>
          <div
            style={{
              fontSize: '60px',
              lineHeight: 1.06,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              maxWidth: '960px',
            }}
          >
            {entry?.title ?? 'KWIN City update'}
          </div>
          <div
            style={{
              color: '#B8C6D9',
              fontSize: '24px',
              lineHeight: 1.45,
              maxWidth: '920px',
            }}
          >
            {entry?.summary ?? 'Evidence-first update page for KWIN City with permanent URL, share metadata, and source-linked context.'}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '18px',
            color: '#94A3B8',
          }}
        >
          <div>{entry?.date ?? 'KWIN City'}</div>
          <div>kwin-city.com</div>
        </div>
      </div>
    ),
    size,
  );
}
