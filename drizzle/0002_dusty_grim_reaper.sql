ALTER TABLE "notes" ALTER COLUMN "userID" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" text DEFAULT '' NOT NULL;