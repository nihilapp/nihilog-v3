/**
 * 인증 관련 메시지 코드
 */
export const AUTH_MESSAGES = {
  // 성공 메시지
  SIGN_IN_SUCCESS: '로그인되었습니다.',
  SIGN_OUT_SUCCESS: '로그아웃되었습니다.',
  PASSWORD_CHANGE_SUCCESS: '비밀번호가 변경되었습니다.',
  TOKEN_REFRESH_SUCCESS: '토큰이 성공적으로 갱신되었습니다.',
  SESSION_GET_SUCCESS: '세션 정보를 조회했습니다.',

  // 에러 메시지
  SIGN_IN_ERROR: '로그인에 실패했습니다.',
  SIGN_OUT_ERROR: '로그아웃에 실패했습니다.',
  PASSWORD_CHANGE_ERROR: '비밀번호 변경에 실패했습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
  NOT_FOUND: '계정을 찾을 수 없습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  REFRESH_TOKEN_NOT_FOUND: '리프레시 토큰을 찾을 수 없습니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  SESSION_NOT_FOUND: '세션 정보를 찾을 수 없습니다.',
  UNAUTHORIZED: '권한이 필요합니다.',
  TOKEN_REFRESH_ERROR: '토큰 갱신에 실패했습니다.',
  ADMIN_ONLY: '관리자만 접근할 수 있습니다.',
  PERMISSION_DENIED: '접근 권한이 없습니다.',
} as const;

