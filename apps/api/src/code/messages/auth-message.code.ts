/**
 * 인증 관련 메시지 코드
 */
export const AUTH_MESSAGES = {
  // 성공 메시지
  SIGN_UP_SUCCESS: '회원가입이 완료되었습니다.',
  SIGN_IN_SUCCESS: '로그인되었습니다.',
  SIGN_OUT_SUCCESS: '로그아웃되었습니다.',
  FORGOT_PASSWORD_SUCCESS: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
  PASSWORD_CHANGE_SUCCESS: '비밀번호가 변경되었습니다.',
  WITHDRAW_SUCCESS: '회원탈퇴가 완료되었습니다.',
  FORGOT_PASSWORD_EMAIL_SENT: '비밀번호 재설정 이메일을 발송했습니다. 5분 안에 확인해주세요.',
  NEW_PASSWORD_SET: '새 비밀번호가 성공적으로 설정되었습니다.',
  TOKEN_REFRESH_SUCCESS: '토큰이 성공적으로 갱신되었습니다.',
  SESSION_GET_SUCCESS: '세션 정보를 조회했습니다.',

  // 에러 메시지
  SIGN_UP_ERROR: '회원가입에 실패했습니다.',
  SIGN_IN_ERROR: '로그인에 실패했습니다.',
  SIGN_OUT_ERROR: '로그아웃에 실패했습니다.',
  WITHDRAW_ERROR: '회원탈퇴에 실패했습니다.',
  FORGOT_PASSWORD_ERROR: '비밀번호 재설정 요청에 실패했습니다.',
  PASSWORD_CHANGE_ERROR: '비밀번호 변경에 실패했습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
  ALREADY_EXISTS: '이미 존재하는 계정입니다.',
  NOT_FOUND: '계정을 찾을 수 없습니다.',
  INVALID_INPUT: '이메일, 사용자명, 비밀번호는 필수 입력 항목입니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  INVALID_OR_EXPIRED_RESET_TOKEN: '유효하지 않거나 만료된 리셋 토큰입니다.',
  REFRESH_TOKEN_NOT_FOUND: '리프레시 토큰을 찾을 수 없습니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  SESSION_NOT_FOUND: '세션 정보를 찾을 수 없습니다.',
  UNAUTHORIZED: '권한이 필요합니다.',
  TOKEN_REFRESH_ERROR: '토큰 갱신에 실패했습니다.',
  FORBIDDEN: '접근할 수 없는 기능입니다.',
  ADMIN_ONLY: '관리자만 접근할 수 있습니다.',
} as const;
