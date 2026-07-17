import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'chaise_admin_session';

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function signatureFor(username) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return '';
  return createHmac('sha256', secret).update(username).digest('base64url');
}

export function validateCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) return false;
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

export function createSessionToken(username) {
  const encodedUsername = Buffer.from(username).toString('base64url');
  return `${encodedUsername}.${signatureFor(username)}`;
}

export function verifySessionToken(token) {
  if (!token || !process.env.AUTH_SECRET) return false;
  const [encodedUsername, suppliedSignature] = token.split('.');
  if (!encodedUsername || !suppliedSignature) return false;
  try {
    const username = Buffer.from(encodedUsername, 'base64url').toString();
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedSignature = signatureFor(username);
    return Boolean(expectedUsername) && safeEqual(username, expectedUsername) && safeEqual(suppliedSignature, expectedSignature);
  } catch {
    return false;
  }
}
