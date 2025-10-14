import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { DeleteSubscribeType } from '@/_schemas/subscribe.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminMultipleDeleteSubscribesOptions extends MutationOptionsType<MultipleResultType, DeleteSubscribeType> {}

/**
 * @description 관리자용 다수 구독 일괄 삭제를 위한 커스텀 훅
 * @param {UseAdminMultipleDeleteSubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 구독 일괄 삭제 뮤테이션 객체
 */
export function useAdminMultipleDeleteSubscribes(options: UseAdminMultipleDeleteSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType, DeleteSubscribeType>({
    url: [
      'admin', 'subscribes', 'multiple',
    ],
    key: adminSubscribeKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 구독 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminSubscribeKeys.search().queryKey,
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
