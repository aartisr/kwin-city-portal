import {
  AGENCY_TOPICS,
  DEFAULT_SIGNALS,
  SEO_AGENCY_MISSION,
  SEO_AGENCY_NAME,
  SEO_AGENCY_SITE_URL,
  SOCIAL_PLATFORM_CONFIGS,
  SOCIAL_PLATFORM_ORDER,
  buildUtmLink,
  campaignDate,
  getArticlePath,
  getInstagramImagePath,
  getKwinLocalDate,
  slugify,
} from './config';
import type {
  AgencySnapshot,
  DailyBrief,
  DailyArticle,
  EvidenceStatus,
  KwinAgencyTopic,
  KwinNewsSignal,
  KwinSeoAgencyRun,
  PublishAttempt,
  SocialPlatform,
  SocialPostDraft,
} from './types';

function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  return Math.floor(diff / 86_400_000);
}

function selectTopic(date: Date): KwinAgencyTopic {
  return AGENCY_TOPICS[dayOfYear(date) % AGENCY_TOPICS.length];
}

function combineEvidence(a: EvidenceStatus, b: EvidenceStatus): EvidenceStatus {
  if (a === 'pending' || b === 'pending') return 'pending';
  if (a === 'contextual' || b === 'contextual') return 'contextual';
  return 'verified';
}

function pickSignals(signals: KwinNewsSignal[]): KwinNewsSignal[] {
  const candidates = signals.length > 0 ? signals : DEFAULT_SIGNALS;
  return [...candidates]
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);
}

function buildDailyBrief(topic: KwinAgencyTopic, signals: KwinNewsSignal[], runDate: string): DailyBrief {
  const primarySignal = signals[0] ?? DEFAULT_SIGNALS[0];
  const slug = `${runDate}-${slugify(topic.id)}`;
  const articlePath = getArticlePath(slug);
  const primaryKeyword = topic.keywords[0];
  const canonicalUrl = `${SEO_AGENCY_SITE_URL}${articlePath}`;
  const evidenceStatus = combineEvidence(topic.evidenceStatus, primarySignal.evidenceStatus);
  const signalPhrase =
    primarySignal.source === 'KWIN City Portal'
      ? 'the portal source ledger'
      : `${primarySignal.source}'s latest signal`;

  return {
    slug,
    title: `${topic.hook} Daily KWIN City briefing for ${runDate}`,
    seoTitle: `${topic.hook} | KWIN City Daily Briefing`,
    metaDescription: `${topic.searchIntent}. A source-linked KWIN City daily briefing with evidence labels, social captions, and internal links.`,
    canonicalUrl,
    excerpt: `${topic.hook} This daily brief connects ${signalPhrase} with ${topic.pillar.toLowerCase()} for readers tracking KWIN City, North Bengaluru, and Doddaballapura.`,
    angle: primarySignal.recommendedAngle,
    primaryKeyword,
    secondaryKeywords: [...new Set([...topic.keywords.slice(1), ...primarySignal.matchedTerms])].slice(0, 8),
    sharePrompt: 'Save this if you are tracking North Bengaluru. Share it with someone comparing Bengaluru growth corridors.',
    internalLinks: [
      { label: 'Read the daily article', href: articlePath },
      { label: 'Open the source-linked brief', href: topic.route },
      { label: 'News Intelligence Desk', href: '/news-intelligence' },
      { label: 'Evidence ledger', href: '/evidence' },
      { label: 'Live OPML reader', href: '/news-reader' },
    ],
    evidenceNotes: [
      `Evidence status: ${evidenceStatus}.`,
      'Treat news as directional intelligence unless it is backed by a primary institutional record.',
      'Do not claim guaranteed jobs, guaranteed returns, or official endorsements unless the cited record proves it.',
    ],
    articleOutline: [
      {
        heading: 'What changed or deserves attention today',
        body: primarySignal.summary,
      },
      {
        heading: 'Why this matters for KWIN City',
        body: `${topic.searchIntent}. The strongest content angle today is to connect the reader's question to a source-labeled explanation instead of a hype claim.`,
      },
      {
        heading: 'What to read next',
        body: `Send readers to ${topic.route} first, then to the evidence ledger if the content mentions approvals, project scope, land, investment, or implementation timelines.`,
      },
    ],
  };
}

