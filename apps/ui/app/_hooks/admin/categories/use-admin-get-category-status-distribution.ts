import type { CategoryStatusDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리 상태별 분포를 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetCategoryStatusDistribution(enabled: boolean = true) {
  const query = useGet<CategoryStatusDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'status-distribution',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
