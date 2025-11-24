import type { TagLifecycleItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그 생명주기 분석을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagLifecycleAnalysis(enabled: boolean = true) {
  const query = useGet<TagLifecycleItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'lifecycle',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
