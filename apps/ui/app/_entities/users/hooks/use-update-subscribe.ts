import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas/subscribe.schema';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseUpdateSubscribeOptions extends MutationOptionsType<SelectUserSbcrInfoType, UpdateSubscribeType> {}

/**
 * @description 사용자 구독 정보 수정을 위한 커스텀 훅
 * @param {UseUpdateSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 구독 정보 수정 뮤테이션 객체
 */
export function useUpdateSubscribe(options: UseUpdateSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<SelectUserSbcrInfoType, UpdateSubscribeType>({
    url: [
      'users', 'subscribe',
    ],
    key: usersKeys.updateSubscribe(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 구독 정보 업데이트 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.subscribeInfo().queryKey,
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
