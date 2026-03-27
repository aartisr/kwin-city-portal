import { NextRequest, NextResponse } from 'next/server';
import { POST as authSignupPost } from '@/api/auth/signup/route';

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST /api/signup with JSON body.' },
    { status: 405 }
  );
}

export async function POST(req: NextRequest) {
  return authSignupPost(req);
}
