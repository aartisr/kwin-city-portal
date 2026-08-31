/**
 * Provider-neutral persistence contracts.
 *
 * Domain services depend on these ports; Supabase, Postgres, DynamoDB, or a
 * file store implement them in provider-specific adapters. Keep SDK-specific
 * types out of this directory and out of domain models.
 */

export type PersistenceProviderId = "file" | "supabase" | (string & {});

export type PersistenceHealth = {
  provider: PersistenceProviderId;
  available: boolean;
  durable: boolean;
  detail?: string;
};

export interface PersistenceProvider {
  readonly id: PersistenceProviderId;
  health(): PersistenceHealth;
}

export interface Repository<
  Entity,
  Id,
  Create = Entity,
  Update = Partial<Entity>,
> {
  findById(id: Id): Promise<Entity | null>;
  create(input: Create): Promise<Entity>;
  update(id: Id, input: Update): Promise<Entity | null>;
}

/** A small, portable port for append-only operational records. */
export interface AppendOnlyRepository<Record> {
  append(record: Record): Promise<void>;
  list(options?: { limit?: number }): Promise<Record[]>;
}
