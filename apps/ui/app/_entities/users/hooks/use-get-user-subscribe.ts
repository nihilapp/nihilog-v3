import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseGetUserSubscribeOptions extends QueryOptionType<SelectUserSbcrInfoType> {}

/**
 * @description 이메일 구독 설정을 조회하는 커스텀 훅
 * @param {UseGetUserSubscribeOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserSubscribe(options: UseGetUserSubscribeOptions = {}) {
  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'users',
      'subscribe',
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
