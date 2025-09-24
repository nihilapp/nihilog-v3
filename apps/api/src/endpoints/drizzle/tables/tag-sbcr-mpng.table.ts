import { sql } from 'drizzle-orm';
import { integer, varchar } from 'drizzle-orm/pg-core';
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

import { yn } from '@drizzle/enums';
import { nihilogSchema } from '@drizzle/tables/nihilog.schema';
import { userSbcrInfo } from '@drizzle/tables/user-sbcr-info.table';
import { tagInfo } from '@drizzle/tables/tag-info.table';

// 태그 구독 매핑 테이블
export const tagSbcrMpng = nihilogSchema.table('tag_sbcr_mpng', {
  // [PK]
  tagSbcrNo: integer('tag_sbcr_no')
    .primaryKey()
    .default(sql`nextval('tag_sbcr_mpng_seq')`),

  // [FK]
  sbcrNo: integer('sbcr_no')
    .notNull()
    .references(() => userSbcrInfo.sbcrNo),
  tagNo: integer('tag_no')
    .notNull()
    .references(() => tagInfo.tagNo),

  // [상태]
  useYn: yn('use_yn')
    .default('Y'),
  delYn: yn('del_yn')
    .default('N'),

  // [메타데이터]
  crtNo: integer('crt_no'),
  crtDt: varchar('crt_dt', { length: 50, })
    .notNull(),
  updtNo: integer('updt_no'),
  updtDt: varchar('updt_dt', { length: 50, })
    .notNull(),
  delNo: integer('del_no'),
  delDt: varchar('del_dt', { length: 50, }),
}, (table) => [
  // [인덱스]
  index('tag_sbcr_mpng_sbcr_no_idx').on(table.sbcrNo),
  index('tag_sbcr_mpng_tag_no_idx').on(table.tagNo),
  index('tag_sbcr_mpng_active_idx').on(table.delYn, table.useYn),
  index('tag_sbcr_mpng_crt_dt_idx').on(table.crtDt),
  // 중복 방지를 위한 유니크 인덱스
  uniqueIndex('tag_sbcr_mpng_uq').on(table.sbcrNo, table.tagNo),
]);