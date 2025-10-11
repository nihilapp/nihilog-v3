import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagSubscribeKeys } from '@/_entities/admin/tag-subscribe/admin-tag-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminDeleteMultipleTagSubscribesOptions extends MutationOptionsType<MultipleResultType, DeleteTagSubscribeType> {}

export function useAdminDeleteMultipleTagSubscribes(options: UseAdminDeleteMultipleTagSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType, DeleteTagSubscribeType>({
    url: [
      'admin', 'subscribes', 'tags', 'multiple',
    ],
    key: adminTagSubscribeKeys.deleteMultipleTagSubscribes(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 구독 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.tagSubscribeList({}).queryKey,
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
