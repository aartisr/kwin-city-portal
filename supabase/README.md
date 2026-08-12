# Database migrations

`migrations/` is the authoritative, tracked schema history for the KWIN City Portal. The SQL targets PostgreSQL and is directly compatible with Supabase.

## Apply a new environment

1. Apply migration files in lexicographic order in the Supabase SQL Editor, starting with `0001_initial_schema.sql`.
2. Optionally apply `seed.sql` only for local or demonstration data.
3. Configure `KWIN_PERSISTENCE_PROVIDER=supabase`, `KWIN_SUPABASE_URL`, and the server-only `KWIN_SUPABASE_SERVICE_ROLE_KEY`.

If the Supabase CLI is installed and linked to the target project, use `supabase db push`; it applies the same migration directory and records migration history.

## Change discipline

- Never edit an applied migration. Add `0002_descriptive_change.sql`, then update the domain model and its repository adapter.
- Keep application code dependent on domain repository ports, not on database SDK types.
- Keep provider-specific SQL, RLS policies, and indexes here. This isolates Supabase/Postgres details from the business layer and makes a future database adapter a bounded change.
- Run `npm run db:verify:migrations` before committing a schema change.

`docs/SUPABASE_SCHEMA.sql` is retained only as a pointer for older documentation; do not use it as a second schema source.
