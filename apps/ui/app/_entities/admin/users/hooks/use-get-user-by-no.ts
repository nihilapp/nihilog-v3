import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseGetUserByNoOptions extends QueryOptionType<SelectUserInfoType> {
  userNo: number;
}

/**
 * @description 사용자 번호로 사용자를 조회하는 커스텀 훅
 * @param {UseGetUserByNoOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserByNo(options: UseGetUserByNoOptions = { userNo: 0, }) {
  const { userNo, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
