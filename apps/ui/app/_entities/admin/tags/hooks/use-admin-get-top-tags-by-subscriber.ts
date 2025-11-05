import { useGet } from '@/_entities/common/hooks';
import type { TopTagsBySubscriberItemType } from '@/_types';

/**
 * @description 태그별 구독자 수 TOP N을 조회하는 커스텀 훅
 * @param {number} limit - 상위 N개
 */
export function useAdminGetTopTagsBySubscriber(limit: number = 10) {
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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
