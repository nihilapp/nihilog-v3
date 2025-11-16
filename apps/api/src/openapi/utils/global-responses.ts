import { MESSAGE } from '@nihilog/code';
import { createError } from '@/utils';

/**
 * 글로벌 응답 예시 생성 유틸리티
 */
export class GlobalResponses {
  /**
   * 인증 가드 사용 시 자동 추가되는 UNAUTHORIZED 응답
   */
  static getUnauthorizedResponse() {
    return {
      summary: '인증 실패',
      value: createError(
        'UNAUTHORIZED',
        MESSAGE.AUTH.UNAUTHORIZED
      ),
    };
  }

  /**
   * roles 사용 시 자동 추가되는 FORBIDDEN 응답
   */
  static getForbiddenResponse() {
    return {
      summary: '권한 없음',
      value: createError(
        'FORBIDDEN',
        MESSAGE.AUTH.PERMISSION_DENIED
      ),
    };
  }

  /**
   * 모든 엔드포인트에 자동 추가되는 DB 에러 응답
   */
  static getDBErrorResponse() {
    return {
      summary: 'DB 연결 에러',
      value: createError(
        'INTERNAL_SERVER_ERROR',
        MESSAGE.DB.CONNECTION_ERROR
      ),
    };
  }

  /**
   * 인증이 필요한 엔드포인트의 공통 응답들
   */
  static getAuthRequiredResponses() {
    return {
      unauthorized: this.getUnauthorizedResponse(),
      dbError: this.getDBErrorResponse(),
    };
  }

  /**
   * 권한이 필요한 엔드포인트의 공통 응답들
   */
  static getRoleRequiredResponses() {
    return {
      unauthorized: this.getUnauthorizedResponse(),
      forbidden: this.getForbiddenResponse(),
      dbError: this.getDBErrorResponse(),
    };
  }

  /**
   * 모든 엔드포인트의 공통 응답들
   */
  static getCommonResponses() {
    return {
      dbError: this.getDBErrorResponse(),
    };
  }
}

/**
 * 응답 예시 타입 정의
 */
interface ResponseExample {
  summary: string;
  value: {
    error: boolean;
    code: string;
    message: string;
    data?: any;
  };
}

/**
 * 응답 예시를 자동으로 추가하는 헬퍼 함수
 */
export const addGlobalResponses = (
  existingExamples: Record<string, ResponseExample> = {},
  options: {
    hasAuthGuard?: boolean;
    hasRoles?: boolean;
  } = {}
) => {
  const examples = { ...existingExamples, };

  // 인증 가드 사용 시 UNAUTHORIZED 추가
  if (options.hasAuthGuard) {
    const hasUnauthorized = Object.values(examples).some((example) => example.value?.code === 'UNAUTHORIZED');
    if (!hasUnauthorized) {
      examples.unauthorized = GlobalResponses.getUnauthorizedResponse();
    }
  }

  // roles 사용 시 FORBIDDEN 추가
  if (options.hasRoles) {
    const hasForbidden = Object.values(examples).some((example) => example.value?.code === 'FORBIDDEN');
    if (!hasForbidden) {
      examples.forbidden = GlobalResponses.getForbiddenResponse();
    }
  }

  // DB 에러는 항상 추가
  const hasDBError = Object.values(examples).some((example) =>
    example.value?.code === 'DB_CONNECTION_ERROR'
    || example.value?.code === 'DB_QUERY_ERROR');
  if (!hasDBError) {
    examples.dbError = GlobalResponses.getDBErrorResponse();
  }

  return examples;
};
