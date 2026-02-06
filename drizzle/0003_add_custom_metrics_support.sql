-- Migration: Add custom metrics and data input support
-- Created: 2026-02-06

-- Add custom metrics and data input method fields to user_profiles
ALTER TABLE user_profiles ADD COLUMN custom_metrics TEXT;
ALTER TABLE user_profiles ADD COLUMN data_input_method TEXT;

-- Create available_metrics table
CREATE TABLE IF NOT EXISTS available_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  metric_id TEXT NOT NULL UNIQUE,
  metric_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  unit TEXT,
  data_type TEXT NOT NULL,
  is_available_for_custom INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);

-- Create data_uploads table
CREATE TABLE IF NOT EXISTS data_uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_url TEXT,
  file_hash TEXT,
  upload_status TEXT DEFAULT 'processing',
  rows_processed INTEGER DEFAULT 0,
  rows_failed INTEGER DEFAULT 0,
  error_log TEXT,
  metrics_mapped TEXT,
  uploaded_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Create custom_metric_data table
CREATE TABLE IF NOT EXISTS custom_metric_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  metric_id TEXT NOT NULL,
  value TEXT NOT NULL,
  date INTEGER NOT NULL,
  notes TEXT,
  source TEXT DEFAULT 'manual',
  upload_id INTEGER,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (upload_id) REFERENCES data_uploads(id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_custom_metric_data_user_id ON custom_metric_data(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_metric_data_metric_id ON custom_metric_data(metric_id);
CREATE INDEX IF NOT EXISTS idx_custom_metric_data_date ON custom_metric_data(date);
CREATE INDEX IF NOT EXISTS idx_data_uploads_user_id ON data_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_available_metrics_category ON available_metrics(category);

-- Insert default available metrics
INSERT INTO available_metrics (metric_id, metric_name, category, description, unit, data_type, sort_order) VALUES
  -- Education Metrics
  ('enrollment', 'Youth Enrolled', 'education', 'Total participants registered in programs', 'count', 'number', 1),
  ('completion', 'Completion Rate', 'education', 'Percentage successfully completing training', 'percentage', 'percentage', 2),
  ('employment', 'Employment Rate', 'education', 'Secured employment post-training', 'percentage', 'percentage', 3),
  ('certification', 'Certification Rate', 'education', 'Achieved literacy certification', 'percentage', 'percentage', 4),
  ('rural_reach', 'Rural Reach', 'education', 'Participants from low-connectivity areas', 'percentage', 'percentage', 5),
  
  -- Human Constitution Metrics
  ('dignity_index', 'Dignity Index', 'human_constitution', 'Measure of individual dignity and self-worth', 'score', 'number', 10),
  ('maturity_index', 'Maturity Index', 'human_constitution', 'Personal development and maturity level', 'score', 'number', 11),
  ('wellbeing_score', 'Individual Wellbeing', 'human_constitution', 'Overall wellbeing assessment', 'score', 'number', 12),
  ('mental_health', 'Mental Health Score', 'human_constitution', 'Mental health and emotional wellness', 'score', 'number', 13),
  ('team_effectiveness', 'Team Effectiveness', 'human_constitution', 'Collaborative team performance', 'score', 'number', 14),
  
  -- Food Distribution Metrics
  ('food_bars_delivered', 'Food Bars Delivered', 'food', 'Total nutritional bars distributed', 'count', 'number', 20),
  ('meals_provided', 'Meals Provided', 'food', 'Equivalent meals distributed', 'count', 'number', 21),
  ('communities_served', 'Communities Served', 'food', 'Number of communities reached', 'count', 'number', 22),
  ('vulnerable_individuals', 'Vulnerable Individuals Reached', 'food', 'At-risk populations served', 'count', 'number', 23),
  
  -- Environmental Metrics
  ('ghg_emissions', 'GHG Emissions Saved', 'environmental', 'Greenhouse gas emissions reduced', 'kg CO2e', 'number', 30),
  ('water_efficiency', 'Water Efficiency', 'environmental', 'Water conservation metrics', 'liters', 'number', 31),
  ('energy_efficiency', 'Energy Efficiency', 'environmental', 'Energy usage optimization', 'kWh', 'number', 32),
  ('zero_waste', 'Zero Waste Percentage', 'environmental', 'Waste reduction achievement', 'percentage', 'percentage', 33),
  ('upcycled_ingredients', 'Upcycled Ingredients', 'environmental', 'Materials repurposed or recycled', 'count', 'number', 34),
  
  -- Social Impact Metrics
  ('jobs_created', 'Jobs Created', 'social', 'Employment opportunities generated', 'count', 'number', 40),
  ('people_trained', 'People Trained', 'social', 'Individuals receiving training', 'count', 'number', 41),
  ('partnerships', 'Partnerships Established', 'social', 'Collaborative relationships formed', 'count', 'number', 42),
  ('community_investment', 'Community Investment', 'social', 'Resources invested in communities', 'currency', 'number', 43),
  
  -- Governance Metrics
  ('donor_retention', 'Donor Retention Rate', 'governance', 'Donor relationship sustainability', 'percentage', 'percentage', 50),
  ('stakeholder_engagement', 'Stakeholder Engagement', 'governance', 'Active stakeholder participation', 'score', 'number', 51),
  ('transparency_score', 'Transparency Score', 'governance', 'Organizational transparency rating', 'score', 'number', 52);
