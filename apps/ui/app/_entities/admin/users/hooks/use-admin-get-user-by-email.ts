import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 이메일로 사용자를 조회하는 커스텀 훅
 * @param {string} email - 이메일 주소
 */
export function useAdminGetUserByEmail(email: string) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      'email',
      email,
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
  });

  return query;
}
