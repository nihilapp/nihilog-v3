import { ynForNihillog } from '@/endpoints/drizzle/enums';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { postInfo } from '@/endpoints/drizzle/tables/post-info.table';
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index, uniqueIndex } from 'drizzle-orm/pg-core';

// 태그 정보 테이블
export const tagInfo = nihilogSchema.table('nihilog.tag_info', {
  tagNo: integer('tag_no')
    .primaryKey()
    .default(sql`nextval('tag_info_seq')`),

  tagNm: varchar('tag_nm', { length: 128, })
    .notNull()
    .unique(),
  tagExpln: varchar('tag_expln', { length: 500, }),
  tagColr: varchar('tag_colr', { length: 30, }),

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
}, (table) => [
  index('tag_info_nm_idx').on(table.tagNm),
]);

// 게시글-태그 매핑 테이블 (다대다)
export const postTagMap = nihilogSchema.table('nihilog.post_tag_map', {
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
