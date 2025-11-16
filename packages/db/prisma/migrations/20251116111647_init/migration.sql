-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "YnStatus" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('EMPTY', 'WRITING', 'FINISHED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SPAM');

-- CreateTable
CREATE TABLE "user_info" (
    "user_no" SERIAL NOT NULL,
    "eml_addr" TEXT NOT NULL,
    "user_nm" TEXT NOT NULL,
    "user_role" "UserRole" NOT NULL DEFAULT 'USER',
    "profl_img" TEXT,
    "user_biogp" TEXT,
    "encpt_pswd" TEXT NOT NULL,
    "resh_token" TEXT,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "last_lgn_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "last_pswd_chg_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_no")
);

-- CreateTable
CREATE TABLE "ctgry_info" (
    "ctgry_no" SERIAL NOT NULL,
    "ctgry_nm" TEXT NOT NULL,
    "ctgry_expln" TEXT,
    "ctgry_colr" TEXT,
    "ctgry_stp" INTEGER NOT NULL DEFAULT 0,
    "up_ctgry_no" INTEGER,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "ctgry_info_pkey" PRIMARY KEY ("ctgry_no")
);

-- CreateTable
CREATE TABLE "tag_info" (
    "tag_no" SERIAL NOT NULL,
    "tag_nm" TEXT NOT NULL,
    "tag_expln" TEXT,
    "tag_colr" TEXT,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "tag_info_pkey" PRIMARY KEY ("tag_no")
);

-- CreateTable
CREATE TABLE "pst_info" (
    "pst_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "ctgry_no" INTEGER,
    "pst_ttl" TEXT NOT NULL,
    "pst_smry" TEXT,
    "pst_mtxt" JSONB NOT NULL,
    "pst_cd" TEXT,
    "pst_thmb_link" TEXT,
    "pst_view" INTEGER NOT NULL DEFAULT 0,
    "pst_stts" "PostStatus" NOT NULL DEFAULT 'EMPTY',
    "publ_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "pin_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "rls_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "arch_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "secr_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "pst_pswd" TEXT,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "pst_info_pkey" PRIMARY KEY ("pst_no")
);

-- CreateTable
CREATE TABLE "cmnt_info" (
    "cmnt_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "cmnt_cntnt" TEXT NOT NULL,
    "cmnt_sts" "CommentStatus" NOT NULL DEFAULT 'PENDING',
    "prnt_cmnt_no" INTEGER,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "cmnt_info_pkey" PRIMARY KEY ("cmnt_no")
);

-- CreateTable
CREATE TABLE "ctgry_sbcr_mpng" (
    "ctgry_sbcr_no" SERIAL NOT NULL,
    "sbcr_no" INTEGER NOT NULL,
    "ctgry_no" INTEGER NOT NULL,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "ctgry_sbcr_mpng_pkey" PRIMARY KEY ("ctgry_sbcr_no")
);

-- CreateTable
CREATE TABLE "tag_sbcr_mpng" (
    "tag_sbcr_no" SERIAL NOT NULL,
    "sbcr_no" INTEGER NOT NULL,
    "tag_no" INTEGER NOT NULL,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "tag_sbcr_mpng_pkey" PRIMARY KEY ("tag_sbcr_no")
);

-- CreateTable
CREATE TABLE "user_sbcr_info" (
    "sbcr_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "eml_ntfy_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "new_pst_ntfy_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "cmnt_rpl_ntfy_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "user_sbcr_info_pkey" PRIMARY KEY ("sbcr_no")
);

-- CreateTable
CREATE TABLE "pst_tag_mpng" (
    "tag_map_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "tag_no" INTEGER NOT NULL,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "pst_tag_mpng_pkey" PRIMARY KEY ("tag_map_no")
);

-- CreateTable
CREATE TABLE "pst_view_log" (
    "view_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "viewer_ip" TEXT,
    "view_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "pst_view_log_pkey" PRIMARY KEY ("view_no")
);

