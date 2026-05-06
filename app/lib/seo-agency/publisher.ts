import { SOCIAL_PLATFORM_CONFIGS, SOCIAL_PLATFORM_ORDER } from './config';
import type { AgencyReadinessCheck, KwinSeoAgencyRun, PublishAttempt, SocialPlatform, SocialPostDraft } from './types';

type PublishingResult = {
  attempts: PublishAttempt[];
  socialQueue: SocialPostDraft[];
};

type GraphResponse = {
  id?: string;
  post_id?: string;
  error?: {
    message?: string;
  };
};

type XPostResponse = {
  data?: {
    id?: string;
  };
  errors?: Array<{
    detail?: string;
    title?: string;
  }>;
};

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || 'v25.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

function publishingEnabled(): boolean {
  return process.env.SOCIAL_PUBLISHING_ENABLED === 'true';
}

function autoApproveEnabled(): boolean {
  return process.env.SOCIAL_AUTO_APPROVE === 'true';
}

function missingEnv(keys: string[]): string[] {
  return keys.filter((key) => !process.env[key]);
}

export function getPublishingReadiness(): AgencyReadinessCheck[] {
  const enabled = publishingEnabled();
  const approvedByRule = autoApproveEnabled();

  return SOCIAL_PLATFORM_ORDER.map((platform) => {
    const config = SOCIAL_PLATFORM_CONFIGS[platform];
    const missing = missingEnv(config.requiredEnv);

    if (!config.directPublish) {
      return {
        id: platform,
        label: config.label,
        status: 'manual',
        detail: config.publishNote,
        optionalEnv: config.optionalEnv,
      };
    }

    if (!enabled) {
      return {
        id: platform,
        label: config.label,
        status: 'disabled',
        detail: 'Direct publishing is disabled by SOCIAL_PUBLISHING_ENABLED.',
        missingEnv: missing,
        optionalEnv: config.optionalEnv,
      };
    }

    if (!approvedByRule) {
      return {
        id: platform,
        label: config.label,
        status: 'blocked',
        detail: 'Direct publishing requires SOCIAL_AUTO_APPROVE=true or a human approval adapter.',
        missingEnv: missing,
        optionalEnv: config.optionalEnv,
      };
    }

    if (missing.length > 0) {
      return {
        id: platform,
        label: config.label,
        status: 'blocked',
        detail: `Missing required environment variables: ${missing.join(', ')}.`,
        missingEnv: missing,
        optionalEnv: config.optionalEnv,
      };
    }

    return {
      id: platform,
      label: config.label,
      status: 'ready',
      detail: config.publishNote,
      optionalEnv: config.optionalEnv,
    };
  });
}

async function postGraph(pathname: string, params: Record<string, string>): Promise<GraphResponse> {
  const response = await fetch(`${GRAPH_API_BASE}${pathname}`, {
    method: 'POST',
    body: new URLSearchParams(params),
  });
  const payload = (await response.json()) as GraphResponse;
  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message || `Meta Graph API returned ${response.status}`);
  }
  return payload;
}

function trimToPlatform(text: string, platform: SocialPlatform): string {
  const limit = SOCIAL_PLATFORM_CONFIGS[platform].captionLimit;
  if (!limit || text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

function composePostText(draft: SocialPostDraft, platform: SocialPlatform): string {
  const hashtagLimit = SOCIAL_PLATFORM_CONFIGS[platform].hashtagLimit ?? draft.hashtags.length;
  const hashtags = draft.hashtags.slice(0, hashtagLimit).join(' ');
  const parts = [draft.body, hashtags].filter(Boolean);
  return trimToPlatform(parts.join('\n\n'), platform);
}

async function publishFacebook(draft: SocialPostDraft): Promise<PublishAttempt> {
  const pageId = process.env.META_PAGE_ID;
  const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
  const missing = missingEnv(SOCIAL_PLATFORM_CONFIGS.facebook.requiredEnv);

  if (missing.length > 0 || !pageId || !accessToken) {
    return {
      platform: 'facebook',
      status: 'skipped',
      note: `Missing required environment variables: ${missing.join(', ')}.`,
    };
  }

  try {
    const payload = await postGraph(`/${pageId}/feed`, {
      message: draft.body,
      link: draft.link,
      access_token: accessToken,
    });

    return {
      platform: 'facebook',
      status: 'published',
      note: 'Published to Facebook Page feed.',
      platformPostId: payload.id ?? payload.post_id,
    };
  } catch (error) {
    return {
      platform: 'facebook',
      status: 'failed',
      note: error instanceof Error ? error.message : 'Facebook publish failed.',
    };
  }
}

async function publishInstagram(draft: SocialPostDraft): Promise<PublishAttempt> {
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
  const imageUrl = process.env.SOCIAL_DEFAULT_IMAGE_URL || draft.mediaUrl;
  const config = SOCIAL_PLATFORM_CONFIGS.instagram;
  const missing = missingEnv(config.requiredEnv);

  if (missing.length > 0 || !accountId || !accessToken) {
    return {
      platform: 'instagram',
      status: 'skipped',
      note: `Missing required environment variables: ${missing.join(', ')}.`,
    };
  }

  if (!imageUrl) {
    return {
      platform: 'instagram',
      status: 'skipped',
      note: 'Missing Instagram media URL. Set SOCIAL_DEFAULT_IMAGE_URL or use a generated draft mediaUrl.',
    };
  }

  try {
    const caption = composePostText(draft, 'instagram');
    const container = await postGraph(`/${accountId}/media`, {
      image_url: imageUrl,
      caption,
      ...(draft.altText ? { alt_text: draft.altText.slice(0, 1000) } : {}),
      access_token: accessToken,
    });

    if (!container.id) {
      throw new Error('Instagram media container did not return an id.');
    }

    const published = await postGraph(`/${accountId}/media_publish`, {
      creation_id: container.id,
      access_token: accessToken,
    });

    return {
      platform: 'instagram',
      status: 'published',
      note: 'Published to Instagram Business account.',
      platformPostId: published.id,
    };
  } catch (error) {
    return {
      platform: 'instagram',
      status: 'failed',
      note: error instanceof Error ? error.message : 'Instagram publish failed.',
    };
  }
}

async function publishLinkedIn(draft: SocialPostDraft): Promise<PublishAttempt> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN;
  const version = process.env.LINKEDIN_VERSION || '202604';
  const missing = missingEnv(SOCIAL_PLATFORM_CONFIGS.linkedin.requiredEnv);

  if (missing.length > 0 || !accessToken || !authorUrn) {
    return {
      platform: 'linkedin',
      status: 'skipped',
      note: `Missing required environment variables: ${missing.join(', ')}.`,
    };
  }

  try {
    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Linkedin-Version': version,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: authorUrn,
        commentary: composePostText(draft, 'linkedin'),
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: 'PUBLISHED',
        isReshareDisabledByAuthor: false,
      }),
    });

    const body = await response.text();
    if (!response.ok) {
      throw new Error(body || `LinkedIn API returned ${response.status}`);
    }

    return {
      platform: 'linkedin',
      status: 'published',
      note: 'Published to LinkedIn.',
      platformPostId: response.headers.get('x-restli-id') ?? undefined,
    };
  } catch (error) {
    return {
      platform: 'linkedin',
      status: 'failed',
      note: error instanceof Error ? error.message : 'LinkedIn publish failed.',
    };
  }
}

