import type { TagCreatorStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그 생성자별 통계를 조회하는 커스텀 훅
 */
export function useAdminGetTagCreatorStats() {
  const query = useGet<TagCreatorStatItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'creator-stats',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