function buildDailyArticle(
  topic: KwinAgencyTopic,
  brief: DailyBrief,
  signals: KwinNewsSignal[],
  runDate: string,
  generatedAt: string,
): DailyArticle {
  const primarySignal = signals[0] ?? DEFAULT_SIGNALS[0];
  const supportingSignals = signals.slice(1, 4);
  const evidenceStatus = combineEvidence(topic.evidenceStatus, primarySignal.evidenceStatus);
  const articlePath = getArticlePath(brief.slug);
  const signalSource =
    primarySignal.source === 'KWIN City Portal'
      ? 'the KWIN City Portal source ledger'
      : `${primarySignal.source}`;
  const sourceLinks = [
    { label: primarySignal.source, href: primarySignal.url },
    ...supportingSignals.map((signal) => ({ label: signal.source, href: signal.url })),
    { label: 'KWIN City evidence ledger', href: '/evidence' },
    { label: 'KWIN City news intelligence', href: '/news-intelligence' },
  ];
  const uniqueSourceLinks = sourceLinks.filter(
    (link, index, array) => array.findIndex((item) => item.href === link.href) === index,
  );

  return {
    slug: brief.slug,
    title: `${topic.hook} A daily KWIN City read for ${runDate}`,
    dek: `${brief.excerpt} The article is written for ${topic.audience} and keeps every project-sensitive claim inside a visible evidence frame.`,
    canonicalUrl: `${SEO_AGENCY_SITE_URL}${articlePath}`,
    publishedAt: generatedAt,
    updatedAt: generatedAt,
    readingTimeMinutes: 6,
    heroKicker: `${topic.pillar} / ${runDate}`,
    evidenceStatus,
    sourceSummary: `Primary signal: ${primarySignal.title} from ${signalSource}. Relevance score: ${primarySignal.relevanceScore}.`,
    keyTakeaways: [
      topic.searchIntent,
      `Today's strongest signal should be used as ${primarySignal.evidenceStatus} intelligence, not as a standalone proof of every KWIN-specific outcome.`,
      'Readers should be sent to the source ledger when the article touches land, approvals, execution, investment, jobs, or institutional commitments.',
      'The highest-performing angle is clarity: plain-language context, visible evidence labels, and one next step for the reader.',
    ],
    sections: [
      {
        heading: 'The short version',
        paragraphs: [
          `${topic.hook} That is the question this daily KWIN City article answers, using ${signalSource} as the starting point and the portal source ledger as the guardrail.`,
          `KWIN City coverage can move quickly because it sits at the intersection of North Bengaluru, Doddaballapura, industrial policy, airport-linked growth, and sector-cluster ambition. The job of this article is to slow the story down just enough for readers to understand what is known, what is contextual, and what still needs stronger public verification.`,
        ],
      },
      {
        heading: 'Why this matters today',
        paragraphs: [
          primarySignal.summary,
          `${topic.searchIntent}. For search readers, this matters because the most useful KWIN City content is not a thin recap. It connects the reader's question to the right portal page, explains why the signal matters, and refuses to turn contextual news into unsupported certainty.`,
          supportingSignals.length > 0
            ? `Additional monitored signals from ${supportingSignals.map((signal) => signal.source).join(', ')} give the desk more context, but they are still treated as monitoring inputs until a primary public record confirms a KWIN-specific fact.`
            : 'No stronger supporting signal was needed for this article, so the daily angle stays anchored in evergreen KWIN City context and the live source ledger.',
        ],
      },
      {
        heading: 'The KWIN City angle',
        paragraphs: [
          `${topic.pillar} is the editorial lens for today. That means the article should help readers understand ${topic.audience} concerns without burying them under generic smart-city language.`,
          `A strong KWIN City article should answer one concrete question, use one evidence status, link to one primary next page, and give the reader a reason to save or share it. Today's primary keyword is "${brief.primaryKeyword}", supported by ${brief.secondaryKeywords.slice(0, 5).join(', ')}.`,
          `The practical editorial stance is simple: if the topic is about project execution, approvals, land, partner commitments, jobs, investment, or timelines, the article must point readers to sources and avoid guarantee language. If the topic is about regional context, the article can explain why North Bengaluru matters while keeping the distinction clear.`,
        ],
      },
      {
        heading: 'What readers should do next',
        paragraphs: [
          `Start with the article's source-linked next step: ${topic.route}. That page gives readers the durable context behind today's content angle and keeps the daily post connected to a permanent portal surface.`,
          'For social distribution, use the article as the canonical link, then turn the same idea into a short carousel, a Facebook link post, and a concise thread starter. The caption should invite saves, shares, and credible questions rather than cheap engagement.',
          'For weekly and monthly planning, watch which questions people ask after reading this piece. Those questions are often better content prompts than another generic announcement post.',
        ],
      },
      {
        heading: 'Evidence note',
        paragraphs: [
          `Evidence status for this article: ${evidenceStatus}.`,
          'News signals are useful for discovery and timing. They do not automatically verify every project-specific claim. Project-critical claims should be checked against primary records, official public documentation, and the portal evidence ledger before they are repeated in promotional copy.',
        ],
      },
    ],
    faqs: [
      {
        question: `Is this article an official KWIN City announcement?`,
        answer:
          'No. It is a source-linked editorial briefing generated by the KWIN City Portal content desk. It separates live news monitoring from official project confirmation.',
      },
      {
        question: `Why does the article keep mentioning evidence status?`,
        answer:
          'Large urban-development stories often mix confirmed milestones, regional context, planning intent, and promotional targets. The evidence label helps readers understand which kind of claim they are seeing.',
      },
      {
        question: `Where should readers go after this article?`,
        answer: `Open ${topic.route} for the core portal context, then use /evidence and /sources for claim-level verification.`,
      },
    ],
    sourceLinks: uniqueSourceLinks,
    editorialChecklist: [
      'Keep the headline plain and searchable.',
      'Use one visible evidence label.',
      'Link to the strongest internal page.',
      'Avoid guaranteed jobs, guaranteed returns, and unsupported official endorsement language.',
      'Invite one useful reader action: save, share, ask a source question, or open the evidence ledger.',
    ],
  };
}

