import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 현재 로그인한 사용자의 프로필 정보를 조회하는 커스텀 훅
 */
export function useGetUserProfile() {
  const query = useGet<SelectUserInfoType>({
    url: [
      'users',
      'profile',
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
