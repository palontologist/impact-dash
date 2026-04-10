CREATE TABLE IF NOT EXISTS "export_logs" (
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "organization_id" integer NOT NULL,
  "timestamp" integer NOT NULL DEFAULT (strftime('%s','now')),
  "commodity_type" text NOT NULL,
  "weight" real NOT NULL,
  "weight_unit" text NOT NULL,
  "transport_mode" text NOT NULL,
  "distance_km" real NOT NULL,
  "carbon_emitted" real NOT NULL,
  "status" text DEFAULT 'pending',
  "notes" text,
  "created_at" integer NOT NULL DEFAULT (strftime('%s','now')),
  "updated_at" integer NOT NULL DEFAULT (strftime('%s','now')),
  FOREIGN KEY ("organization_id") REFERENCES "user_profiles" ("id") ON DELETE cascade
);
