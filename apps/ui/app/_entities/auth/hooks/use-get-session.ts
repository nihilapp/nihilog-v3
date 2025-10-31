import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UserInfoType } from '@/_types';

/**
 * @description 현재 로그인된 사용자의 세션 정보를 조회하는 커스텀 훅
 */
export function useGetSession() {
  const query = useGet<UserInfoType>({
    url: [
      'auth',
      'session',
    ],
    callback(_res) {
      //
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return query;
}
