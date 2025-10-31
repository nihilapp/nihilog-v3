import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzePostItemType } from '@/_types';

/**
 * @description 포스트 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [pstNo] - 포스트 번호 (선택사항)
 */
export function useAdminGetAnalyzePostData(
  analyzeStatData: AnalyzeStatType,
  pstNo?: number
) {
  const query = useGet<AnalyzePostItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'overview',
    ],
    params: {
      ...analyzeStatData,
      pstNo,
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
