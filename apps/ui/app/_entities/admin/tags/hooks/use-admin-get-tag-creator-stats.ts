import type { TagCreatorStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그 생성자별 통계를 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagCreatorStats(enabled: boolean = true) {
  const query = useGet<TagCreatorStatItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'creator-stats',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
