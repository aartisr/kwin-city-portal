import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getSessionFromCookie } from '@/lib/server/auth';
import { validateBody, validateTitle } from '@/lib/server/community';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { getAllPosts, createPost } from '@/lib/server/data-layer';
import type { DiscussionPost } from '@/lib/server/models';

export async function GET() {
  const posts = await getAllPosts();
  const sorted = [...posts].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return NextResponse.json({ posts: sorted });
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'community-post', limit: 20, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Sign in required to post.' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const text = typeof body.text === 'string' ? body.text.trim() : '';

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

  await createPost(next);

  return NextResponse.json({ post: next });
}
