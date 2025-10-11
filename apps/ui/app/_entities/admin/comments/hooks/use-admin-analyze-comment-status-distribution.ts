import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { CommentStatusDistributionItemType } from '@/_types/comment.types';

interface UseAdminAnalyzeCommentStatusDistributionOptions extends QueryOptionType<CommentStatusDistributionItemType[]> {}

export function useAdminAnalyzeCommentStatusDistribution(options: UseAdminAnalyzeCommentStatusDistributionOptions = {}) {
  const query = useGet<CommentStatusDistributionItemType[]>({
    url: [
      'admin', 'comments', 'analyze', 'status-distribution',
    ],
    key: adminCommentsKeys.analyzeCommentStatusDistribution(),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
