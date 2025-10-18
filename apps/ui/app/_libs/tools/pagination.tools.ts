/**
 * 페이지네이션 계산 유틸리티
 */

/**
 * 페이지 번호와 페이지당 항목 수를 offset과 limit으로 변환
 * @param page 페이지 번호 (1부터 시작)
 * @param limit 페이지당 항목 수 (0보다 커야 함)
 * @returns { limit, offset } 객체
 */
export function calculatePagination(page: number, limit: number) {
  // limit이 0 이하면 페이지네이션을 적용하지 않음
  if (limit <= 0) {
    return {
      limit: 0,
      offset: 0,
    };
  }

  const offset = (page - 1) * limit;
  return {
    limit,
    offset,
  };
}

/**
 * 페이지네이션 파라미터가 존재하고 유효한지 확인
 * @param params 쿼리 파라미터 객체
 * @returns 페이지네이션 파라미터 존재 및 유효성 여부
 */
export function hasPaginationParams(params: Record<string, any>): boolean {
  return 'page' in params && 'limit' in params && params.limit > 0;
}

/**
 * 페이지네이션 파라미터를 자동으로 계산하여 추가
 * @param params 기존 쿼리 파라미터
 * @returns 페이지네이션 계산이 적용된 파라미터
 */
export function addPaginationParams(params: Record<string, any>): Record<string, any> {
  if (hasPaginationParams(params)) {
    const { page, limit, ...restParams } = params;
    const { limit: calculatedLimit, offset, } = calculatePagination(
      page,
      limit
    );

    return {
      ...restParams,
      limit: calculatedLimit,
      offset: offset,
    };
  }

  return params;
}
