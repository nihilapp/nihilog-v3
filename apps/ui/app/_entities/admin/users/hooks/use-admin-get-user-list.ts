import type { SearchUserType } from '@nihilog/schemas';
import type { ListType, SelectUserInfoListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용자 목록을 조회하는 커스텀 훅
 * @param {SearchUserType} searchData - 검색 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUserList(searchData: SearchUserType, enabled: boolean = true) {
  const query = useGet<ListType<SelectUserInfoListItemType>>({
    url: [
      'admin',
      'users',
    ],
    params: searchData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
