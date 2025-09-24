CREATE SEQUENCE "nihilog".ctgry_sbcr_mpng_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".tag_sbcr_mpng_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE "nihilog"."ctgry_sbcr_mpng" (
	"ctgry_sbcr_no" integer PRIMARY KEY DEFAULT nextval('nihilog.ctgry_sbcr_mpng_seq') NOT NULL,
	"sbcr_no" integer NOT NULL,
	"ctgry_no" integer NOT NULL,
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "nihilog"."tag_sbcr_mpng" (
	"tag_sbcr_no" integer PRIMARY KEY DEFAULT nextval('nihilog.tag_sbcr_mpng_seq') NOT NULL,
	"sbcr_no" integer NOT NULL,
	"tag_no" integer NOT NULL,
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50)
);
--> statement-breakpoint
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_sbcr_no_user_sbcr_info_sbcr_no_fk" FOREIGN KEY ("sbcr_no") REFERENCES "nihilog"."user_sbcr_info"("sbcr_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_ctgry_no_ctgry_info_ctgry_no_fk" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_sbcr_no_user_sbcr_info_sbcr_no_fk" FOREIGN KEY ("sbcr_no") REFERENCES "nihilog"."user_sbcr_info"("sbcr_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_tag_no_tag_info_tag_no_fk" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."tag_info"("tag_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ctgry_sbcr_mpng_sbcr_no_idx" ON "nihilog"."ctgry_sbcr_mpng" USING btree ("sbcr_no");--> statement-breakpoint
CREATE INDEX "ctgry_sbcr_mpng_ctgry_no_idx" ON "nihilog"."ctgry_sbcr_mpng" USING btree ("ctgry_no");--> statement-breakpoint
CREATE INDEX "ctgry_sbcr_mpng_active_idx" ON "nihilog"."ctgry_sbcr_mpng" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "ctgry_sbcr_mpng_crt_dt_idx" ON "nihilog"."ctgry_sbcr_mpng" USING btree ("crt_dt");--> statement-breakpoint
CREATE UNIQUE INDEX "ctgry_sbcr_mpng_uq" ON "nihilog"."ctgry_sbcr_mpng" USING btree ("sbcr_no","ctgry_no");--> statement-breakpoint
CREATE INDEX "tag_sbcr_mpng_sbcr_no_idx" ON "nihilog"."tag_sbcr_mpng" USING btree ("sbcr_no");--> statement-breakpoint
CREATE INDEX "tag_sbcr_mpng_tag_no_idx" ON "nihilog"."tag_sbcr_mpng" USING btree ("tag_no");--> statement-breakpoint
CREATE INDEX "tag_sbcr_mpng_active_idx" ON "nihilog"."tag_sbcr_mpng" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "tag_sbcr_mpng_crt_dt_idx" ON "nihilog"."tag_sbcr_mpng" USING btree ("crt_dt");--> statement-breakpoint
CREATE UNIQUE INDEX "tag_sbcr_mpng_uq" ON "nihilog"."tag_sbcr_mpng" USING btree ("sbcr_no","tag_no");