import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagSubscribeKeys } from '@/_entities/admin/tag-subscribe/admin-tag-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateTagSubscribeType, SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { MultipleResultType, SelectTagSubscribeMappingType } from '@/_types';

interface UseAdminCreateMultipleTagSubscribesOptions extends MutationOptionsType<MultipleResultType<SelectTagSubscribeMappingType>, CreateTagSubscribeType[]> {}

/**
 * @description 관리자용 다수 태그 구독 생성을 위한 커스텀 훅
 * @param {UseAdminCreateMultipleTagSubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 구독 생성 뮤테이션 객체
 */
export function useAdminCreateMultipleTagSubscribes(options: UseAdminCreateMultipleTagSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<MultipleResultType<SelectTagSubscribeMappingType>, CreateTagSubscribeType[]>({
    url: [
      'admin', 'subscribes',
    ],
    key: adminTagSubscribeKeys.createMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 구독 생성 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.search({} as SearchTagSubscribeType).queryKey,
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
