import { NextRequest, NextResponse } from 'next/server';
import { POST as authSigninPost } from '@/api/auth/signin/route';

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST /api/signin with JSON body.' },
    { status: 405 }
  );
}

export async function POST(req: NextRequest) {
  return authSigninPost(req);
}
