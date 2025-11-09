import type { SearchTagSubscribeType } from '@nihilog/schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 특정 태그의 구독 상태를 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetTagSubscribeByTagNo(tagNo: number, params?: SearchTagSubscribeType) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagNo.toString(),
      'search',
    ],
    params,
    enabled: !!tagNo,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
