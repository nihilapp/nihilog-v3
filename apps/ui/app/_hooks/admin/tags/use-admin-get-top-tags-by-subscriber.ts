import type { TopTagsBySubscriberItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {number} limit - 상위 N개
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTopTagsBySubscriber(limit: number = 10, enabled: boolean = true) {
  const query = useGet<TopTagsBySubscriberItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'top-subscribers',
    ],
    params: {
      limit,
    },
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
