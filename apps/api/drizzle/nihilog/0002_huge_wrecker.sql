CREATE SEQUENCE "nihilog"."comment_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "nihilog"."comment_info" (
	"cmnt_no" integer PRIMARY KEY DEFAULT nextval('nihilog.comment_info_seq') NOT NULL,
	"pst_no" integer NOT NULL,
	"user_no" integer,
	"vstr_nm" varchar(128),
	"vstr_eml" varchar(255),
	"vstr_pswd" varchar(255),
	"cmnt_mtxt" text NOT NULL,
	"up_cmnt_no" integer,
	"secr_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"crt_no" integer,
	"crt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"updt_no" integer,
	"updt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"del_no" integer,
	"del_dt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "nihilog"."post_info" RENAME COLUMN "scrty_yn" TO "secr_yn";--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ADD CONSTRAINT "comment_info_pst_no_post_info_pst_no_fk" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."post_info"("pst_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ADD CONSTRAINT "comment_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."comment_info" ADD CONSTRAINT "comment_info_up_cmnt_no_fk" FOREIGN KEY ("up_cmnt_no") REFERENCES "nihilog"."comment_info"("cmnt_no") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "comment_info_up_cmnt_no_idx" ON "nihilog"."comment_info" USING btree ("up_cmnt_no");--> statement-breakpoint
CREATE INDEX "comment_info_user_no_idx" ON "nihilog"."comment_info" USING btree ("user_no");--> statement-breakpoint
CREATE INDEX "comment_info_pst_no_idx" ON "nihilog"."comment_info" USING btree ("pst_no");--> statement-breakpoint
CREATE INDEX "comment_info_active_idx" ON "nihilog"."comment_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "comment_info_crt_dt_idx" ON "nihilog"."comment_info" USING btree ("crt_dt");--> statement-breakpoint
ALTER TABLE "nihilog"."category_info" ADD CONSTRAINT "category_info_up_ctgry_no_fk" FOREIGN KEY ("up_ctgry_no") REFERENCES "nihilog"."category_info"("ctgry_no") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "category_info_up_ctgry_no_idx" ON "nihilog"."category_info" USING btree ("up_ctgry_no");--> statement-breakpoint
CREATE INDEX "category_info_parent_level_idx" ON "nihilog"."category_info" USING btree ("up_ctgry_no","ctgry_stp");--> statement-breakpoint
CREATE INDEX "category_info_active_idx" ON "nihilog"."category_info" USING btree ("up_ctgry_no","del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "category_info_crt_dt_idx" ON "nihilog"."category_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "post_info_pst_ttl_lower_idx" ON "nihilog"."post_info" USING btree (lower("pst_ttl"));--> statement-breakpoint
CREATE INDEX "post_info_ctgry_no_idx" ON "nihilog"."post_info" USING btree ("ctgry_no");--> statement-breakpoint
CREATE INDEX "post_info_active_idx" ON "nihilog"."post_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "post_info_active_rls_idx" ON "nihilog"."post_info" USING btree ("del_yn","use_yn","rls_yn");--> statement-breakpoint
CREATE INDEX "post_info_crt_dt_idx" ON "nihilog"."post_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "tag_info_active_idx" ON "nihilog"."tag_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "tag_info_crt_dt_idx" ON "nihilog"."tag_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "tag_info_nm_lower_idx" ON "nihilog"."tag_info" USING btree (lower("tag_nm"));--> statement-breakpoint
CREATE INDEX "user_info_role_idx" ON "nihilog"."user_info" USING btree ("user_role");--> statement-breakpoint
CREATE INDEX "user_info_active_idx" ON "nihilog"."user_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "user_info_last_lgn_dt_idx" ON "nihilog"."user_info" USING btree ("last_lgn_dt");--> statement-breakpoint
CREATE INDEX "user_info_crt_dt_idx" ON "nihilog"."user_info" USING btree ("crt_dt");--> statement-breakpoint
