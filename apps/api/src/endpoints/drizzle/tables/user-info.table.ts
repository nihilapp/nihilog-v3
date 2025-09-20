import { userRoleForNihillog, ynForNihillog } from '@/endpoints/drizzle/enums';
import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';
import { sql } from 'drizzle-orm';
import { integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

// 사용자 기본 정보 테이블
// - 기본키, 계정 정보, 권한, 상태, 메타데이터로 구분

// 테이블 정의
export const userInfo = nihilogSchema.table('nihilog.user_info', {
  // [PK]
  userNo: integer('user_no')
    .primaryKey()
    .default(sql`nextval('user_info_seq')`),

  // [계정 식별 정보]
  emlAddr: varchar('eml_addr', { length: 254, }) // 이메일 (로그인 ID)
    .notNull()
    .unique(),
  userNm: varchar('user_nm', { length: 30, }) // 표시 이름(닉네임)
    .notNull()
    .unique(),
  userRole: userRoleForNihillog('user_role') // 권한(ADMIN/USER)
    .notNull()
    .default('USER'),

  // [프로필]
  proflImg: varchar('profl_img', { length: 1024, }), // 프로필 이미지 URL
  userBiogp: varchar('user_biogp', { length: 500, }), // 소개 문구

  // [인증]
  encptPswd: varchar('encpt_pswd', { length: 255, }) // 해시 비밀번호
    .notNull(),
  reshToken: varchar('resh_token', { length: 500, }), // 리프레시 토큰(옵션)

  // [상태]
  useYn: ynForNihillog('use_yn') // 사용 여부
    .notNull()
    .default('Y'),
  delYn: ynForNihillog('del_yn') // 삭제 여부
    .notNull()
    .default('N'),
  lastLgnDt: timestamp('last_lgn_dt', { withTimezone: true, }), // 마지막 로그인 일시

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
  index('user_info_eml_addr_idx')
    .on(table.emlAddr),
  index('user_info_user_nm_idx')
    .on(table.userNm),
]);
