CREATE TYPE "nihilog"."comment_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'SPAM');--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ADD COLUMN "cmnt_stts" "nihilog"."comment_status" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ADD COLUMN "cmnt_stp" integer DEFAULT 0 NOT NULL;