async function publishX(draft: SocialPostDraft): Promise<PublishAttempt> {
  const accessToken = process.env.X_USER_ACCESS_TOKEN;
  const missing = missingEnv(SOCIAL_PLATFORM_CONFIGS.x.requiredEnv);

  if (missing.length > 0 || !accessToken) {
    return {
      platform: 'x',
      status: 'skipped',
      note: `Missing required environment variables: ${missing.join(', ')}.`,
    };
  }

  try {
    const response = await fetch('https://api.x.com/2/tweets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: composePostText(draft, 'x'),
      }),
    });
    const payload = (await response.json()) as XPostResponse;
    if (!response.ok || payload.errors?.length) {
      const detail = payload.errors?.map((error) => error.detail || error.title).filter(Boolean).join('; ');
      throw new Error(detail || `X API returned ${response.status}`);
    }

    return {
      platform: 'x',
      status: 'published',
      note: 'Published to X.',
      platformPostId: payload.data?.id,
    };
  } catch (error) {
    return {
      platform: 'x',
      status: 'failed',
      note: error instanceof Error ? error.message : 'X publish failed.',
    };
  }
}

const PLATFORM_PUBLISHERS: Record<SocialPlatform, (draft: SocialPostDraft) => Promise<PublishAttempt>> = {
  facebook: publishFacebook,
  instagram: publishInstagram,
  linkedin: publishLinkedIn,
  x: publishX,
};

function skippedAttempt(platform: SocialPlatform, note: string): PublishAttempt {
  return {
    platform,
    status: 'skipped',
    note,
  };
}

function applyAttemptsToQueue(
  queue: SocialPostDraft[],
  attempts: PublishAttempt[],
  approvedByRule: boolean,
): SocialPostDraft[] {
  return queue.map((draft) => {
    const attempt = attempts.find((item) => item.platform === draft.platform);
    if (!attempt) return draft;
    return {
      ...draft,
      approvalStatus: approvedByRule ? 'approved_by_rule' : draft.approvalStatus,
      publishStatus: attempt.status,
      platformPostId: attempt.platformPostId,
      publishNote: attempt.note,
    };
  });
}

export async function publishSeoAgencyRun(run: KwinSeoAgencyRun): Promise<PublishingResult> {
  const enabled = publishingEnabled();
  const approvedByRule = autoApproveEnabled();

  if (!enabled) {
    const attempts = run.socialQueue.map((draft) =>
      skippedAttempt(draft.platform, 'SOCIAL_PUBLISHING_ENABLED is not true; content was generated as a draft.'),
    );
    return {
      attempts,
      socialQueue: applyAttemptsToQueue(run.socialQueue, attempts, false),
    };
  }

  if (!approvedByRule) {
    const attempts = run.socialQueue.map((draft) =>
      skippedAttempt(draft.platform, 'SOCIAL_AUTO_APPROVE is not true; human review is required before direct publishing.'),
    );
    return {
      attempts,
      socialQueue: applyAttemptsToQueue(run.socialQueue, attempts, false),
    };
  }

  const attempts = await Promise.all(
    run.socialQueue.map(async (draft) => {
      const publisher = PLATFORM_PUBLISHERS[draft.platform];
      return publisher(draft);
    }),
  );

  return {
    attempts,
    socialQueue: applyAttemptsToQueue(run.socialQueue, attempts, true),
  };
}
