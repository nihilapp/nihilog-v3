import { sql } from 'drizzle-orm';
import { jsonb } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

import { yn } from '@drizzle/enums';
import { postStatus } from '@drizzle/enums/post-status.enum';
import { ctgryInfo } from '@drizzle/tables/ctgry-info.table';
import { nihilogSchema } from '@drizzle/tables/nihilog.schema';
import { userInfo } from '@drizzle/tables/user-info.table';

// 게시글 기본 정보 테이블
// - 기본키, 관계, 본문, 상태, 메타데이터로 구분

export const pstInfo = nihilogSchema.table('pst_info', {
  // [PK]
  pstNo: integer('pst_no')
    .primaryKey()
    .default(sql`nextval('pst_info_seq')`),

  // [관계]
  userNo: integer('user_no')
    .notNull()
    .references(() => userInfo.userNo), // 작성자 FK
  ctgryNo: integer('ctgry_no')
    .references(() => ctgryInfo.ctgryNo), // 카테고리 FK

  // [본문]
  pstTtl: varchar('pst_ttl', { length: 255, }) // 포스트 제목
    .notNull(),
  pstSmry: varchar('pst_smry', { length: 500, }), // 포스트 요약(옵션)
  pstMtxt: jsonb('pst_mtxt') // 포스트 본문(JSON)
    .notNull(),

  // [게시]
  pstStts: postStatus('pst_stts') // 게시물 상태 (empty | writing | finished)
    .default('EMPTY'),
  publDt: varchar('publ_dt', { length: 50, }), // 발행 일시(옵션)
  rlsYn: yn('rls_yn') // 공개 여부
    .default('Y'),
  archYn: yn('arch_yn') // 보관 여부
    .default('N'),
  secrYn: yn('secr_yn'), // 비밀글 여부(옵션)
  pstPswd: varchar('pst_pswd', { length: 255, }), // 게시물 비밀번호(옵션)

  // [상태]
  useYn: yn('use_yn') // 사용 여부
    .default('Y'),
  delYn: yn('del_yn') // 삭제 여부
    .default('N'),

  // [메타데이터]
  crtNo: integer('crt_no'), // 생성자 번호
  crtDt: varchar('crt_dt', { length: 50, }) // 생성 일시
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  updtNo: integer('updt_no'), // 수정자 번호
  updtDt: varchar('updt_dt', { length: 50, }) // 수정 일시
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  delNo: integer('del_no'), // 삭제자 번호
  delDt: varchar('del_dt', { length: 50, }), // 삭제 일시
}, (table) => [
  // [인덱스]
  index('post_info_user_no_idx')
    .on(table.userNo),
  index('post_info_pst_stts_idx')
    .on(table.pstStts),
  index('post_info_publ_dt_idx')
    .on(table.publDt),
  index('post_info_pst_ttl_idx')
    .on(table.pstTtl),
  // 대소문자 무시 검색 최적화
  index('post_info_pst_ttl_lower_idx')
    .on(sql`lower(${table.pstTtl})`),
  index('post_info_ctgry_no_idx')
    .on(table.ctgryNo),
  index('post_info_active_idx')
    .on(table.delYn, table.useYn),
  index('post_info_active_rls_idx')
    .on(table.delYn, table.useYn, table.rlsYn),
  index('post_info_crt_dt_idx')
    .on(table.crtDt),
]);
