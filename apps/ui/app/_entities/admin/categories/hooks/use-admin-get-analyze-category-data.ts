import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeCategoryStatItemType } from '@/_types';

interface OptionType extends QueryOptionType<AnalyzeCategoryStatItemType[]> {
  analyzeStatData: AnalyzeStatType;
  ctgryNo?: number;
}

/**
 * @description 카테고리 분석 통계를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetAnalyzeCategoryData(options: OptionType) {
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