-- CreateTable
CREATE TABLE "pst_shrn_log" (
    "shrn_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "shrn_site" TEXT NOT NULL,
    "shrn_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),

    CONSTRAINT "pst_shrn_log_pkey" PRIMARY KEY ("shrn_no")
);

-- CreateTable
CREATE TABLE "pst_bkmrk_mpng" (
    "bkmrk_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "use_yn" "YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "pst_bkmrk_mpng_pkey" PRIMARY KEY ("bkmrk_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_info_eml_addr_key" ON "user_info"("eml_addr");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_nm_key" ON "user_info"("user_nm");

-- CreateIndex
CREATE UNIQUE INDEX "ctgry_info_ctgry_nm_key" ON "ctgry_info"("ctgry_nm");

-- CreateIndex
CREATE INDEX "ctgry_info_use_yn_del_yn_idx" ON "ctgry_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_crt_dt_del_yn_idx" ON "ctgry_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_del_dt_del_yn_idx" ON "ctgry_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_info_up_ctgry_no_del_yn_idx" ON "ctgry_info"("up_ctgry_no", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "tag_info_tag_nm_key" ON "tag_info"("tag_nm");

-- CreateIndex
CREATE INDEX "tag_info_use_yn_del_yn_idx" ON "tag_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "tag_info_crt_dt_del_yn_idx" ON "tag_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_info_del_dt_del_yn_idx" ON "tag_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_publ_dt_del_yn_rls_yn_idx" ON "pst_info"("publ_dt", "del_yn", "rls_yn");

-- CreateIndex
CREATE INDEX "pst_info_pst_stts_del_yn_idx" ON "pst_info"("pst_stts", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_pst_no_del_yn_idx" ON "pst_info"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_updt_dt_del_yn_idx" ON "pst_info"("updt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_info_del_dt_del_yn_idx" ON "pst_info"("del_dt", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "pst_info_pst_cd_key" ON "pst_info"("pst_cd");

-- CreateIndex
CREATE INDEX "cmnt_info_crt_dt_del_yn_idx" ON "cmnt_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_pst_no_del_yn_idx" ON "cmnt_info"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_cmnt_sts_del_yn_idx" ON "cmnt_info"("cmnt_sts", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_prnt_cmnt_no_del_yn_idx" ON "cmnt_info"("prnt_cmnt_no", "del_yn");

-- CreateIndex
CREATE INDEX "cmnt_info_del_dt_del_yn_idx" ON "cmnt_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_ctgry_no_del_yn_idx" ON "ctgry_sbcr_mpng"("ctgry_no", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_sbcr_no_del_yn_idx" ON "ctgry_sbcr_mpng"("sbcr_no", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_crt_dt_del_yn_idx" ON "ctgry_sbcr_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "ctgry_sbcr_mpng_del_dt_del_yn_idx" ON "ctgry_sbcr_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "ctgry_sbcr_mpng_sbcr_no_ctgry_no_key" ON "ctgry_sbcr_mpng"("sbcr_no", "ctgry_no");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_tag_no_del_yn_idx" ON "tag_sbcr_mpng"("tag_no", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_sbcr_no_del_yn_idx" ON "tag_sbcr_mpng"("sbcr_no", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_crt_dt_del_yn_idx" ON "tag_sbcr_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "tag_sbcr_mpng_del_dt_del_yn_idx" ON "tag_sbcr_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "tag_sbcr_mpng_sbcr_no_tag_no_key" ON "tag_sbcr_mpng"("sbcr_no", "tag_no");

-- CreateIndex
CREATE UNIQUE INDEX "user_sbcr_info_user_no_key" ON "user_sbcr_info"("user_no");

-- CreateIndex
CREATE INDEX "user_sbcr_info_use_yn_del_yn_idx" ON "user_sbcr_info"("use_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_eml_ntfy_yn_del_yn_idx" ON "user_sbcr_info"("eml_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_new_pst_ntfy_yn_del_yn_idx" ON "user_sbcr_info"("new_pst_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_cmnt_rpl_ntfy_yn_del_yn_idx" ON "user_sbcr_info"("cmnt_rpl_ntfy_yn", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_crt_dt_del_yn_idx" ON "user_sbcr_info"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "user_sbcr_info_del_dt_del_yn_idx" ON "user_sbcr_info"("del_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_tag_no_del_yn_idx" ON "pst_tag_mpng"("tag_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_pst_no_del_yn_idx" ON "pst_tag_mpng"("pst_no", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_crt_dt_del_yn_idx" ON "pst_tag_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_tag_mpng_del_dt_del_yn_idx" ON "pst_tag_mpng"("del_dt", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "pst_tag_mpng_pst_no_tag_no_key" ON "pst_tag_mpng"("pst_no", "tag_no");

-- CreateIndex
CREATE INDEX "pst_view_log_pst_no_view_dt_idx" ON "pst_view_log"("pst_no", "view_dt");

-- CreateIndex
CREATE INDEX "pst_view_log_view_dt_pst_no_idx" ON "pst_view_log"("view_dt", "pst_no");

-- CreateIndex
CREATE INDEX "pst_shrn_log_pst_no_shrn_dt_idx" ON "pst_shrn_log"("pst_no", "shrn_dt");

-- CreateIndex
CREATE INDEX "pst_shrn_log_shrn_dt_pst_no_idx" ON "pst_shrn_log"("shrn_dt", "pst_no");

-- CreateIndex
CREATE INDEX "pst_bkmrk_mpng_crt_dt_del_yn_idx" ON "pst_bkmrk_mpng"("crt_dt", "del_yn");

-- CreateIndex
CREATE INDEX "pst_bkmrk_mpng_pst_no_del_yn_idx" ON "pst_bkmrk_mpng"("pst_no", "del_yn");

-- CreateIndex
CREATE UNIQUE INDEX "pst_bkmrk_mpng_user_no_pst_no_key" ON "pst_bkmrk_mpng"("user_no", "pst_no");

-- AddForeignKey
ALTER TABLE "ctgry_info" ADD CONSTRAINT "ctgry_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_info" ADD CONSTRAINT "ctgry_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_info" ADD CONSTRAINT "ctgry_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_info" ADD CONSTRAINT "ctgry_info_up_ctgry_no_fkey" FOREIGN KEY ("up_ctgry_no") REFERENCES "ctgry_info"("ctgry_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_info" ADD CONSTRAINT "tag_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_info" ADD CONSTRAINT "tag_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_info" ADD CONSTRAINT "tag_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_info" ADD CONSTRAINT "pst_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_info" ADD CONSTRAINT "pst_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_info" ADD CONSTRAINT "pst_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_info" ADD CONSTRAINT "pst_info_ctgry_no_fkey" FOREIGN KEY ("ctgry_no") REFERENCES "ctgry_info"("ctgry_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmnt_info" ADD CONSTRAINT "cmnt_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmnt_info" ADD CONSTRAINT "cmnt_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmnt_info" ADD CONSTRAINT "cmnt_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmnt_info" ADD CONSTRAINT "cmnt_info_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmnt_info" ADD CONSTRAINT "cmnt_info_prnt_cmnt_no_fkey" FOREIGN KEY ("prnt_cmnt_no") REFERENCES "cmnt_info"("cmnt_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_sbcr_no_fkey" FOREIGN KEY ("sbcr_no") REFERENCES "user_sbcr_info"("sbcr_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_ctgry_no_fkey" FOREIGN KEY ("ctgry_no") REFERENCES "ctgry_info"("ctgry_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_sbcr_no_fkey" FOREIGN KEY ("sbcr_no") REFERENCES "user_sbcr_info"("sbcr_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_tag_no_fkey" FOREIGN KEY ("tag_no") REFERENCES "tag_info"("tag_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "user_info"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_tag_no_fkey" FOREIGN KEY ("tag_no") REFERENCES "tag_info"("tag_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_view_log" ADD CONSTRAINT "pst_view_log_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_shrn_log" ADD CONSTRAINT "pst_shrn_log_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "user_info"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;
