import { ynForNihillog } from '@/endpoints/drizzle/enums';
import { postStatus } from '@/endpoints/drizzle/enums/post-status.enum';
import { categoryInfo } from '@/endpoints/drizzle/tables/category-info.table';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { userInfo } from '@/endpoints/drizzle/tables/user-info.table';
import { sql } from 'drizzle-orm';
import { jsonb } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

// 게시글 기본 정보 테이블
// - 기본키, 관계, 본문, 상태, 메타데이터로 구분

export const postInfo = nihilogSchema.table('nihilog.post_info', {
  // [PK]
  pstNo: integer('pst_no')
    .primaryKey()
    .default(sql`nextval('post_info_seq')`),

  // [관계]
  userNo: integer('user_no')
    .notNull()
    .references(() => userInfo.userNo), // 작성자 FK
  ctgryNo: integer('ctgry_no')
    .references(() => categoryInfo.ctgryNo), // 카테고리 FK

  // [본문]
  pstTtl: varchar('pst_ttl', { length: 255, }) // 포스트 제목
    .notNull(),
  pstSmry: varchar('pst_smry', { length: 500, }), // 포스트 요약(옵션)
  pstMtxt: jsonb('pst_mtxt') // 포스트 본문(JSON)
    .notNull(),

  // [게시]
  pstStts: postStatus('pst_stts') // 게시물 상태 (empty | writing | finished)
    .notNull()
    .default('EMPTY'),
  publDt: timestamp('publ_dt', { withTimezone: true, }), // 발행 일시(옵션)
  rlsYn: ynForNihillog('rls_yn') // 공개 여부
    .notNull()
    .default('Y'),
  archYn: ynForNihillog('arch_yn') // 보관 여부
    .notNull()
    .default('N'),
  scrtyYn: ynForNihillog('scrty_yn'), // 비밀글 여부(옵션)
  pstPswd: varchar('pst_pswd', { length: 255, }), // 게시물 비밀번호(옵션)

  // [상태]
  useYn: ynForNihillog('use_yn') // 사용 여부
    .notNull()
    .default('Y'),
  delYn: ynForNihillog('del_yn') // 삭제 여부
    .notNull()
    .default('N'),

  // [메타데이터]
  crtNo: integer('crt_no'), // 생성자 번호
  crtDt: timestamp('crt_dt', { withTimezone: true, })
    .notNull()
    .defaultNow(),
  updtNo: integer('updt_no'), // 수정자 번호
  updtDt: timestamp('updt_dt', { withTimezone: true, })
    .notNull()
    .defaultNow(),
  delNo: integer('del_no'), // 삭제자 번호
  delDt: timestamp('del_dt', { withTimezone: true, }), // 삭제 일시
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
]);
