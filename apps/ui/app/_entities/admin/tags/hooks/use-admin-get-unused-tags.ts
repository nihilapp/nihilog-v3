import type { UnusedTagItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 미사용 태그 목록을 조회하는 커스텀 훅
 */
export function useAdminGetUnusedTags() {
  const query = useGet<UnusedTagItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'unused',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
