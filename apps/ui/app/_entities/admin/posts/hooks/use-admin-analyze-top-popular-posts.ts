import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopPopularPostItemType } from '@/_types/post.types';

interface UseAdminAnalyzeTopPopularPostsOptions extends MutationOptionsType<TopPopularPostItemType[], { limit: number; analyzeStatData?: AnalyzeStatType }> {
  limit?: number;
}

export function useAdminAnalyzeTopPopularPosts(options: UseAdminAnalyzeTopPopularPostsOptions = {}) {
  const query = usePost<TopPopularPostItemType[], { limit: number; analyzeStatData?: AnalyzeStatType }>({
    url: [
      'admin', 'posts', 'analyze', 'top-popular',
    ],
    key: adminPostsKeys.analyzeTopPopularPosts(options.limit || 10),
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
