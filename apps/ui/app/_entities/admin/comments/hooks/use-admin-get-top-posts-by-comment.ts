import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopPostsByCommentItemType } from '@/_types';

interface OptionType extends QueryOptionType<TopPostsByCommentItemType[]> {}

/**
 * @description 포스트별 댓글 수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTopPostsByComment(
  analyzeStatData: AnalyzeStatType,
  options: OptionType = {}
) {
  const query = useGet<TopPostsByCommentItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'top-posts',
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
