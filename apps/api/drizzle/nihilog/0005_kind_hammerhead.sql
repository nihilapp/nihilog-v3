ALTER TABLE "nihilog"."user_info" ALTER COLUMN "last_lgn_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "last_pswd_chg_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "crt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "crt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "updt_dt" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "updt_dt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "del_dt" SET DATA TYPE varchar(50);