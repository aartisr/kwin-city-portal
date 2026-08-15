# Database Operations Guide

This guide is the operational reference for KWIN City Portal persistence: what is stored, how it is protected, and how to configure or replace the database provider.

## At a glance

The application uses a **ports-and-adapters** persistence design:

```text
API routes and domain services
        ↓
provider-neutral repository contracts
        ↓
Supabase/PostgreSQL adapter  |  local JSON fallback
```

The domain layer owns business records; a provider adapter owns database SDK calls, SQL dialect details, indexes, and access-control policies. This keeps a database migration bounded to a new adapter rather than a rewrite of the application.

| Environment        | Recommended provider                                                 | Durability          |
| ------------------ | -------------------------------------------------------------------- | ------------------- |
| Local development  | `file`                                                               | Local only          |
| Preview deployment | `supabase`                                                           | Durable             |
| Production         | `supabase`                                                           | Durable             |
| Future provider    | A new adapter implementing `app/lib/server/persistence/contracts.ts` | Depends on provider |

The file fallback is useful for local development but is **not durable on Vercel or other serverless hosts**. A deployment may start on a new filesystem at any time.

## Source of truth and migration workflow

All schema-changing SQL is tracked in [`supabase/migrations/`](../supabase/migrations). Apply files in their lexicographic order; do not edit a migration after it has been used in a shared environment.

| Path                                                                                                                        | Purpose                                                           |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`supabase/migrations/0001_initial_schema.sql`](../supabase/migrations/0001_initial_schema.sql)                             | Initial production schema, indexes, validation, triggers, and RLS |
| [`supabase/migrations/0002_social_publish_deduplication.sql`](../supabase/migrations/0002_social_publish_deduplication.sql) | At-most-once social publication ledger and service-role RPC       |
| [`supabase/seed.sql`](../supabase/seed.sql)                                                                                 | Optional local/demo discussion data                               |
| [`supabase/README.md`](../supabase/README.md)                                                                               | Short migration conventions                                       |
| [`scripts/verify-supabase-migrations.mjs`](../scripts/verify-supabase-migrations.mjs)                                       | CI-safe migration naming and presence check                       |

Create each change as a new file using the next unused number, for example
`0003_add_article_bookmarks.sql`. The matching application change should update
the relevant repository adapter and tests in the same pull request.

Run this before committing a schema change:

```bash
npm run db:verify:migrations
```

## Data inventory

The following tables are created by the initial migration. No table is exposed to browser clients through Row Level Security policies.

| Table                           | Purpose                            | Sensitive fields                    | Retention/operational note                                                         |
| ------------------------------- | ---------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------- |
| `users`                         | Portal account records             | Email, password hash, password salt | Retain only while account is active; password material is hashed, never plaintext. |
| `user_preferences`              | Personalised portal preferences    | Email and preference profile        | Deleted automatically when its `users` record is deleted.                          |
| `discussion_posts`              | Community discussion posts         | Author-provided content             | Publicly displayable content; moderation policy should govern retention.           |
| `discussion_replies`            | Replies to a discussion post       | Author-provided content             | Deleted automatically when the parent post is deleted.                             |
| `newsletter_signups`            | Newsletter interest registrations  | Email, name, interests              | Obtain consent before adding; provide a documented unsubscribe/deletion path.      |
| `seo_agency_runs`               | Generated SEO operations snapshots | Generated content and metadata      | Managed by the scheduled SEO workflow; contains JSON payloads.                     |
| `social_publish_reservations`   | Atomic social publication ledger   | Source URLs and provider post IDs   | Service-role only; retained to prevent cross-run duplicate publication.            |
| `value_add_alert_subscriptions` | User alert subscriptions           | Email, topic/geographic preferences | Status changes to `inactive`; design a deletion process when required.             |
| `value_add_export_jobs`         | Requests for generated exports     | Filter criteria and download URL    | Jobs have optional expiry timestamps; purge expired records periodically.          |
| `value_add_opportunity_leads`   | Opportunity-exchange submissions   | Name, email, request details        | Treat as confidential business-contact data; limit staff access.                   |

### Record relationships

```text
users.email ──< user_preferences.email
discussion_posts.id ──< discussion_replies.post_id
```

Both relationships use `ON DELETE CASCADE`, so dependent preferences and replies do not become orphaned.

### Data validation and performance controls

