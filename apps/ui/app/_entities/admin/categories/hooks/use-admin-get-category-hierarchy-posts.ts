import { useGet } from '@/_entities/common/hooks';
import type { CategoryHierarchyPostDistributionItemType } from '@/_types';

/**
 * @description 카테고리 계층별 포스트 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryHierarchyPosts() {
  const query = useGet<CategoryHierarchyPostDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-posts',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
