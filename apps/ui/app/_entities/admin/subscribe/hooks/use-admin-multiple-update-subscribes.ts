import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas/subscribe.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminMultipleUpdateSubscribesOptions extends MutationOptionsType<MultipleResultType, UpdateSubscribeType> {}

/**
 * @description 관리자용 다수 구독 일괄 수정을 위한 커스텀 훅
 * @param {UseAdminMultipleUpdateSubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 구독 일괄 수정 뮤테이션 객체
 */
export function useAdminMultipleUpdateSubscribes(options: UseAdminMultipleUpdateSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType, UpdateSubscribeType>({
    url: [
      'admin', 'subscribes', 'multiple',
    ],
    key: adminSubscribeKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 구독 수정 성공 시 관련 쿼리 무효화
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
