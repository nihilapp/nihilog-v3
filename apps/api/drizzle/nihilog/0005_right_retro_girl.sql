ALTER TABLE "nihilog"."pst_info" ADD COLUMN "pst_cd" varchar(255);--> statement-breakpoint
ALTER TABLE "nihilog"."pst_info" ADD COLUMN "pst_thmb_link" text;--> statement-breakpoint
ALTER TABLE "nihilog"."pst_info" ADD COLUMN "pst_view" integer DEFAULT 0;--> statement-breakpoint
CREATE INDEX "post_info_pst_cd_idx" ON "nihilog"."pst_info" USING btree ("pst_cd");--> statement-breakpoint
CREATE INDEX "post_info_pst_view_idx" ON "nihilog"."pst_info" USING btree ("pst_view");