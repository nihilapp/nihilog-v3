import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCategoryType } from '@/_schemas/category.schema';

/**
 * 카테고리 관련 쿼리 키 정의
 */
export const categoriesKeys = createQueryKeys('categories', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 카테고리 관련 쿼리 무효화
  categoryList: (params: SearchCategoryType) => [
    'categoryList', params,
  ], // 카테고리 목록 조회 (POST)
  categoryByNo: (ctgryNo: number) => [
    'categoryByNo', ctgryNo,
  ], // 카테고리 번호로 조회
  categoryByName: (name: string) => [
    'categoryByName', name,
  ], // 카테고리명으로 조회
});
