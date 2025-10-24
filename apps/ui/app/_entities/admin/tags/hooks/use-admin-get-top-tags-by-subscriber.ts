import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TopTagsBySubscriberItemType } from '@/_types';

interface OptionType extends QueryOptionType<TopTagsBySubscriberItemType[]> {
  limit: number;
}

/**
 * @description 태그별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTopTagsBySubscriber(options: OptionType = { limit: 10, }) {
  const { limit, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
