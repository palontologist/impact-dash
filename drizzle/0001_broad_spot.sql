CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student_id` integer NOT NULL,
	`name` text NOT NULL,
	`issued_date` integer NOT NULL,
	`certificate_url` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cohorts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`capacity` integer,
	`current_enrollment` integer DEFAULT 0,
	`status` text DEFAULT 'active',
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`metric_type` text NOT NULL,
	`value` real NOT NULL,
	`change_percentage` real,
	`period` text NOT NULL,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `qualitative_insights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`student_id` integer,
	`tags` text,
	`is_published` integer DEFAULT false,
	`published_date` integer,
	`author_name` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`metric_name` text NOT NULL,
	`value` real NOT NULL,
	`unit` text NOT NULL,
	`period` text NOT NULL,
	`date` integer NOT NULL,
	`target` real,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sdg_mappings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sdg_number` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`impact_level` text NOT NULL,
	`progress_percentage` real DEFAULT 0,
	`target_date` integer,
	`is_active` integer DEFAULT true,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sdg_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sdg_id` integer NOT NULL,
	`metric_text` text NOT NULL,
	`value` text,
	`sort_order` integer DEFAULT 0,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`sdg_id`) REFERENCES `sdg_mappings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`age` integer,
	`gender` text,
	`location` text,
	`county` text NOT NULL,
	`cohort` text,
	`status` text DEFAULT 'active',
	`avatar_url` text,
	`enrollment_date` integer,
	`completion_date` integer,
	`employment_status` text,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_students`("id", "first_name", "last_name", "email", "phone", "age", "gender", "location", "county", "cohort", "status", "avatar_url", "enrollment_date", "completion_date", "employment_status", "created_at", "updated_at") SELECT "id", "first_name", "last_name", "email", "phone", "age", "gender", "location", "county", "cohort", "status", "avatar_url", "enrollment_date", "completion_date", "employment_status", "created_at", "updated_at" FROM `students`;--> statement-breakpoint
DROP TABLE `students`;--> statement-breakpoint
ALTER TABLE `__new_students` RENAME TO `students`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `students_email_unique` ON `students` (`email`);--> statement-breakpoint
ALTER TABLE `enrollment_stats` ADD `active` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `enrollment_stats` ADD `dropped_out` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `enrollment_stats` ADD `date` integer NOT NULL;