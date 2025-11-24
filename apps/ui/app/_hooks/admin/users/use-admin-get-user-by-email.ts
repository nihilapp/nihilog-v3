import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 이메일로 사용자를 조회하는 커스텀 훅
 * @param {string} email - 이메일 주소
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUserByEmail(email: string, enabled: boolean = true) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      'email',
      email,
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
