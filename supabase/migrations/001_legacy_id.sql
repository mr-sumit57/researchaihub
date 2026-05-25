-- Run if you already applied schema.sql without legacy_id
ALTER TABLE tools ADD COLUMN IF NOT EXISTS legacy_id TEXT UNIQUE;
