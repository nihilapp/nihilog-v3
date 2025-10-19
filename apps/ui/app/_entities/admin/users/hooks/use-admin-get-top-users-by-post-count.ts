import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopUsersByPostCountItemType } from '@/_types';

interface UseAdminGetTopUsersByPostCountOptions extends QueryOptionType<TopUsersByPostCountItemType[]> {}

/**
 * @description 사용자별 포스트 작성 수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseAdminGetTopUsersByPostCountOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTopUsersByPostCount(
  analyzeStatData: AnalyzeStatType,
  options: UseAdminGetTopUsersByPostCountOptions = {}
) {
  const query = useGet<TopUsersByPostCountItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'top-post-count',
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
    ...options,
  });

  return query;
}
