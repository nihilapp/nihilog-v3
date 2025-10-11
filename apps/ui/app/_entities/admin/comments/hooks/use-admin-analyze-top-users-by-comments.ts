import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopUsersByCommentItemType } from '@/_types/comment.types';

interface UseAdminAnalyzeTopUsersByCommentsOptions extends MutationOptionsType<TopUsersByCommentItemType[], AnalyzeStatType> {
  limit?: number;
}

export function useAdminAnalyzeTopUsersByComments(options: UseAdminAnalyzeTopUsersByCommentsOptions = {}) {
  const query = usePost<TopUsersByCommentItemType[], AnalyzeStatType>({
    url: [
      'admin', 'comments', 'analyze', 'top-users',
    ],
    key: adminCommentsKeys.analyzeTopUsersByComments(options.limit || 10),
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
