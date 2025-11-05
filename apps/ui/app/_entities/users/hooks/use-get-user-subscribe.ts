import { useGet } from '@/_entities/common/hooks';
import type { SelectUserSbcrInfoType } from '@/_types';

/**
 * @description 이메일 구독 설정을 조회하는 커스텀 훅
 */
export function useGetUserSubscribe() {
  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'users',
      'subscribe',
    ],
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
