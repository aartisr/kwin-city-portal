import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/config/site.config';
import { getSeoAgencyRunByArticleSlug } from '@/lib/seo-agency/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

function fitText(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}...`;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const run = await getSeoAgencyRunByArticleSlug(slug);
  const title = run?.dailyArticle.title ?? 'KWIN City Daily Article';
  const dek = run?.dailyArticle.dek ?? SITE_CONFIG.description;
  const evidenceStatus = run?.dailyArticle.evidenceStatus ?? 'contextual';
  const keyword = run?.dailyBrief.primaryKeyword ?? 'KWIN City';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f8fafc',
          color: '#0f172a',
          padding: '72px',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '14px 20px',
              borderRadius: '999px',
              background: '#0f172a',
              color: 'white',
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            KWIN City
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 18px',
              borderRadius: '999px',
              background: evidenceStatus === 'pending' ? '#fef3c7' : evidenceStatus === 'verified' ? '#d1fae5' : '#e2e8f0',
              color: evidenceStatus === 'pending' ? '#92400e' : evidenceStatus === 'verified' ? '#065f46' : '#334155',
              fontSize: '24px',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {evidenceStatus}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              padding: '12px 18px',
              borderRadius: '16px',
              background: '#cffafe',
              color: '#155e75',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            {keyword}
          </div>
          <div
            style={{
              fontSize: '58px',
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              maxWidth: '920px',
            }}
          >
            {fitText(title, 118)}
          </div>
          <div
            style={{
              fontSize: '30px',
              lineHeight: 1.35,
              color: '#475569',
              maxWidth: '900px',
            }}
          >
            {fitText(dek, 170)}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #cbd5e1',
            paddingTop: '28px',
            color: '#334155',
            fontSize: '26px',
            fontWeight: 700,
          }}
        >
          <span>Source-linked daily article</span>
          <span>kwin-city.com/seo-agency</span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    },
  );
}
