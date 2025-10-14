import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseGetSubscribeOptions extends QueryOptionType<SelectUserSbcrInfoType> {}

/**
 * @description 현재 로그인한 사용자의 구독 정보 조회를 위한 커스텀 훅
 * @param {UseGetSubscribeOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 구독 정보 조회 쿼리 객체
 */
export function useGetSubscribe(options: UseGetSubscribeOptions = {}) {
  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'users', 'subscribe',
    ],
    key: usersKeys.subscribeInfo(),
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
