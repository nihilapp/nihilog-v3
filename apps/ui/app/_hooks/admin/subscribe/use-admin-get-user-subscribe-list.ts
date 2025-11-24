import type { SearchSubscribeType } from '@nihilog/schemas';
import type { ListType, SelectUserSbcrInfoListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 전체 사용자 구독 설정 목록을 조회하는 커스텀 훅
 * @param {SearchSubscribeType} searchData - 검색 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUserSubscribeList(searchData: SearchSubscribeType, enabled: boolean = true) {
  const query = useGet<ListType<SelectUserSbcrInfoListItemType>>({
    url: [
      'admin',
      'subscribes',
    ],
    params: searchData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
