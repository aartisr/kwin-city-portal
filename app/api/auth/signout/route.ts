import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/server/auth';
import { hasValidCsrf, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/auth/signout',
      fallbackMessage: 'Sign-out is temporarily unavailable. Please try again.',
    },
    async () => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const cookieStore = await cookies();
      const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
      if (!hasValidCsrf(req, csrfCookie)) {
        return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
      }

      cookieStore.set(SESSION_COOKIE, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
      });

      return NextResponse.json({ ok: true });
    }
  );
}
