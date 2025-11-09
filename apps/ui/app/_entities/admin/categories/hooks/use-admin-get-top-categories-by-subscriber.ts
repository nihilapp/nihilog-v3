import type { TopCategoriesBySubscriberItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 카테고리별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {number} [limit=10] - 상위 N개
 */
export function useAdminGetTopCategoriesBySubscriber(limit: number = 10) {
  const query = useGet<TopCategoriesBySubscriberItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'top-subscribers',
    ],
    params: {
      limit,
    },
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
