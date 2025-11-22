import type { SearchCategorySubscribeType } from '@nihilog/schemas';
import type { ListType, SelectCtgrySbcrMpngListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 특정 카테고리의 구독 상태를 조회하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 * @param {SearchCategorySubscribeType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetCategorySubscribeByCtgryNo(ctgryNo: number, params?: SearchCategorySubscribeType, enabled: boolean = true) {
  const query = useGet<ListType<SelectCtgrySbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgryNo.toString(),
      'search',
    ],
    params,
    enabled: enabled && !!ctgryNo,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
