import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagCreatorStatItemType } from '@/_types';

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
