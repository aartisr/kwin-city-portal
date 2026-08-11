# KWIN City SEO Desk Automation Runbook

This document explains how to operate the SEO Desk, enable the daily Vercel cron,
and publish the generated daily article to Instagram, Facebook, LinkedIn, and X.

## Current Implementation

The repo now includes:

- Daily cron route: `/api/cron/kwin-seo-agency`
- SEO Desk dashboard: `/seo-agency`
- Latest run JSON: `/api/seo-agency/latest`
- Daily article route: `/seo-agency/articles/[slug]`
- Daily Instagram image route: `/seo-agency/articles/[slug]/instagram-image`
- RSS inclusion for the latest daily article: `/feed.xml`
- Sitemap inclusion for the latest daily article: `/sitemap.xml`
- Central config: `app/lib/seo-agency/config.ts`
- Direct publishing adapters for Instagram, Facebook, LinkedIn, and X

The system is intentionally evidence-safe. It creates high-performing daily
articles and social posts, but avoids unsupported guarantees about jobs,
investment, official endorsements, or project outcomes.

## How The Daily Job Works

1. Vercel Cron calls `/api/cron/kwin-seo-agency` once per day.
2. The job reads the OPML feeds in `public/feeds/kwin-city-news-feeds.opml`.
3. It scores KWIN relevance across news signals.
4. It creates a source-led daily article.
5. It creates social drafts for Instagram, Facebook, LinkedIn, and X.
6. It checks publishing readiness for each platform.
7. If publishing is enabled and credentials are present, it posts to each platform.
8. It stores the run in Supabase, or in the local file fallback during development.

## Production Setup Checklist

### 1. Deploy The App To Vercel

Connect this repo to Vercel and deploy the current branch.

The cron schedule is already configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/kwin-seo-agency",
      "schedule": "11 3 * * *"
    }
  ]
}
```

This runs daily at 03:11 UTC.

### 2. Configure Supabase Storage

Run the SQL in `docs/SUPABASE_SCHEMA.sql` in the Supabase SQL editor.

Then add these Vercel environment variables:

```text
KWIN_SUPABASE_URL=...
KWIN_SUPABASE_ANON_KEY=...
KWIN_SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key is required for server-side cron writes. Never expose it to
client-side code.

### 3. Configure Cron Security

Add a strong random value:

```text
CRON_SECRET=...
```

Vercel Cron will send this as:

```text
Authorization: Bearer <CRON_SECRET>
```

Local development still allows the route without the secret.

### 4. Enable Direct Publishing

Direct publishing is off by default. Turn it on only after the accounts and
permissions are ready:

```text
SOCIAL_PUBLISHING_ENABLED=true
SOCIAL_AUTO_APPROVE=true
```

`SOCIAL_AUTO_APPROVE=true` means the daily content publishes without a human
review step. Keep it false if you want the SEO Desk to generate drafts only.

## Platform Setup

### Instagram

Required Vercel environment variables:

```text
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
META_PAGE_ACCESS_TOKEN=...
```

Optional:

```text
SOCIAL_DEFAULT_IMAGE_URL=https://kwin-city.com/path-to-approved-image.jpg
```

If `SOCIAL_DEFAULT_IMAGE_URL` is not set, the system uses the generated daily
image at:

```text
/seo-agency/articles/[slug]/instagram-image
```

Meta requirements:

- Instagram account must be a professional account.
- Instagram account must be connected to the Facebook Page.
- The token must be able to create a media container and publish it.
- The generated image URL must be publicly reachable from Meta.

The adapter publishes in two steps:

1. Create media container with `image_url`, `caption`, and `alt_text`.
2. Publish that container with `media_publish`.

### Facebook

Required Vercel environment variables:

```text
META_PAGE_ID=...
META_PAGE_ACCESS_TOKEN=...
```

The adapter posts a Page feed link post to:

```text
/<META_PAGE_ID>/feed
```

