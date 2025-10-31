import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TopCategoriesBySubscriberItemType } from '@/_types';

/**
 * @description 카테고리별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {number} [limit=10] - 상위 N개
 */
export function useAdminGetTopCategoriesBySubscriber(limit: number = 10) {
  const query = useGet<TopCategoriesBySubscriberItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'top-subscribers',
    ],
    params: {
      limit,
    },
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
