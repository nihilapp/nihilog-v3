export const COMMON_MESSAGES = {
  // ===== 공통 메시지 =====
  SUCCESS: '요청이 성공적으로 처리되었습니다.',
  ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '권한이 없습니다.',
  FORBIDDEN: '접근이 금지되었습니다.',
  PERMISSION_DENIED: '관리자만 접근할 수 있습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  INVALID_REQUEST: '잘못된 요청입니다.',
  ALREADY_EXISTS: '이미 존재하는 항목입니다.',
  DELETED: '성공적으로 삭제되었습니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
} as const;
