import { NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE, validateCredentials } from '@/lib/auth';

export async function POST(request) {
  let credentials;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const username = typeof credentials.username === 'string' ? credentials.username.trim() : '';
  const password = typeof credentials.password === 'string' ? credentials.password : '';

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
