This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

````bash
## User Management Portal — Frontend

This repository contains the frontend for the User Management Portal, a Next.js (app router) application that provides UI for managing users, roles and basic analytics. The app uses TypeScript, React, Tailwind CSS and React Query for data fetching.

This README is intended to help a new developer get started quickly, understand the repository layout, and run the app locally.

## Quick start

Prerequisites:

- Node.js (recommended 18+)
- npm (or pnpm/yarn if you prefer)

1. Install dependencies

```bash
npm install
````

2. Copy environment file

```bash
cp .env.example .env.local
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables

Create a local environment file from `.env.example` and fill in real values for API endpoints and secrets you have access to. Do NOT commit any secrets to git.

Example variables are provided in `.env.example` (see repository root). At minimum you’ll likely need:

- NEXT_PUBLIC_API_URL - base URL for backend API (used by axios)
- NEXT_PUBLIC_AUTH_REALM (if applicable) - auth provider realm
- NEXT_PUBLIC_SENTRY_DSN (optional) - error reporting

## Scripts

Key npm scripts from `package.json`:

- npm run dev — start Next.js dev server
- npm run build — production build
- npm run start — start production server (after build)
- npm run lint — run ESLint

Run these from the repository root.

## Repository structure (high level)

- app/ — Next.js app router pages and layouts
  - (auth)/login — login page
  - dashboard — protected dashboard and pages
- components/ — shared React components (NavBar, Providers, auth UI)
- context/ — React context/providers (AuthContext)
- lib/ — helper libraries (axios instance, auth helper, date utils)
- services/ — api wrappers (userService, authService, export service)
- schemas/ — Zod schemas for validation
- types/ — TypeScript type declarations
- public/ — static assets

## Onboarding & developer workflow

1. Read the `AuthContext` (`context/AuthContext.tsx`) and `lib/axios.ts` to understand how authentication tokens are stored and how requests are made.
2. The dashboard pages live in `app/dashboard` and call services in `services/` which use `lib/axios.ts`.
3. Use the `hooks` folder under `app/dashboard/hooks/user/useUsers.ts` for examples of React Query usage.
4. Create feature branches off `main` and open PRs with a short description and screenshots for UI changes.

## Linting and types

- ESLint is configured; run `npm run lint`.
- TypeScript types are enabled. Your editor should pick them up automatically.

## Useful notes

- API client: `lib/axios.ts` exports a configured axios instance. Set `NEXT_PUBLIC_API_URL` to point to your backend.
- Environment: Use `.env.local` for local overrides. Git ignores `.env.local` by default.
- Secrets: Never commit secrets. Use `.env.example` for the required keys (safe values).

## Tests

This project currently does not include a test runner. If you add tests, prefer Jest + React Testing Library for unit tests and Playwright for e2e.

## Deployment

This app is ready to deploy to Vercel or any static hosting that supports Next.js serverless functions. Build with `npm run build` and run with `npm run start`.

## Contributing

1. Fork the repository or create a branch on the main repo.
2. Run the app and ensure lint passes.
3. Open a PR with clear description and screenshots where applicable.

## Contact

If you have questions, ask the original author or open an issue in this repository.

---
