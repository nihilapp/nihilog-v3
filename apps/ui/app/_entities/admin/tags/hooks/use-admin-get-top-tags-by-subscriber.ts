import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TopTagsBySubscriberItemType } from '@/_types';

/**
 * @description 태그별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {number} limit - 상위 N개
 */
export function useAdminGetTopTagsBySubscriber(limit: number = 10) {
  const query = useGet<TopTagsBySubscriberItemType[]>({
    url: [
      'admin',
      'tags',
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
