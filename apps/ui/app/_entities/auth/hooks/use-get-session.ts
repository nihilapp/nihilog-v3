import { useGet } from '@/_entities/common/hooks';
import type { SelectUserInfoType } from '@/_types';

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
