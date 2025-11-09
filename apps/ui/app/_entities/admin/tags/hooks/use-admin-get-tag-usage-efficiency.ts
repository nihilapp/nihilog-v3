import type { TagUsageEfficiencyItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 사용 효율성을 조회하는 커스텀 훅
 */
export function useAdminGetTagUsageEfficiency() {
  const query = useGet<TagUsageEfficiencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'efficiency',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
