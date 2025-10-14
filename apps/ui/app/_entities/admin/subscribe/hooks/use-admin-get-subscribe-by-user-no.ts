import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { UserSubscribeInfoType } from '@/_types/subscribe.types';

interface UseAdminGetSubscribeByUserNoOptions extends QueryOptionType<UserSubscribeInfoType> {}

export function useAdminGetSubscribeByUserNo(userNo: number, options: UseAdminGetSubscribeByUserNoOptions = {}) {
  const query = useGet<UserSubscribeInfoType>({
    url: [
      'admin', 'subscribes', userNo,
    ],
    key: adminSubscribeKeys.byUserNo(userNo),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
