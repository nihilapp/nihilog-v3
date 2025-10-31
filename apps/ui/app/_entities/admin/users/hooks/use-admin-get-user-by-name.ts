import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 사용자명으로 사용자를 조회하는 커스텀 훅
 * @param {string} name - 사용자명
 */
export function useAdminGetUserByName(name: string) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      'name',
      name,
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
