import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchSubscribeType } from '@/_schemas/subscribe.schema';
import type { UserSubscribeInfoType } from '@/_types/subscribe.types';

interface UseAdminSearchSubscribesOptions extends MutationOptionsType<{ list: UserSubscribeInfoType[]; totalCnt: number }, SearchSubscribeType> {}

export function useAdminSearchSubscribes(options: UseAdminSearchSubscribesOptions = {}) {
  const query = usePost<{ list: UserSubscribeInfoType[]; totalCnt: number }, SearchSubscribeType>({
    url: [
      'admin', 'subscribes', 'search',
    ],
    key: adminSubscribeKeys.search(),
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