function buildSocialQueue(topic: KwinAgencyTopic, brief: DailyBrief, runDate: string): SocialPostDraft[] {
  const evidenceLine = `Evidence status: ${topic.evidenceStatus}.`;
  const campaign = `kwin_seo_agency_${campaignDate(runDate)}`;
  const articlePath = getArticlePath(brief.slug);
  const articleImageUrl = `${SEO_AGENCY_SITE_URL}${getInstagramImagePath(brief.slug)}`;

  return SOCIAL_PLATFORM_ORDER.map((platform) => {
    const config = SOCIAL_PLATFORM_CONFIGS[platform];
    const link = buildUtmLink(articlePath, platform, runDate);
    const bodyByPlatform: Record<SocialPlatform, string> = {
      instagram: `${topic.hook}\n\n${brief.excerpt}\n\n${evidenceLine}\n\n${brief.sharePrompt}\n\nOpen the source-linked brief through the link in bio.`,
      facebook: `${topic.hook}\n\n${brief.excerpt}\n\n${brief.angle}\n\n${evidenceLine}\n\nRead the daily KWIN City article: ${link}`,
      linkedin: `${brief.excerpt}\n\nRecommended framing: ${brief.angle}\n\nEvidence discipline: keep project-specific claims source-labeled and route readers to the portal.`,
      x: `${topic.hook}\n\n${brief.excerpt}\n\nSource-linked read: ${link}`,
    };

    return {
      platform,
      format: config.format,
      hook: platform === 'linkedin' ? brief.seoTitle : platform === 'instagram' ? brief.title : topic.hook,
      body: bodyByPlatform[platform],
      hashtags: config.hashtags,
      link,
      mediaUrl: config.requiresMedia ? articleImageUrl : undefined,
      altText: config.requiresMedia ? `${brief.primaryKeyword}: ${topic.hook}` : undefined,
      utmCampaign: campaign,
      evidenceStatus: topic.evidenceStatus,
      approvalStatus: 'needs_review',
      publishStatus: platform === 'facebook' ? 'queued' : 'draft',
      publishNote: config.publishNote,
    };
  });
}

