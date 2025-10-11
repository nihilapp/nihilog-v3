import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopPostsByCommentItemType } from '@/_types/comment.types';

interface UseAdminAnalyzeTopPostsByCommentsOptions extends MutationOptionsType<TopPostsByCommentItemType[], AnalyzeStatType> {
  limit?: number;
}

export function useAdminAnalyzeTopPostsByComments(options: UseAdminAnalyzeTopPostsByCommentsOptions = {}) {
  const query = usePost<TopPostsByCommentItemType[], AnalyzeStatType>({
    url: [
      'admin', 'comments', 'analyze', 'top-posts',
    ],
    key: adminCommentsKeys.analyzeTopPostsByComments(options.limit || 10),
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
