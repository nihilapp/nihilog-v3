import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AverageViewStatItemType } from '@/_types/post.types';

interface UseAdminAnalyzeAverageViewsOptions extends QueryOptionType<AverageViewStatItemType[]> {
  searchParams?: AnalyzeStatType;
}

export function useAdminAnalyzeAverageViews(options: UseAdminAnalyzeAverageViewsOptions = {}) {
  const { searchParams, ...queryOptions } = options;

  const query = usePostQuery<AverageViewStatItemType[], AnalyzeStatType | undefined>({
    url: [
      'admin', 'posts', 'analyze', 'average-views',
    ],
    key: adminPostsKeys.analyzeAverageViews(),
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
