import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeTagStatItemType } from '@/_types';

/**
 * @description 태그 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [tagNo] - 태그 번호 (선택사항)
 */
export function useAdminGetAnalyzeTagData(
  analyzeStatData: AnalyzeStatType,
  tagNo?: number
) {
  const query = useGet<AnalyzeTagStatItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'overview',
    ],
    params: {
      ...analyzeStatData,
      tagNo,
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
