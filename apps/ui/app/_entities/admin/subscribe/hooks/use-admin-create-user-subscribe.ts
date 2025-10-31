import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateSubscribeType } from '@/_schemas';
import type { SelectUserSbcrInfoType } from '@/_types';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

/**
 * @description 관리자가 특정 사용자 구독 설정을 생성하는 커스텀 훅
 */
export function useAdminCreateUserSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<SelectUserSbcrInfoType, CreateSubscribeType>({
    url: [
      'admin',
      'subscribes',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Subscribe 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return mutation;
}
