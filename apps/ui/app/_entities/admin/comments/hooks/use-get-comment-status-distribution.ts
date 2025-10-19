import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CommentStatusDistributionItemType } from '@/_types';

interface UseGetCommentStatusDistributionOptions extends QueryOptionType<CommentStatusDistributionItemType[]> {}

/**
 * @description 댓글 상태별 분포를 조회하는 커스텀 훅
 * @param {UseGetCommentStatusDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCommentStatusDistribution(options: UseGetCommentStatusDistributionOptions = {}) {
  const query = useGet<CommentStatusDistributionItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'status-distribution',
    ],
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
