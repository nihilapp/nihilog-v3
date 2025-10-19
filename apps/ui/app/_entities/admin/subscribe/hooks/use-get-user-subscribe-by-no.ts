import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseGetUserSubscribeByNoOptions extends QueryOptionType<SelectUserSbcrInfoType> {
  userNo: number;
}

/**
 * @description 특정 사용자 구독 설정을 조회하는 커스텀 훅
 * @param {UseGetUserSubscribeByNoOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserSubscribeByNo(options: UseGetUserSubscribeByNoOptions = { userNo: 0, }) {
  const { userNo, ...queryOptions } = options;

  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'admin',
      'subscribes',
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
    ...queryOptions,
  });

  return query;
}
