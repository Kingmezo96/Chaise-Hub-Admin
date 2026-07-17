# Chaise Hub Admin

A responsive Next.js admin dashboard for managing Chaise Hub projects, QR pass verification, attendance, partner centres, and monthly settlements.

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Add values for `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `AUTH_SECRET`.
4. Start the app with `pnpm dev` and open `http://localhost:3000`.

## Production

The application uses server-only environment variables and an HTTP-only signed session cookie. Never expose the admin password through a `NEXT_PUBLIC_` variable or commit `.env.local`.
