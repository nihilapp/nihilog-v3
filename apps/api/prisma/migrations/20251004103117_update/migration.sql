-- AlterTable
ALTER TABLE "nihilog"."cmnt_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."ctgry_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."pst_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."pst_tag_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."tag_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."tag_sbcr_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."user_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');

-- AlterTable
ALTER TABLE "nihilog"."user_sbcr_info" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS');
