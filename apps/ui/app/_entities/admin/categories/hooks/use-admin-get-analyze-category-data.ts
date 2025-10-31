import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeCategoryStatItemType } from '@/_types';

/**
 * @description 카테고리 분석 통계를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [ctgryNo] - 카테고리 번호 (선택사항)
 */
export function useAdminGetAnalyzeCategoryData(
  analyzeStatData: AnalyzeStatType,
  ctgryNo?: number
) {
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
  });

  return query;
}
