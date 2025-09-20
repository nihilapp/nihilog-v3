import { ynForNihillog } from '@/endpoints/drizzle/enums';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';

export const categoryInfo = nihilogSchema.table('category_info', {
  ctgryNo: integer('ctgry_no')
    .primaryKey()
    .default(sql`nextval('category_info_seq')`),

  ctgryNm: varchar('ctgry_nm', { length: 255, })
    .notNull()
    .unique(),
  ctgryExpln: varchar('ctgry_expln', { length: 500, }),
  ctgryColr: varchar('ctgry_colr', { length: 30, }), // 카테고리 색상(문자열)
  ctgryStp: integer('ctgry_stp')
    .notNull()
    .default(0),
  upCtgryNo: integer('up_ctgry_no'),

  useYn: ynForNihillog('use_yn')
    .notNull()
    .default('Y'),
  delYn: ynForNihillog('del_yn')
    .notNull()
    .default('N'),

  crtNo: integer('crt_no'),
  crtDt: timestamp('crt_dt', { withTimezone: true, })
    .notNull()
    .defaultNow(),
  updtNo: integer('updt_no'),
  updtDt: timestamp('updt_dt', { withTimezone: true, })
    .notNull()
    .defaultNow(),
  delNo: integer('del_no'),
  delDt: timestamp('del_dt', { withTimezone: true, }),
});
