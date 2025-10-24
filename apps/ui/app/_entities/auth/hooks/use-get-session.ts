import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UserInfoType } from '@/_types';

interface OptionType extends QueryOptionType<UserInfoType> {}

/**
 * @description 현재 로그인된 사용자의 세션 정보를 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetSession(options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
