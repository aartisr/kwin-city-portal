# KWIN City Portal - Supabase Backend Setup Guide

## Overview

The KWIN City Portal now supports two data storage backends:

1. **File-Based Storage (Default)** - Ideal for development and self-hosted deployments
2. **Supabase Backend (Recommended for Production/Serverless)** - Ideal for production, cloud deployments, and serverless environments like Netlify

The system automatically detects which backend to use based on environment variables and gracefully falls back to file-based storage if Supabase is not configured.

## Quick Start: Using File-Based Storage (Development)

If you're just developing locally, you don't need to do anything. The app will use file-based storage in the `.data/` directory by default, and there's no configuration required. Just run:

```bash
npm run dev
```

## Production Setup: Migrating to Supabase

### Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com) and sign in or create an account
2. Click "New Project" and fill in:
   - **Project Name**: `kwin-city-portal` (or your preferred name)
   - **Database Password**: Generate a strong password (you won't need it after setup)
   - **Region**: Choose the region closest to your users
3. Wait for the project to be created (2-3 minutes)

### Step 2: Create Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the entire contents of [docs/SUPABASE_SCHEMA.sql](../SUPABASE_SCHEMA.sql)
4. Click **Run** and wait for the tables to be created

Alternatively, copy-paste individual table creation commands if the full script doesn't work.

### Step 3: Get Your Credentials

1. In your Supabase project, go to **Settings** → **API** (left sidebar)
2. You'll see two keys:
   - **Project URL**: Copy this (something like `https://abcdefgh.supabase.co`)
   - **anon public key**: Copy this (a long string starting with `eyJ...`)

**⚠️ Never share these credentials publicly**, but the `anon public key` is safe for client-side use (it has Row Level Security restrictions).

### Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Authentication secret (generate a random 32-byte hex string)
KWIN_AUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Supabase credentials (from Step 3)
KWIN_SUPABASE_URL=https://your-project.supabase.co
KWIN_SUPABASE_ANON_KEY=your-anon-key-here
```

Or set these environment variables in your deployment platform:
- **Netlify**: Site settings → Build & deploy → Environment
- **Vercel**: Project settings → Environment Variables
- **Railway**: Project settings → Variables
- **Render**: Environment → Environment Variables

### Step 5: (Optional) Seed Initial Data

The schema file includes seed posts. If you want to add more data or different seed data:

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Paste your INSERT statements to add posts or users

Example:
```sql
INSERT INTO discussion_posts (id, author, title, text, likes, created_at)
VALUES (
  'p-intro',
  'Welcome Bot',
  'Welcome to KWIN Community!',
  'Share your thoughts about North Bengaluru here.',
  0,
  NOW()
);
```

### Step 6: Deploy

Your Next.js app will now automatically use Supabase if the environment variables are set. Deploy normally:

```bash
# For Netlify
netlify deploy

# For Vercel
vercel deploy

# For other platforms, set KWIN_SUPABASE_URL and KWIN_SUPABASE_ANON_KEY in their dashboards
```

## Architecture: Fallback System

The data layer (`app/lib/server/data-layer.ts`) automatically handles the fallback:

1. **On initialization**: Checks if `KWIN_SUPABASE_URL` and `KWIN_SUPABASE_ANON_KEY` are set
2. **If Supabase is configured**: Uses Supabase PostgreSQL database
3. **If Supabase fails or is not configured**: Falls back to file-based storage in `.data/`
4. **Error handling**: All database errors are caught and logged; the app continues to work using fallback storage

**Important for Netlify/Vercel**:
- File-based storage (`.data/` directory) is **ephemeral** — data will be lost when deployments restart
- Use Supabase for production deployments
- Rate limiting is in-memory and won't work across multiple function instances — consider Upstash Redis for distributed rate limiting (see Advanced Setup below)

## Advanced Setup: Distributed Rate Limiting with Upstash Redis

For serverless deployments (Netlify, Vercel) with high traffic, you should use Upstash Redis for distributed rate limiting instead of in-memory storage.

### 1. Create an Upstash Redis Instance

1. Go to [https://upstash.com/](https://upstash.com/)
2. Sign in or create an account
3. Create a new Redis database
4. Copy the **REST URL** and **REST Token**

### 2. Add Environment Variables

```bash
UPSTASH_REDIS_REST_URL=your-redis-rest-url
UPSTASH_REDIS_REST_TOKEN=your-redis-rest-token
```

### 3. Update Rate Limiting (Optional Enhancement)

Currently, the app uses in-memory rate limiting. To switch to Redis-backed rate limiting, you'd need to update `app/lib/server/security.ts` to use Upstash client:

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function isRateLimited(
  req: NextRequest,
  opts: { scope: string; limit: number; windowMs: number }
): Promise<boolean> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const key = `rl:${opts.scope}:${ip}`;
  
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, Math.ceil(opts.windowMs / 1000));
  }
  
  return current > opts.limit;
}
```

This is optional — the current setup works fine for most use cases.

## Monitoring & Debugging

### Check Which Backend is Active

Add this to a test API route to verify:

```typescript
import { isSupabaseConfigured } from '@/lib/server/supabase-client';

export async function GET() {
  const using = isSupabaseConfigured() ? 'Supabase' : 'File-Based Storage';
  return NextResponse.json({ backend: using });
}
```

### View Database Logs

**Supabase**:
- Go to **Logs** → **Postgres Logs** in your Supabase dashboard
- Or **Logs** → **Edge Functions** if using Supabase Edge Functions

**File-Based Storage**:
- Check the `.data/` directory for JSON files
- Each file corresponds to a data store: `users.json`, `preferences.json`, `community.json`

### Common Issues

| Issue | Solution |
|-------|----------|
| "Supabase not configured" in logs | Check that `KWIN_SUPABASE_URL` and `KWIN_SUPABASE_ANON_KEY` are set in `.env.local` or deployment platform |
| "Data disappears on Netlify" | You're using file-based storage on ephemeral file system. Switch to Supabase (see Step 3-4) |
| "CORS error from Supabase" | Make sure your Row Level Security policies are configured correctly (they should be open for public reads based on the schema) |
| "Authentication fails" | Verify `KWIN_AUTH_SECRET` is set and consistent across deployments |

## Migration from File-Based to Supabase

If you already have data in file-based storage and want to migrate to Supabase:

1. **Export file data**: Read `users.json`, `preferences.json`, `community.json` from `.data/`
2. **Format data**: Transform to match Supabase schema (Column names use snake_case)
3. **Import**: Use Supabase **Table Editor** → **Import Data** or SQL INSERT statements
4. **Enable Supabase**: Set environment variables and redeploy
5. **Verify**: Check that data is readable from the new backend

Example migration SQL:
```sql
-- If you have existing file data exported as JSON
INSERT INTO users (id, name, email, password_hash, password_salt, created_at)
VALUES 
  ('user-1', 'John Doe', 'john@example.com', 'hash...', 'salt...', NOW()),
  ('user-2', 'Jane Smith', 'jane@example.com', 'hash...', 'salt...', NOW());
```

## Security Considerations

- **Supabase API Keys**: Only use the `anon` key (public key) in the frontend. Never expose the `service_role` key
- **Row Level Security**: The default schema allows public reads but restricted writes (enforced at API layer, not RLS)
- **CSRF Protection**: Enabled by default on all write endpoints
- **Session Tokens**: Signed with `KWIN_AUTH_SECRET` — make it strong and unique
- **Password Hashing**: Uses scrypt with 64-byte derived keys (cryptographically secure)

## Rollback: Switching Back to File-Based Storage

If you need to switch back to file-based storage:

1. **Remove environment variables**: Delete `KWIN_SUPABASE_URL` and `KWIN_SUPABASE_ANON_KEY`
2. **Redeploy**: The app will automatically fall back to file-based storage
3. **Note**: You may need to re-add data if it was only in Supabase

## Support & Resources

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **PostgreSQL Docs**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **KWIN Architecture**: See [ARCHITECTURE.md](../ARCHITECTURE.md)

## Testing the Backend

```bash
# Test file-based storage (remove KWIN_SUPABASE_URL and KWIN_SUPABASE_ANON_KEY)
npm run dev

# Test Supabase backend (set environment variables)
export KWIN_SUPABASE_URL=your-url
export KWIN_SUPABASE_ANON_KEY=your-key
npm run dev

# Run the build to verify both work
npm run build
npm start
```
