import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

interface UseDeleteUserSubscribeOptions extends MutationOptionsType<boolean, void> {
  sbcrNo: number;
}

/**
 * @description 특정 사용자 구독 설정을 삭제하는 커스텀 훅
 * @param {UseDeleteUserSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteUserSubscribe(options: UseDeleteUserSubscribeOptions = { sbcrNo: 0, }) {
  const { sbcrNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDelete<boolean, void>({
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
    ...mutationOptions,
  });

  return mutation;
}
