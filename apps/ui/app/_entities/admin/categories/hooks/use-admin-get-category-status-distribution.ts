import type { CategoryStatusDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 카테고리 상태별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryStatusDistribution() {
  const query = useGet<CategoryStatusDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'status-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
