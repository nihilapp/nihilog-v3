import { sql } from 'drizzle-orm';
import { foreignKey } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';

import { commentStatus, yn } from '@/endpoints/drizzle/enums';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { pstInfo } from '@/endpoints/drizzle/tables/pst-info.table';
import { userInfo } from '@/endpoints/drizzle/tables/user-info.table';

export const cmntInfoSeq = sql`
  CREATE SEQUENCE cmnt_info_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
`;

export const cmntInfo = nihilogSchema.table('cmnt_info', {
  // [PK]
  cmntNo: integer('cmnt_no')
    .primaryKey()
    .default(sql`nextval('cmnt_info_seq')`),
  // [FK]
  pstNo: integer('pst_no')
    .references(() => pstInfo.pstNo)
    .notNull(),
  // 단, 선택. 게스트가 댓글 달 때 사용자 정보가 없음.
  userNo: integer('user_no')
    .references(() => userInfo.userNo),

  // [방문자 전용 컬럼]
  vstrNm: varchar('vstr_nm', { length: 128, }),
  vstrEml: varchar('vstr_eml', { length: 255, }),
  vstrPswd: varchar('vstr_pswd', { length: 255, }),

  // [컬럼]
  cmntMtxt: text('cmnt_mtxt')
    .notNull(),
  cmntStts: commentStatus('cmnt_stts')
    .default('PENDING'),
  cmntStp: integer('cmnt_stp')
    .default(0),
  upCmntNo: integer('up_cmnt_no'),
  secrYn: yn('secr_yn')
    .default('N'),

  useYn: yn('use_yn')
    .default('Y'),
  delYn: yn('del_yn')
    .default('N'),

  crtNo: integer('crt_no'),
  crtDt: varchar('crt_dt', { length: 50, })
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  updtNo: integer('updt_no'),
  updtDt: varchar('updt_dt', { length: 50, })
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  delNo: integer('del_no'),
  delDt: varchar('del_dt', { length: 50, }),
}, (table) => [
  foreignKey({
    columns: [ table.upCmntNo, ],
    foreignColumns: [ table.cmntNo, ],
    name: 'comment_info_up_cmnt_no_fk',
  })
    .onDelete('set null')
    .onUpdate('cascade'),
  index('comment_info_up_cmnt_no_idx')
    .on(table.upCmntNo),
  index('comment_info_user_no_idx')
    .on(table.userNo),
  index('comment_info_pst_no_idx')
    .on(table.pstNo),
  index('comment_info_active_idx')
    .on(table.delYn, table.useYn),
  index('comment_info_crt_dt_idx')
    .on(table.crtDt),
]);
