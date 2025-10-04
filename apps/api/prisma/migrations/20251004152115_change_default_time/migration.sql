-- AlterTable
ALTER TABLE "nihilog"."cmnt_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."ctgry_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."pst_info" ALTER COLUMN "publ_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."pst_shrn_log" ALTER COLUMN "shrn_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."pst_tag_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."pst_view_log" ALTER COLUMN "view_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."tag_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "last_lgn_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "last_pswd_chg_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

-- AlterTable
ALTER TABLE "nihilog"."user_sbcr_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "del_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');
