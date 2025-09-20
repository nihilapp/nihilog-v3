CREATE SCHEMA "nihilog";
--> statement-breakpoint
CREATE SEQUENCE "nihilog"."category_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE SEQUENCE "nihilog"."post_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE SEQUENCE "nihilog"."post_tag_map_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE SEQUENCE "nihilog"."tag_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE SEQUENCE "nihilog"."user_info_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
--> statement-breakpoint
CREATE TYPE "nihilog"."post_status" AS ENUM('EMPTY', 'WRITING', 'FINISHED');--> statement-breakpoint
CREATE TYPE "nihilog"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "nihilog"."yn_enum" AS ENUM('Y', 'N');--> statement-breakpoint
CREATE TABLE "nihilog"."category_info" (
	"ctgry_no" integer PRIMARY KEY DEFAULT nextval('"nihilog"."category_info_seq"') NOT NULL,
	"ctgry_nm" varchar(255) NOT NULL,
	"ctgry_expln" varchar(500),
	"ctgry_colr" varchar(30),
	"ctgry_stp" integer DEFAULT 0 NOT NULL,
	"up_ctgry_no" integer,
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"crt_no" integer,
	"crt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"updt_no" integer,
	"updt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"del_no" integer,
	"del_dt" timestamp with time zone,
	CONSTRAINT "category_info_ctgry_nm_unique" UNIQUE("ctgry_nm")
);
--> statement-breakpoint
CREATE TABLE "nihilog"."nihilog.post_info" (
	"pst_no" integer PRIMARY KEY DEFAULT nextval('"nihilog"."post_info_seq"') NOT NULL,
	"user_no" integer NOT NULL,
	"ctgry_no" integer,
	"pst_ttl" varchar(255) NOT NULL,
	"pst_smry" varchar(500),
	"pst_mtxt" jsonb NOT NULL,
	"pst_stts" "nihilog"."post_status" DEFAULT 'EMPTY' NOT NULL,
	"publ_dt" timestamp with time zone,
	"rls_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"arch_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"scrty_yn" "nihilog"."yn_enum",
	"pst_pswd" varchar(255),
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
CREATE TABLE "nihilog"."nihilog.post_tag_map" (
	"tag_map_no" integer PRIMARY KEY DEFAULT nextval('"nihilog"."post_tag_map_seq"') NOT NULL,
	"pst_no" integer NOT NULL,
	"tag_no" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nihilog"."nihilog.tag_info" (
	"tag_no" integer PRIMARY KEY DEFAULT nextval('"nihilog"."tag_info_seq"') NOT NULL,
	"tag_nm" varchar(128) NOT NULL,
	"tag_expln" varchar(500),
	"tag_colr" varchar(30),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"crt_no" integer,
	"crt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"updt_no" integer,
	"updt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"del_no" integer,
	"del_dt" timestamp with time zone,
	CONSTRAINT "nihilog.tag_info_tag_nm_unique" UNIQUE("tag_nm")
);
--> statement-breakpoint
CREATE TABLE "nihilog"."nihilog.user_info" (
	"user_no" integer PRIMARY KEY DEFAULT nextval('"nihilog"."user_info_seq"') NOT NULL,
	"eml_addr" varchar(254) NOT NULL,
	"user_nm" varchar(30) NOT NULL,
	"user_role" "nihilog"."user_role" DEFAULT 'USER' NOT NULL,
	"profl_img" varchar(1024),
	"user_biogp" varchar(500),
	"encpt_pswd" varchar(255) NOT NULL,
	"resh_token" varchar(500),
	"use_yn" "nihilog"."yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "nihilog"."yn_enum" DEFAULT 'N' NOT NULL,
	"last_lgn_dt" timestamp with time zone,
	"crt_no" integer,
	"crt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"updt_no" integer,
	"updt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"del_no" integer,
	"del_dt" timestamp with time zone,
	CONSTRAINT "nihilog.user_info_eml_addr_unique" UNIQUE("eml_addr"),
	CONSTRAINT "nihilog.user_info_user_nm_unique" UNIQUE("user_nm")
);
--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.post_info" ADD CONSTRAINT "nihilog.post_info_user_no_nihilog.user_info_user_no_fk" FOREIGN KEY ("user_no") REFERENCES "nihilog"."nihilog.user_info"("user_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.post_info" ADD CONSTRAINT "nihilog.post_info_ctgry_no_category_info_ctgry_no_fk" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."category_info"("ctgry_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.post_tag_map" ADD CONSTRAINT "nihilog.post_tag_map_pst_no_nihilog.post_info_pst_no_fk" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."nihilog.post_info"("pst_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nihilog"."nihilog.post_tag_map" ADD CONSTRAINT "nihilog.post_tag_map_tag_no_nihilog.tag_info_tag_no_fk" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."nihilog.tag_info"("tag_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "post_info_user_no_idx" ON "nihilog"."nihilog.post_info" USING btree ("user_no");--> statement-breakpoint
CREATE INDEX "post_info_pst_stts_idx" ON "nihilog"."nihilog.post_info" USING btree ("pst_stts");--> statement-breakpoint
CREATE INDEX "post_info_publ_dt_idx" ON "nihilog"."nihilog.post_info" USING btree ("publ_dt");--> statement-breakpoint
CREATE INDEX "post_info_pst_ttl_idx" ON "nihilog"."nihilog.post_info" USING btree ("pst_ttl");--> statement-breakpoint
CREATE INDEX "post_tag_map_pst_no_idx" ON "nihilog"."nihilog.post_tag_map" USING btree ("pst_no");--> statement-breakpoint
CREATE INDEX "post_tag_map_tag_no_idx" ON "nihilog"."nihilog.post_tag_map" USING btree ("tag_no");--> statement-breakpoint
CREATE UNIQUE INDEX "post_tag_map_uq" ON "nihilog"."nihilog.post_tag_map" USING btree ("pst_no","tag_no");--> statement-breakpoint
CREATE INDEX "tag_info_nm_idx" ON "nihilog"."nihilog.tag_info" USING btree ("tag_nm");--> statement-breakpoint
CREATE INDEX "user_info_eml_addr_idx" ON "nihilog"."nihilog.user_info" USING btree ("eml_addr");--> statement-breakpoint
CREATE INDEX "user_info_user_nm_idx" ON "nihilog"."nihilog.user_info" USING btree ("user_nm");
