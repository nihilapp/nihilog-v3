import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 인증 관련 쿼리 키 정의
 * createQueryKeys를 사용하여 타입 안전한 쿼리 키를 생성합니다.
 *
 * GET 쿼리:
 * - session: 현재 로그인된 사용자의 세션 정보
 *
 * POST 뮤테이션:
 * - signin: 로그인
 * - signout: 로그아웃
 * - withdraw: 회원탈퇴
 * - forgotPassword: 비밀번호 재설정 요청
 * - newPassword: 새 비밀번호 설정
 * - changePassword: 비밀번호 변경
 */
export const authKeys = createQueryKeys('auth', {
  // ===== GET Queries =====
  session: () => [ 'session', ],

  // ===== POST Mutations =====
  signin: () => [ 'signin', ],
  signout: () => [ 'signout', ],
  withdraw: () => [ 'withdraw', ],
  forgotPassword: () => [ 'forgotPassword', ],
  resetPassword: () => [ 'resetPassword', ],
  changePassword: () => [ 'changePassword', ],
  refresh: () => [ 'refresh', ],
});
