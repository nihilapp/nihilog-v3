import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 인증 관련 쿼리 키 정의
 */
export const authKeys = createQueryKeys('auth', {
  // ===== GET Queries =====
  session: () => [
    'auth', 'session',
  ], // 현재 로그인된 사용자의 세션 정보

  // ===== POST Mutations =====
  signin: () => [
    'auth', 'create', 'signin',
  ], // 로그인
  signout: () => [
    'auth', 'create', 'signout',
  ], // 로그아웃
  withdraw: () => [
    'auth', 'delete', 'withdraw',
  ], // 회원탈퇴
  forgotPassword: () => [
    'auth', 'create', 'forgot-password',
  ], // 비밀번호 재설정 요청
  resetPassword: () => [
    'auth', 'update', 'reset-password',
  ], // 비밀번호 재설정
  changePassword: () => [
    'auth', 'update', 'change-password',
  ], // 비밀번호 변경
  refresh: () => [
    'auth', 'create', 'refresh',
  ], // 토큰 갱신
});
