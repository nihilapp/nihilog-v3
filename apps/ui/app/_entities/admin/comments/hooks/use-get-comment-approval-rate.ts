import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentApprovalRateItemType } from '@/_types';

interface UseGetCommentApprovalRateOptions extends QueryOptionType<CommentApprovalRateItemType[]> {}

/**
 * @description 댓글 승인율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetCommentApprovalRateOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCommentApprovalRate(
  analyzeStatData: AnalyzeStatType,
  options: UseGetCommentApprovalRateOptions = {}
) {
  const query = useGet<CommentApprovalRateItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'approval-rate',
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
