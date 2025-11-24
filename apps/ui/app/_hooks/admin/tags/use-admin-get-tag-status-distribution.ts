import type { TagStatusDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그 상태별 분포를 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagStatusDistribution(enabled: boolean = true) {
  const query = useGet<TagStatusDistributionItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'status-distribution',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