- Required fields, uniqueness, foreign keys, and status/persona constraints are enforced in SQL.
- A shared `set_updated_at()` trigger maintains `updated_at` consistently for mutable records.
- Indexes support email lookups, chronological reads, parent-post reply reads, operational-run history, and value-add workflow queries.
- `increment_post_likes(post_id)` performs the like increment atomically in PostgreSQL.

## Security model

Row Level Security (RLS) is enabled on every application table. The initial migration intentionally creates **no anonymous or public policies**. This means browser clients cannot directly query the database; application API routes validate requests and use a server-only Supabase service-role key.

When bootstrapping an older project that used the previous schema script, the migration removes its named public policies before enabling this model. Review any custom policies before applying it if you deliberately added your own direct-client access.

Never expose `KWIN_SUPABASE_SERVICE_ROLE_KEY` in browser code, `NEXT_PUBLIC_*` variables, commits, logs, screenshots, or support tickets. It bypasses RLS and must be stored only in the hosting provider’s encrypted server environment.

The anonymous key is optional for legacy server paths, but production persistence should use the service-role key. If it is absent, the app can fall back to local files; on serverless hosting that fallback is not a durable database.

Before production launch, also establish:

1. A privacy notice that identifies newsletter, account, alert, and lead data collection.
2. A documented data-subject request and account-deletion process.
3. Least-privilege Supabase project access for operators.
4. A tested backup and recovery procedure.

## Configuration

Copy the relevant values into `.env.local` for local work, or into your hosting provider’s encrypted environment-variable settings for deployments.

```bash
# Select the durable production provider.
KWIN_PERSISTENCE_PROVIDER=supabase

# Supabase project endpoint.
KWIN_SUPABASE_URL=https://your-project-ref.supabase.co

# Optional for legacy server paths. Do not expose to browsers unnecessarily.
KWIN_SUPABASE_ANON_KEY=your-anon-key

# Required for production server-side writes to the RLS-protected schema.
KWIN_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

For local fallback mode, omit the Supabase values or choose:

```bash
KWIN_PERSISTENCE_PROVIDER=file
```

The fallback stores development data below `.data/`; it should not be treated as a production database or committed to source control.

## First-time Supabase setup

1. Create a Supabase project in the region nearest to the application’s users.
2. In **SQL Editor**, apply every file in `supabase/migrations/` in numeric order.
3. Optionally apply `supabase/seed.sql` in a local/demo project only.
4. Copy the Project URL, anonymous key, and service-role key from **Project Settings → API**.
5. Configure the environment variables above locally and in Vercel for **Production**, **Preview**, and **Development** as appropriate.
6. Redeploy the application after changing Vercel variables.
7. Confirm the configured provider and run a smoke flow that creates and retrieves a safe test record.

For future migrations, use the Supabase CLI’s `supabase db push` after linking the intended project, or apply the next ordered SQL file through the SQL Editor. Do not apply seed data to production automatically.

## Backup, recovery, and maintenance

- Use Supabase’s managed backups and Point-in-Time Recovery according to your selected plan; verify the retention period meets organisational requirements.
- Before a destructive migration, take a logical backup and rehearse restoration in a non-production project.
- Periodically purge expired `value_add_export_jobs` records and define approved retention periods for signups and opportunity leads.
- Review database roles, API keys, and RLS configuration at least quarterly and after any staff/access change.
- Monitor schema migration history alongside deployment history. A deployment must not rely on a table or column before its migration has reached that environment.

## Adding another database provider

1. Keep domain types and application-facing repository interfaces provider-neutral in [`app/lib/server/persistence/contracts.ts`](../app/lib/server/persistence/contracts.ts).
2. Create a provider adapter, for example `app/lib/server/persistence/providers/postgres/`, that implements the relevant repository ports.
3. Put provider-specific schema/DDL in a dedicated tracked directory such as `database/postgres/migrations/`; do not mix it with Supabase RLS SQL.
4. Wire provider selection through `KWIN_PERSISTENCE_PROVIDER` and preserve the file adapter as an explicit development fallback.
5. Add contract tests that run against every provider, plus integration tests for its database engine.
6. Run a dual-read or backfill migration and validate record counts/checksums before switching production traffic.

This approach keeps changes explicit, testable, and reversible. Do not make a provider switch by changing domain service code to call a database SDK directly.
