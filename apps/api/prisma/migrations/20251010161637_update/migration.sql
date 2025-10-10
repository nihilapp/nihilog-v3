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
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ALTER COLUMN "crt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
ALTER COLUMN "updt_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"');

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

-- CreateIndex
CREATE INDEX "cmnt_info_crt_dt_del_yn_idx" ON "nihilog"."cmnt_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_pst_no_del_yn_idx" ON "nihilog"."cmnt_info"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_bkmrk_mpng_crt_dt_del_yn_idx" ON "nihilog"."pst_bkmrk_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_bkmrk_mpng_pst_no_del_yn_idx" ON "nihilog"."pst_bkmrk_mpng"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_publ_dt_del_yn_rls_yn_idx" ON "nihilog"."pst_info"("publ_dt", "del_yn", "rls_yn");

-- CreateIndex
CREATE INDEX "pst_info_pst_stts_del_yn_idx" ON "nihilog"."pst_info"("pst_stts", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_pst_no_del_yn_idx" ON "nihilog"."pst_info"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_updt_dt_del_yn_idx" ON "nihilog"."pst_info"("updt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_del_dt_del_yn_idx" ON "nihilog"."pst_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_shrn_log_shrn_dt_pst_no_idx" ON "nihilog"."pst_shrn_log"("shrn_dt", "pst_no");

-- CreateIndex
CREATE INDEX "pst_view_log_view_dt_pst_no_idx" ON "nihilog"."pst_view_log"("view_dt", "pst_no");
