import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopPopularPostItemType } from '@/_types';

interface UseGetTopPopularPostsOptions extends QueryOptionType<TopPopularPostItemType[]> {}

/**
 * @description 인기 포스트 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetTopPopularPostsOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTopPopularPosts(
  analyzeStatData: AnalyzeStatType,
  options: UseGetTopPopularPostsOptions = {}
) {
  const query = useGet<TopPopularPostItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'top-popular',
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
