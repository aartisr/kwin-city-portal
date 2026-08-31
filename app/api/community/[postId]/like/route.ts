import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { incrementPostLikes } from '@/lib/server/data-layer';

export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'community-like', limit: 80, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const { postId } = await params;
  const likes = await incrementPostLikes(postId);

  if (likes === 0) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  return NextResponse.json({ likes });
}
