import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getSessionFromCookie } from '@/lib/server/auth';
import { validateBody } from '@/lib/server/community';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { getPostById, addReplyToPost } from '@/lib/server/data-layer';
import { sanitizeBody } from '@/lib/sanitizer';

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'community-reply', limit: 40, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Sign in required to reply.' }, { status: 401 });
  }

  const { postId } = await params;
  const body = await req.json().catch(() => ({}));
  const rawText = typeof body.text === 'string' ? body.text.trim() : '';

  // Sanitize input to prevent XSS
  const text = sanitizeBody(rawText, 5, 1000); // Replies can be shorter
  if (!text) {
    return NextResponse.json(
      { error: 'Reply must be between 5 and 1000 characters' },
      { status: 400 }
    );
  }

  const bodyError = validateBody(text);
  if (bodyError) {
    return NextResponse.json({ error: bodyError }, { status: 400 });
  }

  const post = await getPostById(postId);
  if (!post) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  const reply = {
    id: `r-${crypto.randomUUID()}`,
    author: session.name,
    text,
    createdAt: new Date().toISOString(),
  };

  await addReplyToPost(postId, reply);

  return NextResponse.json({ reply });
}
