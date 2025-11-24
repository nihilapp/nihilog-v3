import type { CategoriesWithoutSubscribersItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 구독자가 없는 카테고리 목록을 조회하는 커스텀 훅
 */
export function useAdminGetCategoriesWithoutSubscribers() {
  const query = useGet<CategoriesWithoutSubscribersItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'no-subscribers',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
