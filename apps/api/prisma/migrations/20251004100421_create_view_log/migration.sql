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

-- CreateTable
CREATE TABLE "nihilog"."pst_view_log" (
    "view_no" SERIAL NOT NULL,
    "pst_no" INTEGER NOT NULL,
    "viewer_ip" TEXT,
    "view_dt" TEXT NOT NULL,

    CONSTRAINT "pst_view_log_pkey" PRIMARY KEY ("view_no")
);

-- CreateIndex
CREATE INDEX "pst_view_log_pst_no_view_dt_idx" ON "nihilog"."pst_view_log"("pst_no", "view_dt");

-- AddForeignKey
ALTER TABLE "nihilog"."pst_view_log" ADD CONSTRAINT "pst_view_log_pst_no_fkey" FOREIGN KEY ("pst_no") REFERENCES "nihilog"."pst_info"("pst_no") ON DELETE RESTRICT ON UPDATE CASCADE;
