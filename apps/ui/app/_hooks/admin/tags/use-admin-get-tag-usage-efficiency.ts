import type { TagUsageEfficiencyItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그별 사용 효율성을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagUsageEfficiency(enabled: boolean = true) {
  const query = useGet<TagUsageEfficiencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'efficiency',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
