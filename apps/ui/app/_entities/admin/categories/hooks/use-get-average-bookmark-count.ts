import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageBookmarkPerCategoryItemType } from '@/_types';

interface UseGetAverageBookmarkCountOptions extends QueryOptionType<AverageBookmarkPerCategoryItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 평균 북마크 수 / 카테고리를 조회하는 커스텀 훅
 * @param {UseGetAverageBookmarkCountOptions} options - 쿼리 옵션
 */
export function useGetAverageBookmarkCount(options: UseGetAverageBookmarkCountOptions) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<AverageBookmarkPerCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'average-bookmarks',
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
