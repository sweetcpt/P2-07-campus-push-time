ALTER TABLE participant_records ADD COLUMN impression_at TEXT;
ALTER TABLE participant_records ADD COLUMN clicked_at TEXT;
ALTER TABLE participant_records ADD COLUMN click_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE participant_records ADD COLUMN student_id TEXT;
ALTER TABLE participant_records ADD COLUMN participant_name TEXT;
ALTER TABLE participant_records ADD COLUMN class_name TEXT;
