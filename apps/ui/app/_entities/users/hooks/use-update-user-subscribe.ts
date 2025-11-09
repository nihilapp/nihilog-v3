import type { UpdateSubscribeType } from '@nihilog/schemas';
import type { SelectUserSbcrInfoType } from '@nihilog/schemas';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateUserSubscribeCache } from '@/_entities/users/users.keys';

/**
 * @description 이메일 구독 설정을 변경하는 커스텀 훅
 */
export function useUpdateUserSubscribe() {
  const invalidateCache = useInvalidateUserSubscribeCache();

  const mutation = usePut<SelectUserSbcrInfoType, UpdateSubscribeType>({
    url: [
      'users',
      'subscribe',
    ],
    callback(_res) {
      // 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
