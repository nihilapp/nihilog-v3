import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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
  });

  return query;
}
