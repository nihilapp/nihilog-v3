import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagStatusDistributionItemType } from '@/_types';

interface UseGetTagStatusDistributionOptions extends QueryOptionType<TagStatusDistributionItemType[]> {}

/**
 * @description 태그 상태별 분포를 조회하는 커스텀 훅
 * @param {UseGetTagStatusDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagStatusDistribution(options: UseGetTagStatusDistributionOptions = {}) {
  const query = useGet<TagStatusDistributionItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'status-distribution',
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
