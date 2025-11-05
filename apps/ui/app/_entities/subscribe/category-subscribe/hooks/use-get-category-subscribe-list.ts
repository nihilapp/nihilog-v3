import { useGet } from '@/_entities/common/hooks';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { ListType, SelectCtgrySbcrMpngListItemType } from '@/_types';

/**
 * @description 사용자가 구독한 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategorySubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetCategorySubscribeList(params?: SearchCategorySubscribeType) {
  const query = useGet<ListType<SelectCtgrySbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      'search',
    ],
    params,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
