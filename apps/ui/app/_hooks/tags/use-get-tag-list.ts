import type { SearchTagType } from '@nihilog/schemas';
import type { ListType, SelectTagInfoListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그 목록을 조회하는 커스텀 훅
 * @param {SearchTagType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetTagList(params?: SearchTagType, enabled: boolean = true) {
  const query = useGet<ListType<SelectTagInfoListItemType>>({
    url: [ 'tags', ],
    params,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
