import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagCreatorStatItemType } from '@/_types';

interface UseGetTagCreatorStatsOptions extends QueryOptionType<TagCreatorStatItemType[]> {}

/**
 * @description 태그 생성자별 통계를 조회하는 커스텀 훅
 * @param {UseGetTagCreatorStatsOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagCreatorStats(options: UseGetTagCreatorStatsOptions = {}) {
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
    ...options,
  });

  return query;
}
