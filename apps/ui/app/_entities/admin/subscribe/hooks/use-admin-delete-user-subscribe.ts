import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

/**
 * @description 특정 사용자 구독 설정을 삭제하는 커스텀 훅
 * @param {number} sbcrNo - 구독 번호
 */
export function useAdminDeleteUserSubscribe(sbcrNo: number) {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDelete<boolean>({
    url: [
      'admin',
      'subscribes',
      sbcrNo.toString(),
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
