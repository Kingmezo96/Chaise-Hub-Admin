import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ authenticated }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
