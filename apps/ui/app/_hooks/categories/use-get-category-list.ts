import type { SearchCategoryType } from '@nihilog/schemas';
import type { ListType, SelectCategoryListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategoryType} [searchData] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetCategoryList(searchData?: SearchCategoryType, enabled: boolean = true) {
  const query = useGet<ListType<SelectCategoryListItemType>>({
    url: [
      'categories',
      'search',
    ],
    params: searchData ?? {},
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
