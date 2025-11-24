import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 사용자 번호로 사용자를 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUserByNo(userNo: number, enabled: boolean = true) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      userNo.toString(),
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
