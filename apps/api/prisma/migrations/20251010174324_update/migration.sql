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
ALTER TABLE "nihilog"."pst_info" ALTER COLUMN "pst_mtxt" SET DATA TYPE TEXT,
ALTER COLUMN "publ_dt" SET DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
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
CREATE INDEX "cmnt_info_cmnt_sts_del_yn_idx" ON "nihilog"."cmnt_info"("cmnt_sts", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_prnt_cmnt_no_del_yn_idx" ON "nihilog"."cmnt_info"("prnt_cmnt_no", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_del_dt_del_yn_idx" ON "nihilog"."cmnt_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_use_yn_del_yn_idx" ON "nihilog"."ctgry_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_crt_dt_del_yn_idx" ON "nihilog"."ctgry_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_del_dt_del_yn_idx" ON "nihilog"."ctgry_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_up_ctgry_no_del_yn_idx" ON "nihilog"."ctgry_info"("up_ctgry_no", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_ctgry_no_del_yn_idx" ON "nihilog"."ctgry_sbcr_mpng"("ctgry_no", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_sbcr_no_del_yn_idx" ON "nihilog"."ctgry_sbcr_mpng"("sbcr_no", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_crt_dt_del_yn_idx" ON "nihilog"."ctgry_sbcr_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_del_dt_del_yn_idx" ON "nihilog"."ctgry_sbcr_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_tag_no_del_yn_idx" ON "nihilog"."pst_tag_mpng"("tag_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_pst_no_del_yn_idx" ON "nihilog"."pst_tag_mpng"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_crt_dt_del_yn_idx" ON "nihilog"."pst_tag_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_del_dt_del_yn_idx" ON "nihilog"."pst_tag_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_info_use_yn_del_yn_idx" ON "nihilog"."tag_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "tag_info_crt_dt_del_yn_idx" ON "nihilog"."tag_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_info_del_dt_del_yn_idx" ON "nihilog"."tag_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_tag_no_del_yn_idx" ON "nihilog"."tag_sbcr_mpng"("tag_no", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_sbcr_no_del_yn_idx" ON "nihilog"."tag_sbcr_mpng"("sbcr_no", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_crt_dt_del_yn_idx" ON "nihilog"."tag_sbcr_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_del_dt_del_yn_idx" ON "nihilog"."tag_sbcr_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_use_yn_del_yn_idx" ON "nihilog"."user_sbcr_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_eml_ntfy_yn_del_yn_idx" ON "nihilog"."user_sbcr_info"("eml_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_new_pst_ntfy_yn_del_yn_idx" ON "nihilog"."user_sbcr_info"("new_pst_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_cmnt_rpl_ntfy_yn_del_yn_idx" ON "nihilog"."user_sbcr_info"("cmnt_rpl_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_crt_dt_del_yn_idx" ON "nihilog"."user_sbcr_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_del_dt_del_yn_idx" ON "nihilog"."user_sbcr_info"("del_dt", "del_yn");
