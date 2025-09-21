import { yn } from '@/endpoints/drizzle/enums';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { foreignKey } from 'drizzle-orm/pg-core';

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

  useYn: yn('use_yn')
    .notNull()
    .default('Y'),
  delYn: yn('del_yn')
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
}, (table) => [
  foreignKey({
    columns: [ table.upCtgryNo, ],
    foreignColumns: [ table.ctgryNo, ],
    name: 'category_info_up_ctgry_no_fk',
  })
    .onDelete('set null')
    .onUpdate('cascade'),
  index('category_info_up_ctgry_no_idx')
    .on(table.upCtgryNo),
  index('category_info_parent_level_idx')
    .on(table.upCtgryNo, table.ctgryStp),
  index('category_info_active_idx')
    .on(table.upCtgryNo, table.delYn, table.useYn),
  index('category_info_crt_dt_idx')
    .on(table.crtDt),
]);