The Page token must have the permissions needed to publish Page content.

### LinkedIn

Required Vercel environment variables:

```text
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_AUTHOR_URN=urn:li:organization:<organization-id>
```

Optional:

```text
LINKEDIN_VERSION=202604
```

The adapter publishes a text post with a link to the daily article through:

```text
POST https://api.linkedin.com/rest/posts
```

For organization posting, the authenticated member must have the appropriate
LinkedIn Page role and the token must include organization posting access.

### X

Required Vercel environment variable:

```text
X_USER_ACCESS_TOKEN=...
```

The adapter publishes a text post through:

```text
POST https://api.x.com/2/tweets
```

The token must be a user access token from an approved X developer app with
posting access.

## How To Use The SEO Desk Page

Open:

```text
https://kwin-city.com/seo-agency
```

Use it in this order:

1. Check `Latest run` to confirm today’s job ran.
2. Open `Read today’s full article` and review the article.
3. Check `Publishing Queue` for each platform’s generated post.
4. Check the readiness cards:
   - `ready`: the platform can auto-publish.
   - `disabled`: `SOCIAL_PUBLISHING_ENABLED` is not true.
   - `blocked`: publishing is enabled but required env vars are missing.
   - `manual`: the platform is intentionally draft-only.
5. Check `Top KWIN City News Signals` to see what influenced the article.
6. Check `Automation Health Checks` for evidence and publishing warnings.
7. If a platform says `blocked`, add the missing Vercel env vars and redeploy.
8. Trigger the cron manually once after setup to verify.

## Manual Test Commands

After deploying, test the latest run:

```bash
curl https://kwin-city.com/api/seo-agency/latest
```

Trigger the cron manually:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://kwin-city.com/api/cron/kwin-seo-agency
```

Check the generated article:

```text
https://kwin-city.com/seo-agency/articles/[slug]
```

Check the generated Instagram image:

```text
https://kwin-city.com/seo-agency/articles/[slug]/instagram-image
```

The Instagram image URL must return `image/png`.

## What To Do If A Platform Does Not Publish

Open `/seo-agency` and read the readiness card.

Common causes:

- `SOCIAL_PUBLISHING_ENABLED` is not `true`.
- `SOCIAL_AUTO_APPROVE` is not `true`.
- Platform token is missing.
- Token is expired.
- Token lacks publishing permissions.
- Instagram image URL is not publicly reachable.
- LinkedIn token does not have the required Page role.
- X app/token does not have write access.

Then open the cron JSON response and check `publishAttempts`.

## Maintenance Guide

Most changes should happen in:

```text
app/lib/seo-agency/config.ts
```

Use that file to:

- Add or remove daily topics.
- Change article paths.
- Change hashtags.
- Change platform copy formats.
- Add required env vars for a platform.
- Turn a platform on/off.

Use:

```text
app/lib/seo-agency/publisher.ts
```

only when adding or changing a platform API adapter.

Use:

```text
app/lib/seo-agency/content.ts
```

only when changing the article/content generation strategy.

## Final Production Readiness Gate

Before turning on `SOCIAL_AUTO_APPROVE=true`, run this checklist:

- The article page loads publicly.
- The Instagram image route returns `image/png`.
- `/seo-agency` shows Instagram, Facebook, LinkedIn, and X as `ready`.
- Supabase writes are working.
- The Meta token is long-lived or managed through a stable token process.
- LinkedIn and X tokens are production tokens, not temporary local tokens.
- Captions are reviewed for evidence-safe wording.
- The first week is monitored daily.

## Official API References

- Vercel Cron Jobs: https://vercel.com/docs/cron-jobs
- Meta Instagram Content Publishing: https://developers.facebook.com/docs/instagram-platform/content-publishing/
- Meta Pages API posts: https://developers.facebook.com/docs/pages-api/posts/
- LinkedIn Posts API: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- X Create Post API: https://docs.x.com/x-api/posts/manage-tweets/quickstart
