import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { SearchSubscribeType } from '@/_schemas/subscribe.schema';
import type { UserSubscribeInfoType } from '@/_types/subscribe.types';

interface UseAdminSearchSubscribesOptions extends QueryOptionType<{ list: UserSubscribeInfoType[]; totalCnt: number }> {
  searchParams?: SearchSubscribeType;
}

export function useAdminSearchSubscribes(options: UseAdminSearchSubscribesOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<{ list: UserSubscribeInfoType[]; totalCnt: number }, SearchSubscribeType>({
    url: [
      'admin', 'subscribes', 'search',
    ],
    key: adminSubscribeKeys.search(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