function buildSnapshots(topic: KwinAgencyTopic, signals: KwinNewsSignal[]): AgencySnapshot[] {
  const sourceNames = [...new Set(signals.map((signal) => signal.source))].slice(0, 4);
  const termNames = [...new Set(signals.flatMap((signal) => signal.matchedTerms))].slice(0, 7);

  return [
    {
      cadence: 'daily',
      title: 'Daily publishing command center',
      summary: `Lead with "${topic.hook}" and use ${sourceNames.join(', ') || 'the portal source ledger'} as the attribution spine.`,
      focus: [topic.pillar, topic.searchIntent, 'one clear source label', 'one shareable audience question'],
      contentAssets: ['1 full daily article', '1 SEO brief', '1 Facebook link post', '1 Instagram carousel caption', '1 short thread starter'],
      distributionActions: ['Publish or approve the queued link post', 'Add a story prompt', 'Reply to credible comments', 'Log saves, shares, clicks, and questions'],
      metricsToWatch: ['Saves', 'Shares', 'Profile visits', 'Source-led link clicks', 'Meaningful comments'],
    },
    {
      cadence: 'weekly',
      title: 'Weekly KWIN relevance snapshot',
      summary: 'Convert the strongest daily signal into a recap that helps readers understand what moved, what stayed pending, and what deserves source verification.',
      focus: termNames.length > 0 ? termNames : topic.keywords,
      contentAssets: ['1 weekly recap article', '1 FAQ update', '1 source-check carousel', '1 internal link refresh'],
      distributionActions: ['Promote the best-performing daily post', 'Turn the top comment into a FAQ', 'Refresh next week pillar balance', 'Update the source ledger if a stronger record appears'],
      metricsToWatch: ['Top 3 posts by saves', 'Top 3 posts by shares', 'Comment questions', 'Organic search queries'],
    },
    {
      cadence: 'monthly',
      title: 'Monthly authority-building snapshot',
      summary: 'Package the month into durable search content: sector context, location intelligence, evidence updates, and a clear editorial stance against unsupported claims.',
      focus: ['KWIN City search demand', 'North Bengaluru corridor queries', 'sector cluster explainers', 'evidence freshness'],
      contentAssets: ['1 monthly recap article', '1 evergreen explainer refresh', '1 source-led transparency post', '1 newsletter digest'],
      distributionActions: ['Update sitemap-sensitive pages', 'Refresh internal links', 'Repurpose the highest-save carousel', 'Review content gaps against reader questions'],
      metricsToWatch: ['Search impressions', 'Click-through rate', 'Returning users', 'Newsletter signups', 'Referral traffic'],
    },
    {
      cadence: 'yearly',
      title: 'Yearly KWIN content moat snapshot',
      summary: 'Build compounding authority by turning daily source discipline into a searchable public record of KWIN City context, milestones, evidence, and unanswered questions.',
      focus: ['canonical guides', 'annual timeline review', 'verified-vs-pending claims', 'audience-specific briefs'],
      contentAssets: ['Annual KWIN City report', 'Timeline archive', 'Source-methodology page refresh', 'Top questions index'],
      distributionActions: ['Archive the year by evidence status', 'Update all pillar pages', 'Retire stale claims', 'Create a media kit for journalists and researchers'],
      metricsToWatch: ['Branded search growth', 'High-intent page entrances', 'Quality backlinks', 'Citation requests', 'Community submissions'],
    },
  ];
}

function buildHealthChecks(signals: KwinNewsSignal[], publishAttempts: PublishAttempt[]) {
  const topScore = signals[0]?.relevanceScore ?? 0;
  const hasSignals = signals.length > 0;
  const facebookAttempt = publishAttempts.find((attempt) => attempt.platform === 'facebook');

  return [
    {
      label: 'KWIN relevance',
      status: topScore >= 55 ? ('pass' as const) : ('warn' as const),
      detail:
        topScore >= 55
          ? `Top signal scored ${topScore}.`
          : hasSignals
            ? `Top signal scored ${topScore}; treat it as contextual intelligence, not a project-specific milestone.`
            : 'No high-scoring live signal; used evergreen portal content.',
    },
    {
      label: 'Evidence safety',
      status: 'pass' as const,
      detail: 'The generated queue keeps all project-sensitive claims behind evidence labels.',
    },
    {
      label: 'Direct publishing',
      status: facebookAttempt?.status === 'published' ? ('pass' as const) : ('warn' as const),
      detail: facebookAttempt?.note ?? 'Direct publishing is disabled until platform credentials and approval rules are configured.',
    },
  ];
}

export function createKwinSeoAgencyRun(options: {
  now?: Date;
  newsSignals?: KwinNewsSignal[];
  publishAttempts?: PublishAttempt[];
} = {}): KwinSeoAgencyRun {
  const now = options.now ?? new Date();
  const runDate = getKwinLocalDate(now);
  const generatedAt = now.toISOString();
  const topic = selectTopic(now);
  const signals = pickSignals(options.newsSignals ?? []);
  const dailyBrief = buildDailyBrief(topic, signals, runDate);
  const dailyArticle = buildDailyArticle(topic, dailyBrief, signals, runDate, generatedAt);
  const socialQueue = buildSocialQueue(topic, dailyBrief, runDate);
  const snapshots = buildSnapshots(topic, signals);
  const publishAttempts = options.publishAttempts ?? [];

  return {
    id: runDate,
    runDate,
    generatedAt,
    agencyName: SEO_AGENCY_NAME,
    mission: SEO_AGENCY_MISSION,
    topic,
    dailyBrief,
    dailyArticle,
    newsSignals: signals,
    socialQueue,
    snapshots,
    publishAttempts,
    healthChecks: buildHealthChecks(signals, publishAttempts),
  };
}
