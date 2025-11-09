import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 현재 로그인된 사용자의 세션 정보를 조회하는 커스텀 훅
 */
export function useGetSession() {
  const query = useGet<SelectUserInfoType>({
    url: [
      'auth',
      'session',
    ],
    callback(_res) {
    },
    errorCallback(_error) {
      //
    },
  });

  return query;
}
