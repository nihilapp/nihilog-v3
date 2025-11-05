import { useGet } from '@/_entities/common/hooks';
import type { TagWithoutSubscribersItemType } from '@/_types';

/**
 * @description 구독자 없는 태그 목록을 조회하는 커스텀 훅
 */
export function useAdminGetTagsWithoutSubscribers() {
  const query = useGet<TagWithoutSubscribersItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'no-subscribers',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
