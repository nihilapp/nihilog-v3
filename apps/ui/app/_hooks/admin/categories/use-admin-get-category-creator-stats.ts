import type { CategoryCreatorStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리 생성자 통계를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryCreatorStats() {
  const query = useGet<CategoryCreatorStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'creator-stats',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
