import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { createSessionToken, hashPassword, SESSION_COOKIE } from '@/lib/server/auth';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { createUser, findUserByEmail } from '@/lib/server/data-layer';
import type { UserRecord } from '@/lib/server/models';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'auth-signup', limit: 10, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'Account already exists for this email.' }, { status: 409 });
  }

  const creds = await hashPassword(password);
  const user: UserRecord = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: creds.hash,
    passwordSalt: creds.salt,
    createdAt: new Date().toISOString(),
  };

  await createUser(user);

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
