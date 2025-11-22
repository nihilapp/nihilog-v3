import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용자명으로 사용자를 조회하는 커스텀 훅
 * @param {string} name - 사용자명
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetUserByName(name: string, enabled: boolean = true) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      'name',
      name,
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
