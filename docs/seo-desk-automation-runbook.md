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
- Atomic cross-run deduplication in `social_publish_reservations`
- Fail-closed handling for timeouts and uncertain provider responses

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
7. It validates platform credentials and media before reserving a post.
8. It atomically reserves the publication subject separately for each platform.
9. If publishing is enabled and the reservation is new, it posts through the platform adapter.
10. It records the provider result and returned post ID in Supabase.
11. It stores the complete run in Supabase, or in the local file fallback during development.

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

Apply every migration in `supabase/migrations/` in numeric order. A new project
needs both `0001_initial_schema.sql` and
`0002_social_publish_deduplication.sql`. The second migration creates the
atomic reservation table and service-role-only RPC used before every provider
call.

Then add these Vercel environment variables:

```text
KWIN_SUPABASE_URL=...
KWIN_SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key is required for server-side cron writes and social
reservations. The anon key is not required by this server-side workflow. Never
expose the service-role key through `NEXT_PUBLIC_*` or client-side code.

Verify the migration files locally with:

```bash
npm run db:verify:migrations
```

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

Optional provider timeout:

```text
SOCIAL_REQUEST_TIMEOUT_MS=25000
```

The default is 25 seconds. A transport error or timeout is treated as
`indeterminate`, because the provider may have accepted the post even though
the response was lost.

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

## Deduplication And Delivery Semantics

Social APIs do not provide a portable exactly-once transaction with Supabase.
This implementation therefore chooses the safer **at-most-once, fail-closed**
model:

1. `acquire_social_publish_reservation` atomically inserts a unique
   `(platform, fingerprint)` reservation before contacting a provider.
2. Concurrent runs cannot acquire the same platform and publication subject.
3. External news is deduplicated by its canonical source URL. Common tracking
   parameters and URL fragments are ignored.
4. Evergreen KWIN content is deduplicated by topic and calendar month.
5. Each platform has its own fingerprint, so one platform's post does not block
   another platform.
6. Reservations are never reclaimed automatically. A timeout could mean that
   the provider published the post but its response was lost.

Reservation statuses:

| Status          | Meaning                                                        | Automatic retry |
| --------------- | -------------------------------------------------------------- | --------------- |
| `reserved`      | Provider work started or the process stopped before completion | No              |
| `published`     | Provider confirmed publication                                 | No              |
| `failed`        | Provider explicitly rejected the request                       | No              |
| `indeterminate` | Network/timeout outcome is unknown                             | No              |

`skipped` is a run-level result, not a reservation status. It means publishing
was disabled, approval/configuration was missing, storage was unavailable, or
the subject already had a reservation.

### Safe Manual Recovery

Never delete or modify a reservation merely to make a red workflow green.
For `reserved` or `indeterminate` records:

1. Check the platform account and provider logs for the post.
2. If it exists, update the audit row with its provider post ID and
   `status='published'`.
3. If it definitely does not exist, create a deliberately reviewed new content
   version whose publication subject/fingerprint is different.
4. Record the operator, reason, and evidence in the change or incident record.

There is intentionally no automatic retry or lease reclamation. This prevents
a delayed or lost provider response from producing duplicate public posts.

If a provider confirms publication but the Supabase audit update fails, the run
still reports the provider result and warns that audit persistence failed. The
original reservation remains held, so a later cron cannot duplicate the post.

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
app/lib/seo-agency/publish-deduplication.ts
```

only when changing publication identity or idempotency semantics. Keep platform
API details out of this module.

Use:

```text
supabase/migrations/0002_social_publish_deduplication.sql
```

for the durable reservation contract. Database changes must be introduced in a
new numbered migration after this migration has reached production.

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
- Both Supabase migrations are applied.
- The service role can execute `acquire_social_publish_reservation`.
- Anonymous and authenticated roles cannot read or mutate reservation rows.
- The Meta token is long-lived or managed through a stable token process.
- LinkedIn and X tokens are production tokens, not temporary local tokens.
- Timeout and `indeterminate` alerts have an assigned human owner.
- Captions are reviewed for evidence-safe wording.
- The first week is monitored daily.

## Official API References

- Vercel Cron Jobs: https://vercel.com/docs/cron-jobs
- Meta Instagram Content Publishing: https://developers.facebook.com/docs/instagram-platform/content-publishing/
- Meta Pages API posts: https://developers.facebook.com/docs/pages-api/posts/
- LinkedIn Posts API: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- X Create Post API: https://docs.x.com/x-api/posts/manage-tweets/quickstart
