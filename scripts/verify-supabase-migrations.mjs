import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const migrationsDirectory = path.join(process.cwd(), "supabase", "migrations");
const migrationName = /^\d{4}_[a-z0-9][a-z0-9_-]*\.sql$/;
const securityDefiner = /SECURITY\s+DEFINER/gi;
const pinnedSearchPath = /SET\s+search_path\s*=\s*[a-z_][a-z0-9_]*(?:\s*,\s*[a-z_][a-z0-9_]*)*/i;

const files = (await readdir(migrationsDirectory))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  throw new Error(
    "No Supabase migrations found. Add a migration to supabase/migrations/.",
  );
}

for (const [index, file] of files.entries()) {
  if (!migrationName.test(file)) {
    throw new Error(
      `Invalid migration name: ${file}. Use NNNN_descriptive_name.sql.`,
    );
  }

  const sql = await readFile(path.join(migrationsDirectory, file), "utf8");
  if (!sql.trim()) throw new Error(`Migration is empty: ${file}`);

  const expectedOrdinal = String(index + 1).padStart(4, "0");
  const actualOrdinal = file.slice(0, 4);
  if (actualOrdinal !== expectedOrdinal) {
    throw new Error(
      `Migration sequence must be continuous: expected ${expectedOrdinal}_ but found ${file}.`,
    );
  }

  const definerCount = [...sql.matchAll(securityDefiner)].length;
  const searchPathCount = [...sql.matchAll(new RegExp(pinnedSearchPath.source, "gi"))].length;
  if (definerCount > searchPathCount) {
    throw new Error(
      `Every SECURITY DEFINER function must pin search_path: ${file} has ${definerCount} function(s) and ${searchPathCount} pinned path(s).`,
    );
  }
}

console.log(
  `Verified ${files.length} Supabase migration${files.length === 1 ? "" : "s"}.`,
);
