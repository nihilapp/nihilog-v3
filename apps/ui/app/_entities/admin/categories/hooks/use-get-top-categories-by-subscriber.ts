import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TopCategoriesBySubscriberItemType } from '@/_types';

interface UseGetTopCategoriesBySubscriberOptions extends QueryOptionType<TopCategoriesBySubscriberItemType[]> {
  limit: number;
}

/**
 * @description 구독자 많은 카테고리 TOP N을 조회하는 커스텀 훅
 * @param {UseGetTopCategoriesBySubscriberOptions} options - 쿼리 옵션
 */
export function useGetTopCategoriesBySubscriber(options: UseGetTopCategoriesBySubscriberOptions) {
  const { limit, ...queryOptions } = options;

  const query = useGet<TopCategoriesBySubscriberItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'top-subscribers',
    ],
    params: { limit, },
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
    ...queryOptions,
  });

  return query;
}
