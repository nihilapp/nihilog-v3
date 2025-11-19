-- AlterTable
ALTER TABLE "cmnt_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "ctgry_info" ADD COLUMN     "ctgry_lvl" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "ctgry_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "pst_bkmrk_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "pst_info" ALTER COLUMN "publ_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "pst_shrn_log" ALTER COLUMN "shrn_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "pst_tag_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "pst_view_log" ALTER COLUMN "view_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "tag_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "tag_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "user_info" ALTER COLUMN "last_lgn_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "last_pswd_chg_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "user_sbcr_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');
