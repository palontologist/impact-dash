CREATE TABLE `e2g_food_donors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`donor_name` text NOT NULL,
	`donor_type` text,
	`total_donations` real DEFAULT 0,
	`last_donation_date` integer,
	`engagement_score` real DEFAULT 0,
	`retention_status` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `e2g_food_impact_stories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`region` text,
	`beneficiary_count` integer,
	`media_type` text,
	`media_url` text,
	`published_date` integer,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `e2g_food_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`food_bars_delivered` integer DEFAULT 0,
	`meals_provided` integer DEFAULT 0,
	`calories_provided` integer DEFAULT 0,
	`communities_served` integer DEFAULT 0,
	`regions_served` integer DEFAULT 0,
	`vulnerable_individuals_reached` integer DEFAULT 0,
	`donor_impact_tracked` integer DEFAULT 0,
	`donor_retention_rate` real DEFAULT 0,
	`donor_engagement_rate` real DEFAULT 0,
	`jobs_created` integer DEFAULT 0,
	`local_nutrition_production` integer DEFAULT 0,
	`microfarms_established` integer DEFAULT 0,
	`water_efficiency` real DEFAULT 0,
	`energy_efficiency` real DEFAULT 0,
	`ghg_emissions_saved` real DEFAULT 0,
	`zero_waste_percentage` real DEFAULT 0,
	`upcycled_ingredients` integer DEFAULT 0,
	`people_trained` integer DEFAULT 0,
	`partnerships_established` integer DEFAULT 0,
	`events_held` integer DEFAULT 0,
	`ngos_onboarded` integer DEFAULT 0,
	`charities_onboarded` integer DEFAULT 0,
	`impact_stories_shared` integer DEFAULT 0,
	`media_endorsements` integer DEFAULT 0,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `esg_frameworks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`version` text,
	`description` text,
	`is_active` integer DEFAULT true,
	`coverage_percentage` real DEFAULT 0,
	`last_updated` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `esg_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`report_id` integer,
	`category` text NOT NULL,
	`subcategory` text NOT NULL,
	`metric_code` text,
	`metric_name` text NOT NULL,
	`value` text NOT NULL,
	`unit` text,
	`target` text,
	`benchmark` text,
	`performance` text,
	`data_source` text,
	`calculation_method` text,
	`notes` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`report_id`) REFERENCES `esg_reports`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `esg_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`report_type` text NOT NULL,
	`report_period` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`status` text DEFAULT 'draft',
	`ai_generated_content` text,
	`executive_summary` text,
	`key_findings` text,
	`recommendations` text,
	`report_data` text,
	`generated_by` text DEFAULT 'system',
	`published_date` integer,
	`file_url` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `human_constitution_heatmaps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`metric` text NOT NULL,
	`region` text NOT NULL,
	`intensity` real NOT NULL,
	`coordinates` text,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `human_constitution_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`dignity_index` real,
	`maturity_index` real,
	`value_wheel_body` real,
	`value_wheel_emotion` real,
	`value_wheel_thought` real,
	`value_wheel_power` real,
	`value_wheel_communication` real,
	`value_wheel_life` real,
	`value_wheel_unity` real,
	`individual_wellbeing` real,
	`mental_health_score` real,
	`relationship_trust` real,
	`team_effectiveness` real,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `human_constitution_societal_indicators` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`indicator_name` text NOT NULL,
	`value` real NOT NULL,
	`region` text,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `human_constitution_stories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`tags` text,
	`published_date` integer,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_user_id` text,
	`email` text NOT NULL,
	`name` text,
	`user_type` text NOT NULL,
	`selected_profile` text,
	`industry` text,
	`reason` text,
	`onboarding_completed` integer DEFAULT false,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_profiles_clerk_user_id_unique` ON `user_profiles` (`clerk_user_id`);