CREATE TABLE IF NOT EXISTS participant_records (
  study_key TEXT NOT NULL,
  participant_id TEXT NOT NULL,
  student_id TEXT,
  participant_name TEXT,
  class_name TEXT,
  variant TEXT NOT NULL CHECK (variant IN ('A','B')),
  status TEXT NOT NULL,
  started_at TEXT,
  impression_at TEXT,
  clicked_at TEXT,
  completed_at TEXT,
  click_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (study_key, participant_id)
);
CREATE INDEX IF NOT EXISTS idx_p207_variant ON participant_records(study_key, variant);
