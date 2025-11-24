import type { SearchTagSubscribeType } from '@nihilog/schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 특정 태그의 구독 상태를 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetTagSubscribeByTagNo(tagNo: number, params?: SearchTagSubscribeType, enabled: boolean = true) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagNo.toString(),
      'search',
    ],
    params,
    enabled: enabled && !!tagNo,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
