import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeCategoryStatItemType } from '@/_types';

interface UseGetAnalyzeCategoryDataOptions extends QueryOptionType<AnalyzeCategoryStatItemType[]> {
  analyzeStatData: AnalyzeStatType;
  ctgryNo?: number;
}

/**
 * @description 카테고리 분석 통계를 조회하는 커스텀 훅
 * @param {UseGetAnalyzeCategoryDataOptions} options - 쿼리 옵션
 */
export function useGetAnalyzeCategoryData(options: UseGetAnalyzeCategoryDataOptions) {
  const { analyzeStatData, ctgryNo, ...queryOptions } = options;

  const query = useGet<AnalyzeCategoryStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'overview',
    ],
    params: {
      ...analyzeStatData,
      ctgryNo,
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
