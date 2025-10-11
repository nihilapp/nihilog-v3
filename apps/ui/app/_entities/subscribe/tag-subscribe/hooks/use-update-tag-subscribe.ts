import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SelectTagSubscribeMappingType } from '@/_types';

interface UseUpdateTagSubscribeOptions extends MutationOptionsType<SelectTagSubscribeMappingType> {}

/**
 * @description 태그 구독 수정을 위한 커스텀 훅
 * @param {number} tagSbcrNo - 태그 구독 번호
 * @param {UseUpdateTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 구독 수정 뮤테이션 객체
 */
export function useUpdateTagSubscribe(tagSbcrNo: number, options: UseUpdateTagSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePut<SelectTagSubscribeMappingType, any>({
    url: [
      'users', 'subscribes', 'tags', tagSbcrNo,
    ],
    key: tagSubscribeKeys.updateTagSubscribe(tagSbcrNo),
    callback() {
      toast.success('태그 구독이 수정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.tagSubscribeList({}).queryKey,
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
