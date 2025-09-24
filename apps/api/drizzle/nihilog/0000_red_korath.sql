CREATE SCHEMA "nihilog";
CREATE SEQUENCE "nihilog".user_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".user_sbcr_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".pst_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".cmnt_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".ctgry_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".tag_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE "nihilog".pst_tag_mpng_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE TYPE "nihilog"."comment_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'SPAM');--> statement-breakpoint
CREATE TYPE "nihilog"."post_status" AS ENUM('EMPTY', 'WRITING', 'FINISHED');--> statement-breakpoint
CREATE TYPE "nihilog"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "nihilog"."yn_enum" AS ENUM('Y', 'N');--> statement-breakpoint
CREATE TABLE "nihilog"."cmnt_info" (
	"cmnt_no" integer PRIMARY KEY DEFAULT nextval('nihilog.cmnt_info_seq') NOT NULL,
	"pst_no" integer NOT NULL,
	"user_no" integer,
	"vstr_nm" varchar(128),
	"vstr_eml" varchar(255),
	"vstr_pswd" varchar(255),
	"cmnt_mtxt" text NOT NULL,
	"cmnt_stts" "nihilog"."comment_status" DEFAULT 'PENDING',
	"cmnt_stp" integer DEFAULT 0,
	"up_cmnt_no" integer,
	"secr_yn" "nihilog"."yn_enum" DEFAULT 'N',
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
CREATE TABLE "nihilog"."ctgry_info" (
	"ctgry_no" integer PRIMARY KEY DEFAULT nextval('nihilog.ctgry_info_seq') NOT NULL,
	"ctgry_nm" varchar(255) NOT NULL,
	"ctgry_expln" varchar(500),
	"ctgry_colr" varchar(30),
	"ctgry_stp" integer DEFAULT 0,
	"up_ctgry_no" integer,
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50),
	CONSTRAINT "ctgry_info_ctgry_nm_unique" UNIQUE("ctgry_nm")
);
--> statement-breakpoint
CREATE TABLE "nihilog"."pst_info" (
	"pst_no" integer PRIMARY KEY DEFAULT nextval('nihilog.pst_info_seq') NOT NULL,
	"user_no" integer NOT NULL,
	"ctgry_no" integer,
	"pst_ttl" varchar(255) NOT NULL,
	"pst_smry" varchar(500),
	"pst_mtxt" jsonb NOT NULL,
	"pst_stts" "nihilog"."post_status" DEFAULT 'EMPTY',
	"publ_dt" varchar(50),
	"rls_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"arch_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"secr_yn" "nihilog"."yn_enum",
	"pst_pswd" varchar(255),
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
CREATE TABLE "nihilog"."pst_tag_mpng" (
	"tag_map_no" integer PRIMARY KEY DEFAULT nextval('nihilog.pst_tag_mpng_seq') NOT NULL,
	"pst_no" integer NOT NULL,
	"tag_no" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nihilog"."tag_info" (
	"tag_no" integer PRIMARY KEY DEFAULT nextval('nihilog.tag_info_seq') NOT NULL,
	"tag_nm" varchar(128) NOT NULL,
	"tag_expln" varchar(500),
	"tag_colr" varchar(30),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50),
	CONSTRAINT "tag_info_tag_nm_unique" UNIQUE("tag_nm")
);
--> statement-breakpoint
CREATE TABLE "nihilog"."user_info" (
	"user_no" integer PRIMARY KEY DEFAULT nextval('nihilog.user_info_seq') NOT NULL,
	"eml_addr" varchar(254) NOT NULL,
	"user_nm" varchar(30) NOT NULL,
	"user_role" "nihilog"."user_role" DEFAULT 'USER',
	"profl_img" varchar(1024),
	"user_biogp" varchar(500),
	"encpt_pswd" varchar(255) NOT NULL,
	"resh_token" varchar(500),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"last_lgn_dt" varchar(50),
	"last_pswd_chg_dt" varchar(50),
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50),
	CONSTRAINT "user_info_eml_addr_unique" UNIQUE("eml_addr"),
	CONSTRAINT "user_info_user_nm_unique" UNIQUE("user_nm")
);
--> statement-breakpoint
CREATE TABLE "nihilog"."user_sbcr_info" (
	"sbcr_no" integer PRIMARY KEY DEFAULT nextval('nihilog.user_sbcr_info_seq') NOT NULL,
	"user_no" integer NOT NULL,
	"eml_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"new_pst_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"cmnt_rpl_ntfy_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"sbcr_ctgry_list" varchar(1000),
	"sbcr_tag_list" varchar(1000),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y',
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N',
	"crt_no" integer,
	"crt_dt" varchar(50) NOT NULL,
	"updt_no" integer,
	"updt_dt" varchar(50) NOT NULL,
	"del_no" integer,
	"del_dt" varchar(50),
	CONSTRAINT "user_sbcr_info_user_no_unique" UNIQUE("user_no")
);
--> statement-breakpoint
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_pst_no_pst_info_pst_no_fk" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_up_cmnt_no_fk" FOREIGN KEY ("up_cmnt_no") REFERENCES "nihilog"."cmnt_info"("cmnt_no") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "nihilog"."ctgry_info" ADD CONSTRAINT "ctgry_info_up_ctgry_no_fk" FOREIGN KEY ("up_ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_ctgry_no_ctgry_info_ctgry_no_fk" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_pst_no_pst_info_pst_no_fk" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_tag_no_tag_info_tag_no_fk" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."tag_info"("tag_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_user_no_user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cmnt_info_up_cmnt_no_idx" ON "nihilog"."cmnt_info" USING btree ("up_cmnt_no");--> statement-breakpoint
CREATE INDEX "cmnt_info_user_no_idx" ON "nihilog"."cmnt_info" USING btree ("user_no");--> statement-breakpoint
CREATE INDEX "cmnt_info_pst_no_idx" ON "nihilog"."cmnt_info" USING btree ("pst_no");--> statement-breakpoint
CREATE INDEX "cmnt_info_active_idx" ON "nihilog"."cmnt_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "cmnt_info_crt_dt_idx" ON "nihilog"."cmnt_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "ctgry_info_up_ctgry_no_idx" ON "nihilog"."ctgry_info" USING btree ("up_ctgry_no");--> statement-breakpoint
CREATE INDEX "ctgry_info_parent_level_idx" ON "nihilog"."ctgry_info" USING btree ("up_ctgry_no","ctgry_stp");--> statement-breakpoint
CREATE INDEX "ctgry_info_active_idx" ON "nihilog"."ctgry_info" USING btree ("up_ctgry_no","del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "ctgry_info_crt_dt_idx" ON "nihilog"."ctgry_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "pst_info_user_no_idx" ON "nihilog"."pst_info" USING btree ("user_no");--> statement-breakpoint
CREATE INDEX "pst_info_pst_stts_idx" ON "nihilog"."pst_info" USING btree ("pst_stts");--> statement-breakpoint
CREATE INDEX "pst_info_publ_dt_idx" ON "nihilog"."pst_info" USING btree ("publ_dt");--> statement-breakpoint
CREATE INDEX "pst_info_pst_ttl_idx" ON "nihilog"."pst_info" USING btree ("pst_ttl");--> statement-breakpoint
CREATE INDEX "pst_info_pst_ttl_lower_idx" ON "nihilog"."pst_info" USING btree (lower("pst_ttl"));--> statement-breakpoint
CREATE INDEX "pst_info_ctgry_no_idx" ON "nihilog"."pst_info" USING btree ("ctgry_no");--> statement-breakpoint
CREATE INDEX "pst_info_active_idx" ON "nihilog"."pst_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "pst_info_active_rls_idx" ON "nihilog"."pst_info" USING btree ("del_yn","use_yn","rls_yn");--> statement-breakpoint
CREATE INDEX "pst_info_crt_dt_idx" ON "nihilog"."pst_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "pst_tag_mpng_pst_no_idx" ON "nihilog"."pst_tag_mpng" USING btree ("pst_no");--> statement-breakpoint
CREATE INDEX "pst_tag_mpng_tag_no_idx" ON "nihilog"."pst_tag_mpng" USING btree ("tag_no");--> statement-breakpoint
CREATE UNIQUE INDEX "pst_tag_mpng_uq" ON "nihilog"."pst_tag_mpng" USING btree ("pst_no","tag_no");--> statement-breakpoint
CREATE INDEX "tag_info_nm_idx" ON "nihilog"."tag_info" USING btree ("tag_nm");--> statement-breakpoint
CREATE INDEX "tag_info_active_idx" ON "nihilog"."tag_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "tag_info_crt_dt_idx" ON "nihilog"."tag_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "tag_info_nm_lower_idx" ON "nihilog"."tag_info" USING btree (lower("tag_nm"));--> statement-breakpoint
CREATE INDEX "user_info_eml_addr_idx" ON "nihilog"."user_info" USING btree ("eml_addr");--> statement-breakpoint
CREATE INDEX "user_info_user_nm_idx" ON "nihilog"."user_info" USING btree ("user_nm");--> statement-breakpoint
CREATE INDEX "user_info_role_idx" ON "nihilog"."user_info" USING btree ("user_role");--> statement-breakpoint
CREATE INDEX "user_info_active_idx" ON "nihilog"."user_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "user_info_last_lgn_dt_idx" ON "nihilog"."user_info" USING btree ("last_lgn_dt");--> statement-breakpoint
CREATE INDEX "user_info_crt_dt_idx" ON "nihilog"."user_info" USING btree ("crt_dt");--> statement-breakpoint
CREATE INDEX "user_sbcr_active_idx" ON "nihilog"."user_sbcr_info" USING btree ("del_yn","use_yn");--> statement-breakpoint
CREATE INDEX "user_sbcr_eml_ntfy_idx" ON "nihilog"."user_sbcr_info" USING btree ("eml_ntfy_yn");--> statement-breakpoint
CREATE INDEX "user_sbcr_crt_dt_idx" ON "nihilog"."user_sbcr_info" USING btree ("crt_dt");
