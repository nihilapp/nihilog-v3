CREATE TABLE "user_info" (
	"user_no" integer PRIMARY KEY DEFAULT nextval('user_info_seq') NOT NULL,
	"eml_addr" varchar(254) NOT NULL,
	"user_nm" varchar(30) NOT NULL,
	"user_role" "user_role" DEFAULT 'USER' NOT NULL,
	"profl_img" varchar(1024),
	"user_biogp" varchar(500),
	"encpt_pswd" varchar(255) NOT NULL,
	"resh_token" varchar(500),
	"use_yn" "yn_enum" DEFAULT 'Y' NOT NULL,
	"del_yn" "yn_enum" DEFAULT 'N' NOT NULL,
	"last_lgn_dt" timestamp with time zone,
	"crt_no" integer,
	"crt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"updt_no" integer,
	"updt_dt" timestamp with time zone DEFAULT now() NOT NULL,
	"del_no" integer,
	"del_dt" timestamp with time zone,
	CONSTRAINT "user_info_eml_addr_unique" UNIQUE("eml_addr"),
	CONSTRAINT "user_info_user_nm_unique" UNIQUE("user_nm")
);
--> statement-breakpoint
CREATE INDEX "user_info_eml_addr_idx" ON "user_info" USING btree ("eml_addr");--> statement-breakpoint
CREATE INDEX "user_info_user_nm_idx" ON "user_info" USING btree ("user_nm");