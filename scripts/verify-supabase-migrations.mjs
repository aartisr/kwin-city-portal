import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const migrationsDirectory = path.join(process.cwd(), "supabase", "migrations");
const migrationName = /^\d{4}_[a-z0-9][a-z0-9_-]*\.sql$/;

const files = (await readdir(migrationsDirectory))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  throw new Error(
    "No Supabase migrations found. Add a migration to supabase/migrations/.",
  );
}

for (const file of files) {
  if (!migrationName.test(file)) {
    throw new Error(
      `Invalid migration name: ${file}. Use NNNN_descriptive_name.sql.`,
    );
  }

  const sql = await readFile(path.join(migrationsDirectory, file), "utf8");
  if (!sql.trim()) throw new Error(`Migration is empty: ${file}`);
}

if (!files[0].startsWith("0001_")) {
  throw new Error(
    `The first migration must begin with 0001_; found ${files[0]}.`,
  );
}

console.log(
  `Verified ${files.length} Supabase migration${files.length === 1 ? "" : "s"}.`,
);
