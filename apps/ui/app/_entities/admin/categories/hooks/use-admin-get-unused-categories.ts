import type { UnusedCategoryItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용되지 않는 카테고리 목록을 조회하는 커스텀 훅
 */
export function useAdminGetUnusedCategories() {
  const query = useGet<UnusedCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'unused',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
