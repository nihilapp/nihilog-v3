import { useGet } from '@/_entities/common/hooks';
import type { SearchTagSubscribeType } from '@/_schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@/_types';

/**
 * @description 사용자가 구독한 태그 목록을 조회하는 커스텀 훅
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetTagSubscribeList(params?: SearchTagSubscribeType) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      'search',
    ],
    params,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
