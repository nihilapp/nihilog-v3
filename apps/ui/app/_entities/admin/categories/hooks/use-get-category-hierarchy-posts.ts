import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CategoryHierarchyPostDistributionItemType } from '@/_types';

interface UseGetCategoryHierarchyPostsOptions extends QueryOptionType<CategoryHierarchyPostDistributionItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 계층별 포스트 분포를 조회하는 커스텀 훅
 * @param {UseGetCategoryHierarchyPostsOptions} options - 쿼리 옵션
 */
export function useGetCategoryHierarchyPosts(options: UseGetCategoryHierarchyPostsOptions) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<CategoryHierarchyPostDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-posts',
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
    ...queryOptions,
  });

  return query;
}
