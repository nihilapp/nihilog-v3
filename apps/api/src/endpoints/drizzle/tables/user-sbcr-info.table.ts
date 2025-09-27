import { sql } from 'drizzle-orm';
import { integer, varchar } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

import { yn } from '@drizzle/enums';
import { nihilogSchema } from '@drizzle/tables/nihilog.schema';
import { userInfo } from '@drizzle/tables/user-info.table';

// 사용자 구독 설정 테이블
// - 이메일 알림 설정, 구독 카테고리/태그 관리

// 테이블 정의
export const userSbcrInfo = nihilogSchema.table('user_sbcr_info', {
  // [PK]
  sbcrNo: integer('sbcr_no')
    .primaryKey()
    .default(sql`nextval('user_sbcr_info_seq')`),

  // [FK]
  userNo: integer('user_no')
    .notNull()
    .unique()
    .references(() => userInfo.userNo),

  // [이메일 알림 설정]
  emlNtfyYn: yn('eml_ntfy_yn') // 이메일 알림 전체 on/off
    .default('Y'),
  newPstNtfyYn: yn('new_pst_ntfy_yn') // 새 글 알림
    .default('Y'),
  cmntRplNtfyYn: yn('cmnt_rpl_ntfy_yn') // 내 댓글 답글 알림
    .default('Y'),

  // [상태]
  useYn: yn('use_yn') // 사용 여부
    .default('Y'),
  delYn: yn('del_yn') // 삭제 여부
    .default('N'),

  // [메타데이터]
  crtNo: integer('crt_no'), // 생성자 번호
  crtDt: varchar('crt_dt', { length: 50, }) // 생성 일시 (YYYY-MM-DD HH:MM:SS)
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  updtNo: integer('updt_no'), // 수정자 번호
  updtDt: varchar('updt_dt', { length: 50, }) // 수정 일시 (YYYY-MM-DD HH:MM:SS)
    .default(sql`to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')`),
  delNo: integer('del_no'), // 삭제자 번호
  delDt: varchar('del_dt', { length: 50, }), // 삭제 일시 (YYYY-MM-DD HH:MM:SS)
}, (table) => [
  // [인덱스]
  index('user_subscription_active_idx')
    .on(table.delYn, table.useYn),
  index('user_subscription_eml_ntfy_idx')
    .on(table.emlNtfyYn),
  index('user_subscription_crt_dt_idx')
    .on(table.crtDt),
]);
