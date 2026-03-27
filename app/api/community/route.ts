import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getSessionFromCookie } from '@/lib/server/auth';
import { validateBody, validateTitle } from '@/lib/server/community';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { getAllPosts, createPost } from '@/lib/server/data-layer';
import { sanitizeTitle, sanitizeBody } from '@/lib/sanitizer';
import { logger } from '@/lib/logger';
import type { DiscussionPost } from '@/lib/server/models';

export async function GET() {
  const requestId = crypto.randomUUID();
  logger.logRequest('GET', '/api/community', requestId);

  try {
    const posts = await getAllPosts();
    const sorted = [...posts].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );

    logger.logResponse('GET', '/api/community', 200, 0, requestId);
    return NextResponse.json({ posts: sorted });
  } catch (error) {
    logger.error('Failed to fetch community posts', error as Error, {}, requestId);
    return NextResponse.json(
      { error: 'Failed to load community posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  logger.logRequest('POST', '/api/community', requestId);

  if (!isSameOrigin(req)) {
    logger.logSecurity('csrf-fail', { requestId, reason: 'invalid-origin' });
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'community-post', limit: 20, windowMs: 60_000 })) {
    logger.logSecurity('rate-limit', { requestId, endpoint: '/api/community' });
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    logger.logSecurity('csrf-fail', { requestId });
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const session = await getSessionFromCookie();
  if (!session) {
    logger.logAuth('signin', undefined, false, 'not-authenticated');
    return NextResponse.json({ error: 'Sign in required to post.' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rawTitle = typeof body.title === 'string' ? body.title.trim() : '';
  const rawText = typeof body.text === 'string' ? body.text.trim() : '';

  // Sanitize inputs to prevent XSS
  const title = sanitizeTitle(rawTitle);
  if (!title) {
    logger.warn('Invalid post title', { requestId, userId: session.uid });
    return NextResponse.json(
      { error: 'Title must be between 3 and 200 characters' },
      { status: 400 }
    );
  }

  const text = sanitizeBody(rawText);
  if (!text) {
    logger.warn('Invalid post body', { requestId, userId: session.uid });
    return NextResponse.json(
      { error: 'Description must be between 10 and 5000 characters' },
      { status: 400 }
    );
  }

  // Additional validation
  const titleError = validateTitle(title);
  if (titleError) {
    return NextResponse.json({ error: titleError }, { status: 400 });
  }

  const bodyError = validateBody(text);
  if (bodyError) {
    return NextResponse.json({ error: bodyError }, { status: 400 });
  }

  const next: DiscussionPost = {
    id: `p-${crypto.randomUUID()}`,
    author: session.name,
    title,
    text,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
  };

  try {
    await createPost(next);
    logger.logResponse('POST', '/api/community', 201, 0, requestId);
    return NextResponse.json({ post: next });
  } catch (error) {
    logger.error('Failed to create community post', error as Error, { userId: session.uid }, requestId);
    return NextResponse.json(
      { error: 'Failed to create post. Please try again.' },
      { status: 500 }
    );
  }
}
