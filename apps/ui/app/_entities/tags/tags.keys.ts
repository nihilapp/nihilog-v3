import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchTagType } from '@/_schemas/tag.schema';

/**
 * Tags 엔티티의 쿼리 키 정의
 * createQueryKeys를 사용하여 타입 안전한 쿼리 키를 생성합니다.
 */
export const tagsKeys = createQueryKeys('tags', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 태그 관련 쿼리 무효화
  list: (params: SearchTagType) => [
    'list', params,
  ], // 태그 목록 조회 (POST)
  detail: (tagNo: number) => [
    'detail', tagNo,
  ], // 태그 번호로 조회
  byName: (tagNm: string) => [
    'byName', tagNm,
  ], // 태그명으로 조회
});
