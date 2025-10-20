import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateSubscribeType } from '@/_schemas';
import type { UserSubscribeInfoType } from '@/_types';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

interface OptionType extends MutationOptionsType<UserSubscribeInfoType, CreateSubscribeType> {}

/**
 * @description 관리자가 특정 사용자 구독 설정을 생성하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminCreateUserSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<UserSubscribeInfoType, CreateSubscribeType>({
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
    ...options,
  });

  return mutation;
}
