import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionToken, SESSION_COOKIE, verifyPassword } from '@/lib/server/auth';
import { checkRateLimit, getRateLimitHeaders, hasValidCsrf, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { findUserByEmail } from '@/lib/server/data-layer';
import { withApiRoute } from '@/lib/server/api-route';

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/auth/signin',
      fallbackMessage: 'Sign-in is temporarily unavailable. Please try again.',
    },
    async () => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'auth-signin', limit: 20, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const cookieStore = await cookies();
      const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
      if (!hasValidCsrf(req, csrfCookie)) {
        return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
      }

      const body = await req.json().catch(() => ({}));
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      const password = typeof body.password === 'string' ? body.password : '';

      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }

      const user = await findUserByEmail(email);
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const ok = await verifyPassword(password, user.passwordSalt, user.passwordHash);
      if (!ok) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const token = createSessionToken(user.id, user.email, user.name);
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
    }
  );
}
