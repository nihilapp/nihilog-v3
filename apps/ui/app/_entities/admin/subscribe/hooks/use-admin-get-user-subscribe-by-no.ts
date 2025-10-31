import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserSbcrInfoType } from '@/_types';

/**
 * @description 특정 사용자 구독 설정을 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 */
export function useAdminGetUserSubscribeByNo(userNo: number) {
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
  });

  return query;
}
