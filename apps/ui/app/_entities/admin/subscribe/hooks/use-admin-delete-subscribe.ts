import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';

interface UseAdminDeleteSubscribeOptions extends MutationOptionsType<boolean> {}

/**
 * @description 관리자용 구독 삭제를 위한 커스텀 훅
 * @param {number} sbcrNo - 삭제할 구독 번호
 * @param {UseAdminDeleteSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 구독 삭제 뮤테이션 객체
 */
export function useAdminDeleteSubscribe(sbcrNo: number, options: UseAdminDeleteSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<boolean>({
    url: [
      'admin', 'subscribes', sbcrNo,
    ],
    key: adminSubscribeKeys.deleteSubscribe(sbcrNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 구독 삭제 성공 시 관련 쿼리 무효화
      // 관리자 구독 목록만 무효화 (전체 캐시 무효화 불필요)
      queryClient.invalidateQueries({
        queryKey: adminSubscribeKeys.searchSubscribes().queryKey,
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
