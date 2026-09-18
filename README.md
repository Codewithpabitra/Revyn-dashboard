# Revyn — Dashboard

Next.js dashboard for Revyn, an AI-powered pull request reviewer. Users sign in, connect their GitHub account via the Revyn GitHub App, and see a history of AI-reviewed pull requests.

Live: https://revyn-dev.vercel.app
Server/API: https://revyn-server.onrender.com

## Tech stack

- **Framework**: Next.js (App Router, TypeScript, Tailwind CSS)
- **Auth**: Clerk
- **Icons**: Tabler Icons
- **Font**: Inter
- **Hosting**: Vercel

## Structure

\`\`\`
src/app/
  (public)/           # unauthenticated routes
    page.tsx           # landing page
    sign-in/
    sign-up/
  (dashboard)/         # authenticated routes (protected via resource-based auth checks)
    layout.tsx          # checks auth(), redirects to /sign-in if unauthenticated
    dashboard/
      page.tsx           # review history, connect GitHub CTA
  api/
    github/setup/       # GitHub App installation callback
\`\`\`

Public and authenticated routes are separated using route groups; access control is enforced per-layout via Clerk's `auth()` helper rather than middleware path-matching (per Clerk's current recommended pattern).

## Local setup

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment variables

Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
SERVER_URL=http://localhost:4000
\`\`\`

### 3. Run
\`\`\`bash
npm run dev
\`\`\`

## How "Connect GitHub" works

1. User clicks **Connect GitHub**, which links to the GitHub App's install URL
2. After installing, GitHub redirects to `/api/github/setup?installation_id=...`
3. That route calls the server's `POST /api/installations` with the Clerk user ID and installation ID
4. The server resolves the GitHub account/org login via Octokit and stores the mapping in Postgres
5. User lands back on `/dashboard`, which fetches their review history from the server

## Deployment

Deployed on Vercel, connected directly to this repo for automatic deploys on push to `main`.

Set `SERVER_URL` to the deployed server's URL in Vercel's environment variables, and use Clerk's **production** instance keys (not development/test keys) once live.