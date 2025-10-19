import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentReplyRatioItemType } from '@/_types';

interface UseGetCommentReplyRatioOptions extends QueryOptionType<CommentReplyRatioItemType[]> {}

/**
 * @description 답글 비율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetCommentReplyRatioOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCommentReplyRatio(
  analyzeStatData: AnalyzeStatType,
  options: UseGetCommentReplyRatioOptions = {}
) {
  const query = useGet<CommentReplyRatioItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'reply-ratio',
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
