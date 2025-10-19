import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagCleanupRecommendationItemType } from '@/_types';

interface UseGetTagCleanupRecommendationsOptions extends QueryOptionType<TagCleanupRecommendationItemType[]> {}

/**
 * @description 태그 정리 필요도를 조회하는 커스텀 훅
 * @param {UseGetTagCleanupRecommendationsOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagCleanupRecommendations(options: UseGetTagCleanupRecommendationsOptions = {}) {
  const query = useGet<TagCleanupRecommendationItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'cleanup',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return query;
}
