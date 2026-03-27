import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionFromCookie } from '@/lib/server/auth';
import { createCsrfToken, CSRF_COOKIE } from '@/lib/server/security';

export async function GET() {
  const cookieStore = await cookies();
  let csrf = cookieStore.get(CSRF_COOKIE)?.value;

  if (!csrf) {
    csrf = createCsrfToken();
    cookieStore.set(CSRF_COOKIE, csrf, {
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
  }

  const session = await getSessionFromCookie();
  return NextResponse.json({
    user: session
      ? {
          id: session.uid,
          name: session.name,
          email: session.email,
        }
      : null,
    csrf,
  });
}
