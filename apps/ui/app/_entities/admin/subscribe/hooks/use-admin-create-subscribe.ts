import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateSubscribeType } from '@/_schemas/subscribe.schema';
import type { SelectUserSbcrInfoType } from '@/_types';

interface UseAdminCreateSubscribeOptions extends MutationOptionsType<SelectUserSbcrInfoType, CreateSubscribeType> {}

/**
 * @description 관리자용 구독 생성을 위한 커스텀 훅
 * @param {UseAdminCreateSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 구독 생성 뮤테이션 객체
 */
export function useAdminCreateSubscribe(options: UseAdminCreateSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<SelectUserSbcrInfoType, CreateSubscribeType>({
    url: [
      'admin', 'subscribe',
    ],
    key: adminSubscribeKeys.createSubscribe(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 구독 생성 성공 시 관련 쿼리 무효화
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
