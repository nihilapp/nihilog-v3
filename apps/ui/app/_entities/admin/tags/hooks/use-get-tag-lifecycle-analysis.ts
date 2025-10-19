import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagLifecycleItemType } from '@/_types';

interface UseGetTagLifecycleAnalysisOptions extends QueryOptionType<TagLifecycleItemType[]> {}

/**
 * @description 태그 생명주기 분석을 조회하는 커스텀 훅
 * @param {UseGetTagLifecycleAnalysisOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagLifecycleAnalysis(options: UseGetTagLifecycleAnalysisOptions = {}) {
  const query = useGet<TagLifecycleItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'lifecycle',
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
