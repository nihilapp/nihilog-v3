ALTER TABLE "nihilog"."nihilog.post_info" RENAME TO "post_info";--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.post_tag_map" RENAME TO "post_tag_map";--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.tag_info" RENAME TO "tag_info";--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.user_info" RENAME TO "user_info";--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" DROP CONSTRAINT "nihilog.tag_info_tag_nm_unique";--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" DROP CONSTRAINT "nihilog.user_info_eml_addr_unique";--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" DROP CONSTRAINT "nihilog.user_info_user_nm_unique";--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" DROP CONSTRAINT "nihilog.post_info_user_no_nihilog.user_info_user_no_fk";
--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" DROP CONSTRAINT "nihilog.post_info_ctgry_no_category_info_ctgry_no_fk";
--> statement-breakpoint
ALTER TABLE "nihilog"."post_tag_map" DROP CONSTRAINT "nihilog.post_tag_map_pst_no_nihilog.post_info_pst_no_fk";
--> statement-breakpoint
ALTER TABLE "nihilog"."post_tag_map" DROP CONSTRAINT "nihilog.post_tag_map_tag_no_nihilog.tag_info_tag_no_fk";
--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ADD CONSTRAINT "post_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" ADD CONSTRAINT "post_info_ctgry_no_category_info_ctgry_no_fk" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."category_info"("ctgry_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."post_tag_map" ADD CONSTRAINT "post_tag_map_pst_no_post_info_pst_no_fk" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."post_info"("pst_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."post_tag_map" ADD CONSTRAINT "post_tag_map_tag_no_tag_info_tag_no_fk" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."tag_info"("tag_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."tag_info" ADD CONSTRAINT "tag_info_tag_nm_unique" UNIQUE("tag_nm");--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ADD CONSTRAINT "user_info_eml_addr_unique" UNIQUE("eml_addr");--> statement-breakpoint
ALTER TABLE "nihilog"."user_info" ADD CONSTRAINT "user_info_user_nm_unique" UNIQUE("user_nm");