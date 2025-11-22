import type { UnusedCategoryItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용되지 않는 카테고리 목록을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUnusedCategories(enabled: boolean = true) {
  const query = useGet<UnusedCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'unused',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
