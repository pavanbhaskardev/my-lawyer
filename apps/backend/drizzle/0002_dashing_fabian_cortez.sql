ALTER TABLE "user" ADD COLUMN "lawyer_verified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lawyer_verification_status" text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "rejected_reason" text;