import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopCategoriesBySubscriberItemType } from '@/_types';

interface OptionType extends QueryOptionType<TopCategoriesBySubscriberItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetTopCategoriesBySubscriber(options: OptionType) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<TopCategoriesBySubscriberItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'top-subscriber',
    ],
    params: analyzeStatData,
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
