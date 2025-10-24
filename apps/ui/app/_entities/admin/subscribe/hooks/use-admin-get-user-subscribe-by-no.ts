import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserSbcrInfoType } from '@/_types';

interface OptionType extends QueryOptionType<SelectUserSbcrInfoType> {}

/**
 * @description 특정 사용자 구독 설정을 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserSubscribeByNo(userNo: number, options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
