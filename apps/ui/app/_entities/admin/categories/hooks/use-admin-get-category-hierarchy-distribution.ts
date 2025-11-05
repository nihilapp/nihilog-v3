import { useGet } from '@/_entities/common/hooks';
import type { CategoryHierarchyDistributionItemType } from '@/_types';

/**
 * @description 카테고리 계층별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryHierarchyDistribution() {
  const query = useGet<CategoryHierarchyDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
