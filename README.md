This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## YouTube sync bot

Sermons, live streams, and their thumbnails are generated from the church's
YouTube channel by `scripts/sync-youtube.mjs`.

```bash
# Refresh data and thumbnails now
npm run sync:youtube
```

The script:

1. Reads the church channel (`UCM_CWE7oAziNuzpMM5-trhw`) and the sermon
   playlist (`PLKL55wk_JsMk`) from `youtube.config.json`.
2. Downloads the matching thumbnail for every video into `public/youtube/`.
3. Writes `src/data/youtube.generated.json`.
4. Keeps the last good list if YouTube returns nothing, so the site cannot be
   wiped by a failed run.

The site reads the generated file through `src/data/sermons.ts` and
`src/data/live-streams.ts`. The homepage, `/sermons`, `/live`, and
`/live/past-streams` all use this data.

### Automatic weekly run

`.github/workflows/youtube-sync.yml` runs every Sunday at **9:00 PM EAT**
(18:00 UTC) and commits the refreshed data. A push to the deployment branch
rebuilds the site, so new messages appear without manual edits.

Add an optional `YOUTUBE_API_KEY` repository secret to use the YouTube Data
API. Without the secret, the bot uses YouTube's public RSS feeds and watch
pages, which need no credentials. With the secret, set the same variable in
`.env.local` for local runs.

### Deployment notes

- The workflow assumes the project is pushed to GitHub and that a commit to the
  branch triggers the production build (Vercel, Netlify, Cloudflare Pages, etc.).
- If the site is hosted somewhere without Git-based deploys, run
  `npm run sync:youtube` from a Sunday-night cron job and rebuild after it.
- Each weekly run produces one small commit: the generated file includes a
  fresh `syncedAt` timestamp even when no new video was posted, which also
  refreshes the “streamed 2 days ago” labels.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
