import { useGet } from '@/_entities/common/hooks';
import type { TagCleanupRecommendationItemType } from '@/_types';

/**
 * @description 태그 정리 필요도를 조회하는 커스텀 훅
 */
export function useAdminGetTagCleanupRecommendations() {
  const query = useGet<TagCleanupRecommendationItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'cleanup',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
