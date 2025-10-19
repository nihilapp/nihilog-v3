import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseGetUserByNameOptions extends QueryOptionType<SelectUserInfoType> {
  name: string;
}

/**
 * @description 사용자명으로 사용자를 조회하는 커스텀 훅
 * @param {UseGetUserByNameOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserByName(options: UseGetUserByNameOptions = { name: '', }) {
  const { name, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
