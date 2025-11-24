import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 현재 로그인한 사용자의 프로필 정보를 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetUserProfile(enabled: boolean = true) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'users',
      'profile',
    ],
    enabled,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
