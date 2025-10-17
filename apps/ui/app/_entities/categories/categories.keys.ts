import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCategoryType } from '@/_schemas/category.schema';

/**
 * 카테고리 관련 쿼리 키 정의
 */
export const categoriesKeys = createQueryKeys('categories', {
  // ===== GET Queries =====
  search: (searchData: SearchCategoryType) => [
    'categories', 'search', searchData,
  ], // 카테고리 목록 조회 (POST)
  byNo: (ctgryNo: number) => [
    'categories', 'by-no', ctgryNo,
  ], // 카테고리 번호로 조회
  byName: (name: string) => [
    'categories', 'by-name', name,
  ], // 카테고리명으로 조회

});
