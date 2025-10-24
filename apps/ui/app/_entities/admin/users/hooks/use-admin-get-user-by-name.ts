import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface OptionType extends QueryOptionType<SelectUserInfoType> {}

/**
 * @description 사용자명으로 사용자를 조회하는 커스텀 훅
 * @param {string} name - 사용자명
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserByName(name: string, options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
