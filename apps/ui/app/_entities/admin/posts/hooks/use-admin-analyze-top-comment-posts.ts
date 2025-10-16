import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopCommentPostItemType } from '@/_types/post.types';

interface UseAdminAnalyzeTopCommentPostsOptions extends QueryOptionType<TopCommentPostItemType[]> {
  limit?: number;
  searchParams?: { limit: number; analyzeStatData?: AnalyzeStatType };
}

export function useAdminAnalyzeTopCommentPosts(options: UseAdminAnalyzeTopCommentPostsOptions = {}) {
  const { limit, searchParams = { limit: limit || 10, }, ...queryOptions } = options;

  const query = usePostQuery<TopCommentPostItemType[], { limit: number; analyzeStatData?: AnalyzeStatType }>({
    url: [
      'admin', 'posts', 'analyze', 'top-comments',
    ],
    key: adminPostsKeys.analyzeTopCommentPosts(searchParams.limit),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
