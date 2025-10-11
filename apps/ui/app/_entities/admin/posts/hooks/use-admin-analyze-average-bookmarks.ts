import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AverageBookmarkStatItemType } from '@/_types/post.types';

interface UseAdminAnalyzeAverageBookmarksOptions extends MutationOptionsType<AverageBookmarkStatItemType[], AnalyzeStatType> {}

export function useAdminAnalyzeAverageBookmarks(options: UseAdminAnalyzeAverageBookmarksOptions = {}) {
  const query = usePost<AverageBookmarkStatItemType[], AnalyzeStatType>({
    url: [
      'admin', 'posts', 'analyze', 'average-bookmarks',
    ],
    key: adminPostsKeys.analyzeAverageBookmarks(),
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
