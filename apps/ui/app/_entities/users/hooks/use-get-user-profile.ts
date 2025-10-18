import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseGetUserProfileOptions extends QueryOptionType<SelectUserInfoType> {}

/**
 * @description 현재 로그인한 사용자의 프로필 정보를 조회하는 커스텀 훅
 * @param {UseGetUserProfileOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserProfile(options: UseGetUserProfileOptions = {}) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'users',
      'profile',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return query;
}
