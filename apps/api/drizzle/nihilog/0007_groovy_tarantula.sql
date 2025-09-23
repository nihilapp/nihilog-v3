CREATE SEQUENCE "nihilog"."user_subscribe_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "nihilog"."user_subscribe_info" (
	"sbcr_no" integer PRIMARY KEY DEFAULT nextval('nihilog.user_subscribe_info_seq') NOT NULL,
	"user_no" integer NOT NULL,
	"eml_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"new_pst_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"cmnt_rpl_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"sbcr_ctgry_list" varchar(1000),
	"sbcr_tag_list" varchar(1000),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50),
	CONSTRAINT "user_subscribe_info_user_no_unique" UNIQUE("user_no")
);
--> statement-breakpoint
ALTER TABLE "nihilog"."user_subscribe_info" ADD CONSTRAINT "user_subscribe_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_subscription_active_idx" ON "nihilog"."user_subscribe_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "user_subscription_eml_ntfy_idx" ON "nihilog"."user_subscribe_info" USING btree ("eml_ntfy_yn");--> statement-breakpoint
CREATE INDEX "user_subscription_crt_dt_idx" ON "nihilog"."user_subscribe_info" USING btree ("crt_dt");
