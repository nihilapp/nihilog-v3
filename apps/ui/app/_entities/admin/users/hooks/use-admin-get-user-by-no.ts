import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface OptionType extends QueryOptionType<SelectUserInfoType> {}

/**
 * @description 사용자 번호로 사용자를 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserByNo(userNo: number, options: OptionType = {}) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      userNo.toString(),
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
