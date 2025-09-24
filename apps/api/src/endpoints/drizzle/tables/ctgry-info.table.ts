import { sql } from 'drizzle-orm';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { foreignKey } from 'drizzle-orm/pg-core';

import { yn } from '@drizzle/enums';
import { nihilogSchema } from '@drizzle/tables/nihilog.schema';

export const ctgryInfo = nihilogSchema.table('ctgry_info', {
  ctgryNo: integer('ctgry_no')
    .primaryKey()
    .default(sql`nextval('ctgry_info_seq')`),

  ctgryNm: varchar('ctgry_nm', { length: 255, })
    .notNull()
    .unique(),
  ctgryExpln: varchar('ctgry_expln', { length: 500, }),
  ctgryColr: varchar('ctgry_colr', { length: 30, }), // 카테고리 색상(문자열)
  ctgryStp: integer('ctgry_stp')
    .default(0),
  upCtgryNo: integer('up_ctgry_no'),

  useYn: yn('use_yn')
    .default('Y'),
  delYn: yn('del_yn')
    .default('N'),

  crtNo: integer('crt_no'),
  crtDt: varchar('crt_dt', { length: 50, })
    .notNull(),
  updtNo: integer('updt_no'),
  updtDt: varchar('updt_dt', { length: 50, })
    .notNull(),
  delNo: integer('del_no'),
  delDt: varchar('del_dt', { length: 50, }),
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
