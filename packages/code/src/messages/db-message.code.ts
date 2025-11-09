/**
 * 데이터베이스 관련 메시지 코드
 */
export const DB_MESSAGES = {
  // 성공/정보 메시지
  CONNECTED: '데이터베이스에 연결되었습니다.',
  DISCONNECTED: '데이터베이스 연결이 종료되었습니다.',

  // 에러 메시지
  CONNECTION_ERROR: '데이터베이스 연결에 실패했습니다.',
  QUERY_ERROR: '데이터베이스 쿼리 실행에 실패했습니다.',
  PRISMA_INIT_ERROR: 'Prisma 초기화에 실패했습니다.',
} as const;

