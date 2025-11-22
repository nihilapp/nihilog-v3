import type { SearchCategorySubscribeType } from '@nihilog/schemas';
import type { ListType, SelectCtgrySbcrMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용자가 구독한 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategorySubscribeType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetCategorySubscribeList(params?: SearchCategorySubscribeType, enabled: boolean = true) {
  const query = useGet<ListType<SelectCtgrySbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      'search',
    ],
    params,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
