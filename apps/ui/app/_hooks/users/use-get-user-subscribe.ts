import type { SelectUserSbcrInfoType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 이메일 구독 설정을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetUserSubscribe(enabled: boolean = true) {
  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'users',
      'subscribe',
    ],
    enabled,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
