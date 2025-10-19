import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseGetUserByEmailOptions extends QueryOptionType<SelectUserInfoType> {
  email: string;
}

/**
 * @description 이메일로 사용자를 조회하는 커스텀 훅
 * @param {UseGetUserByEmailOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserByEmail(options: UseGetUserByEmailOptions = { email: '', }) {
  const { email, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
