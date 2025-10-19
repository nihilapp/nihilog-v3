import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { PostStatusRatioItemType } from '@/_types';

interface UseGetPostStatusRatioOptions extends QueryOptionType<PostStatusRatioItemType[]> {}

/**
 * @description 포스트 상태 비율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetPostStatusRatioOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetPostStatusRatio(
  analyzeStatData: AnalyzeStatType,
  options: UseGetPostStatusRatioOptions = {}
) {
  const query = useGet<PostStatusRatioItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'status-ratio',
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
