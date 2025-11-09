import type { SearchSubscribeType } from '@nihilog/schemas';
import type { ListType, SelectUserSbcrInfoListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 전체 사용자 구독 설정 목록을 조회하는 커스텀 훅
 * @param {SearchSubscribeType} searchData - 검색 데이터
 */
export function useAdminGetUserSubscribeList(searchData: SearchSubscribeType) {
  const query = useGet<ListType<SelectUserSbcrInfoListItemType>>({
    url: [
      'admin',
      'subscribes',
    ],
    params: searchData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
