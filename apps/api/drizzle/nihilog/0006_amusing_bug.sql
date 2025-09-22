ALTER TABLE "nihilog"."category_info" ALTER COLUMN "crt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."category_info" ALTER COLUMN "crt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."category_info" ALTER COLUMN "updt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."category_info" ALTER COLUMN "updt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."category_info" ALTER COLUMN "del_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ALTER COLUMN "crt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ALTER COLUMN "crt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ALTER COLUMN "updt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ALTER COLUMN "updt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ALTER COLUMN "del_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "publ_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "crt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "crt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "updt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "updt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ALTER COLUMN "del_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "crt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "crt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "updt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "updt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "del_dt" SET DATA TYPE varchar(50);