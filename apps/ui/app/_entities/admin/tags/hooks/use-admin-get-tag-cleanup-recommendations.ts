import type { TagCleanupRecommendationItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그 정리 필요도를 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagCleanupRecommendations(enabled: boolean = true) {
  const query = useGet<TagCleanupRecommendationItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'cleanup',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
