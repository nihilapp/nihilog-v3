import type { UnusedTagItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 미사용 태그 목록을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUnusedTags(enabled: boolean = true) {
  const query = useGet<UnusedTagItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'unused',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
