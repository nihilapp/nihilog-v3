import { sql } from 'drizzle-orm';
import { integer, varchar } from 'drizzle-orm/pg-core';
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

import { yn } from '@/endpoints/drizzle/enums';
import { ctgryInfo } from '@/endpoints/drizzle/tables/ctgry-info.table';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { userSbcrInfo } from '@/endpoints/drizzle/tables/user-sbcr-info.table';

// 카테고리 구독 매핑 테이블
export const ctgrySbcrMpng = nihilogSchema.table('ctgry_sbcr_mpng', {
  // [PK]
  ctgrySbcrNo: integer('ctgry_sbcr_no')
    .primaryKey()
    .default(sql`nextval('ctgry_sbcr_mpng_seq')`),

  // [FK]
  sbcrNo: integer('sbcr_no')
    .notNull()
    .references(() => userSbcrInfo.sbcrNo),
  ctgryNo: integer('ctgry_no')
    .notNull()
    .references(() => ctgryInfo.ctgryNo),

  // [상태]
  useYn: yn('use_yn')
    .default('Y'),
  delYn: yn('del_yn')
    .default('N'),

  // [메타데이터]
  crtNo: integer('crt_no'),
  crtDt: varchar('crt_dt', { length: 50, })
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  updtNo: integer('updt_no'),
  updtDt: varchar('updt_dt', { length: 50, })
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  delNo: integer('del_no'),
  delDt: varchar('del_dt', { length: 50, }),
}, (table) => [
  // [인덱스]
  index('ctgry_sbcr_mpng_sbcr_no_idx').on(table.sbcrNo),
  index('ctgry_sbcr_mpng_ctgry_no_idx').on(table.ctgryNo),
  index('ctgry_sbcr_mpng_active_idx').on(table.delYn, table.useYn),
  index('ctgry_sbcr_mpng_crt_dt_idx').on(table.crtDt),
  // 중복 방지를 위한 유니크 인덱스
  uniqueIndex('ctgry_sbcr_mpng_uq').on(table.sbcrNo, table.ctgryNo),
]);
