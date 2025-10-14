import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagSubscribeKeys } from '@/_entities/admin/tag-subscribe/admin-tag-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateTagSubscribeType, SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminUpdateMultipleTagSubscribesOptions extends MutationOptionsType<MultipleResultType, UpdateTagSubscribeType> {}

export function useAdminUpdateMultipleTagSubscribes(options: UseAdminUpdateMultipleTagSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType, UpdateTagSubscribeType>({
    url: [
      'admin', 'subscribes', 'multiple',
    ],
    key: adminTagSubscribeKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 구독 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.search({} as SearchTagSubscribeType).queryKey,
      });
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
