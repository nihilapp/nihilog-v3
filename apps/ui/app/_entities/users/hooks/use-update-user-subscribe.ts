import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseUpdateUserSubscribeOptions extends MutationOptionsType<SelectUserSbcrInfoType, UpdateSubscribeType> {}

/**
 * @description 이메일 구독 설정을 변경하는 커스텀 훅
 * @param {UseUpdateUserSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateUserSubscribe(options: UseUpdateUserSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePut<SelectUserSbcrInfoType, UpdateSubscribeType>({
    url: [
      'users', 'subscribe',
    ],
    callback() {
      toast.success('구독 설정이 변경되었습니다.', {
        style: getToastStyle('success'),
      });

      // 구독 정보 무효화
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

  return mutation;
}
