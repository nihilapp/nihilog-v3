import type { CategoryHierarchySubscriberDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리 계층별 구독자 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryHierarchySubscribers() {
  const query = useGet<CategoryHierarchySubscriberDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-subscribers',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
