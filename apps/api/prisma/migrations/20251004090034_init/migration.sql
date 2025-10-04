-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "nihilog";

-- CreateEnum
CREATE TYPE "nihilog"."UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "nihilog"."YnStatus" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "nihilog"."PostStatus" AS ENUM ('EMPTY', 'WRITING', 'FINISHED');

-- CreateEnum
CREATE TYPE "nihilog"."CommentStatus" AS ENUM ('ACTIVE', 'HIDDEN', 'DELETED');

-- CreateTable
CREATE TABLE "nihilog"."user_info" (
    "user_no" SERIAL NOT NULL,
    "eml_addr" TEXT NOT NULL,
    "user_nm" TEXT NOT NULL,
    "user_role" "nihilog"."UserRole" NOT NULL DEFAULT 'USER',
    "profl_img" TEXT,
    "user_biogp" TEXT,
    "encpt_pswd" TEXT NOT NULL,
    "resh_token" TEXT,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "last_lgn_dt" TEXT,
    "last_pswd_chg_dt" TEXT,
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_no")
);

-- CreateTable
CREATE TABLE "nihilog"."ctgry_info" (
    "ctgry_no" SERIAL NOT NULL,
    "ctgry_nm" TEXT NOT NULL,
    "ctgry_expln" TEXT,
    "ctgry_colr" TEXT,
    "ctgry_stp" INTEGER NOT NULL DEFAULT 0,
    "up_ctgry_no" INTEGER,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "ctgry_info_pkey" PRIMARY KEY ("ctgry_no")
);

-- CreateTable
CREATE TABLE "nihilog"."tag_info" (
    "tag_no" SERIAL NOT NULL,
    "tag_nm" TEXT NOT NULL,
    "tag_expln" TEXT,
    "tag_colr" TEXT,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "tag_info_pkey" PRIMARY KEY ("tag_no")
);

-- CreateTable
CREATE TABLE "nihilog"."pst_info" (
    "pst_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "ctgry_no" INTEGER,
    "pst_ttl" TEXT NOT NULL,
    "pst_smry" TEXT,
    "pst_mtxt" JSONB NOT NULL,
    "pst_cd" TEXT,
    "pst_thmb_link" TEXT,
    "pst_view" INTEGER NOT NULL DEFAULT 0,
    "pst_stts" "nihilog"."PostStatus" NOT NULL DEFAULT 'EMPTY',
    "publ_dt" TEXT,
    "rls_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "arch_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "secr_yn" "nihilog"."YnStatus",
    "pst_pswd" TEXT,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "pst_info_pkey" PRIMARY KEY ("pst_no")
);

-- CreateTable
CREATE TABLE "nihilog"."cmnt_info" (
    "cmnt_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "cmnt_cntnt" TEXT NOT NULL,
    "cmnt_sts" "nihilog"."CommentStatus" NOT NULL DEFAULT 'ACTIVE',
    "prnt_cmnt_no" INTEGER,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "cmnt_info_pkey" PRIMARY KEY ("cmnt_no")
);

-- CreateTable
CREATE TABLE "nihilog"."ctgry_sbcr_mpng" (
    "ctgry_sbcr_no" SERIAL NOT NULL,
    "sbcr_no" INTEGER NOT NULL,
    "ctgry_no" INTEGER NOT NULL,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "ctgry_sbcr_mpng_pkey" PRIMARY KEY ("ctgry_sbcr_no")
);

-- CreateTable
CREATE TABLE "nihilog"."tag_sbcr_mpng" (
    "tag_sbcr_no" SERIAL NOT NULL,
    "sbcr_no" INTEGER NOT NULL,
    "tag_no" INTEGER NOT NULL,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "tag_sbcr_mpng_pkey" PRIMARY KEY ("tag_sbcr_no")
);

-- CreateTable
CREATE TABLE "nihilog"."user_sbcr_info" (
    "sbcr_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "eml_ntfy_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "new_pst_ntfy_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "cmnt_rpl_ntfy_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "user_sbcr_info_pkey" PRIMARY KEY ("sbcr_no")
);

-- CreateTable
CREATE TABLE "nihilog"."pst_tag_mpng" (
    "tag_map_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "tag_no" INTEGER NOT NULL,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "pst_tag_mpng_pkey" PRIMARY KEY ("tag_map_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_info_eml_addr_key" ON "nihilog"."user_info"("eml_addr");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_nm_key" ON "nihilog"."user_info"("user_nm");

-- CreateIndex
CREATE UNIQUE INDEX "ctgry_info_ctgry_nm_key" ON "nihilog"."ctgry_info"("ctgry_nm");

-- CreateIndex
CREATE UNIQUE INDEX "tag_info_tag_nm_key" ON "nihilog"."tag_info"("tag_nm");

-- CreateIndex
CREATE UNIQUE INDEX "pst_info_pst_ttl_key" ON "nihilog"."pst_info"("pst_ttl");

-- CreateIndex
CREATE UNIQUE INDEX "pst_info_pst_cd_key" ON "nihilog"."pst_info"("pst_cd");

-- CreateIndex
CREATE UNIQUE INDEX "ctgry_sbcr_mpng_sbcr_no_ctgry_no_key" ON "nihilog"."ctgry_sbcr_mpng"("sbcr_no", "ctgry_no");

-- CreateIndex
CREATE UNIQUE INDEX "tag_sbcr_mpng_sbcr_no_tag_no_key" ON "nihilog"."tag_sbcr_mpng"("sbcr_no", "tag_no");

-- CreateIndex
CREATE UNIQUE INDEX "user_sbcr_info_user_no_key" ON "nihilog"."user_sbcr_info"("user_no");

-- CreateIndex
CREATE UNIQUE INDEX "pst_tag_mpng_pst_no_tag_no_key" ON "nihilog"."pst_tag_mpng"("pst_no", "tag_no");

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_info" ADD CONSTRAINT "ctgry_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_info" ADD CONSTRAINT "ctgry_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_info" ADD CONSTRAINT "ctgry_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_info" ADD CONSTRAINT "ctgry_info_up_ctgry_no_fkey" FOREIGN KEY ("up_ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_info" ADD CONSTRAINT "tag_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_info" ADD CONSTRAINT "tag_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_info" ADD CONSTRAINT "tag_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_info" ADD CONSTRAINT "pst_info_ctgry_no_fkey" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."cmnt_info" ADD CONSTRAINT "cmnt_info_prnt_cmnt_no_fkey" FOREIGN KEY ("prnt_cmnt_no") REFERENCES "nihilog"."cmnt_info"("cmnt_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_sbcr_no_fkey" FOREIGN KEY ("sbcr_no") REFERENCES "nihilog"."user_sbcr_info"("sbcr_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_ctgry_no_fkey" FOREIGN KEY ("ctgry_no") REFERENCES "nihilog"."ctgry_info"("ctgry_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."ctgry_sbcr_mpng" ADD CONSTRAINT "ctgry_sbcr_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_sbcr_no_fkey" FOREIGN KEY ("sbcr_no") REFERENCES "nihilog"."user_sbcr_info"("sbcr_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_tag_no_fkey" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."tag_info"("tag_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."tag_sbcr_mpng" ADD CONSTRAINT "tag_sbcr_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."user_sbcr_info" ADD CONSTRAINT "user_sbcr_info_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_tag_no_fkey" FOREIGN KEY ("tag_no") REFERENCES "nihilog"."tag_info"("tag_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_tag_mpng" ADD CONSTRAINT "pst_tag_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;
