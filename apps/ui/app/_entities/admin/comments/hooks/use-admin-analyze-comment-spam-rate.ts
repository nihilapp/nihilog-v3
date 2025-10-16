import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { CommentSpamRateItemType } from '@/_types/comment.types';

interface UseAdminAnalyzeCommentSpamRateOptions extends MutationOptionsType<CommentSpamRateItemType[], AnalyzeStatType> {}

export function useAdminAnalyzeCommentSpamRate(options: UseAdminAnalyzeCommentSpamRateOptions = {}) {
  const query = usePost<CommentSpamRateItemType[], AnalyzeStatType>({
    url: [
      'admin', 'comments', 'analyze', 'spam-rate',
    ],
    key: adminCommentsKeys.analyzeCommentSpamRate(),
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
