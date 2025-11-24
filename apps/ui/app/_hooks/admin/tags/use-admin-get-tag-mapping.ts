import type { SearchPstTagMpngType } from '@nihilog/schemas';
import type { ListType, SelectPstTagMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그 매핑을 조회하는 커스텀 훅
 * @param {SearchPstTagMpngType} searchData - 검색 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagMapping(searchData: SearchPstTagMpngType, enabled: boolean = true) {
  const query = useGet<ListType<SelectPstTagMpngListItemType>>({
    url: [
      'admin',
      'tags',
      'mapping',
      'search',
    ],
    params: searchData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
