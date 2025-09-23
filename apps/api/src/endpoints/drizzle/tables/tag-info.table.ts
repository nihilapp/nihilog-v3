import { sql } from 'drizzle-orm';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

import { yn } from '@drizzle/enums';
import { nihilogSchema } from '@drizzle/tables/nihilog.schema';
import { postInfo } from '@drizzle/tables/post-info.table';

// 태그 정보 테이블
export const tagInfo = nihilogSchema.table('tag_info', {
  tagNo: integer('tag_no')
    .primaryKey()
    .default(sql`nextval('tag_info_seq')`),

  tagNm: varchar('tag_nm', { length: 128, })
    .notNull()
    .unique(),
  tagExpln: varchar('tag_expln', { length: 500, }),
  tagColr: varchar('tag_colr', { length: 30, }),

  useYn: yn('use_yn')
    .notNull()
    .default('Y'),
  delYn: yn('del_yn')
    .notNull()
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
  index('tag_info_nm_idx').on(table.tagNm),
  index('tag_info_active_idx').on(table.delYn, table.useYn),
  index('tag_info_crt_dt_idx').on(table.crtDt),
  // 대소문자 무시 검색 최적화
  index('tag_info_nm_lower_idx').on(sql`lower(${table.tagNm})`),
]);

// 게시글-태그 매핑 테이블 (다대다)
export const postTagMap = nihilogSchema.table('post_tag_map', {
  // [PK]
  tagMapNo: integer('tag_map_no')
    .primaryKey()
    .default(sql`nextval('post_tag_map_seq')`),

  // [관계]
  pstNo: integer('pst_no')
    .notNull()
    .references(() => postInfo.pstNo),
  tagNo: integer('tag_no')
    .notNull()
    .references(() => tagInfo.tagNo),
}, (table) => [
  index('post_tag_map_pst_no_idx').on(table.pstNo),
  index('post_tag_map_tag_no_idx').on(table.tagNo),
  uniqueIndex('post_tag_map_uq').on(table.pstNo, table.tagNo),
]);
