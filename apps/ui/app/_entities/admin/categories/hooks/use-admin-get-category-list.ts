import type { SearchCategoryType } from '@nihilog/schemas';
import type { ListType, SelectCategoryListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategoryType} searchData - 검색 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetCategoryList(searchData: SearchCategoryType, enabled: boolean = true) {
  const query = useGet<ListType<SelectCategoryListItemType>>({
    url: [
      'admin',
      'categories',
    ],
    params: searchData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
