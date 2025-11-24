import type { SearchTagSubscribeType } from '@nihilog/schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 사용자가 구독한 태그 목록을 조회하는 커스텀 훅
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetTagSubscribeList(params?: SearchTagSubscribeType, enabled: boolean = true) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      'search',
    ],
    params,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
