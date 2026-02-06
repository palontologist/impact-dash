-- Migration: Add company details, governance, and goals to user_profiles table
-- This migration adds fields for company information and sustainability goals

ALTER TABLE user_profiles ADD COLUMN company_description TEXT;
ALTER TABLE user_profiles ADD COLUMN company_size TEXT;
ALTER TABLE user_profiles ADD COLUMN website TEXT;
ALTER TABLE user_profiles ADD COLUMN headquarters TEXT;
ALTER TABLE user_profiles ADD COLUMN founded_year INTEGER;
ALTER TABLE user_profiles ADD COLUMN governance_structure TEXT;
ALTER TABLE user_profiles ADD COLUMN sustainability_officer TEXT;
ALTER TABLE user_profiles ADD COLUMN reporting_frameworks TEXT;
ALTER TABLE user_profiles ADD COLUMN goals TEXT;
