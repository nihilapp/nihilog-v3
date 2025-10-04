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

-- CreateTable
CREATE TABLE "nihilog"."pst_bkmrk_mpng" (
    "bkmrk_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "use_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'Y',
    "del_yn" "nihilog"."YnStatus" NOT NULL DEFAULT 'N',
    "crt_no" INTEGER,
    "crt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "updt_no" INTEGER,
    "updt_dt" TEXT NOT NULL DEFAULT to_char(current_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    "del_no" INTEGER,
    "del_dt" TEXT,

    CONSTRAINT "pst_bkmrk_mpng_pkey" PRIMARY KEY ("bkmrk_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "pst_bkmrk_mpng_user_no_pst_no_key" ON "nihilog"."pst_bkmrk_mpng"("user_no", "pst_no");

-- AddForeignKey
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_crt_no_fkey" FOREIGN KEY ("crt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_updt_no_fkey" FOREIGN KEY ("updt_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nihilog"."pst_bkmrk_mpng" ADD CONSTRAINT "pst_bkmrk_mpng_del_no_fkey" FOREIGN KEY ("del_no") REFERENCES "nihilog"."user_info"("user_no") ON DELETE SET NULL ON UPDATE CASCADE;
