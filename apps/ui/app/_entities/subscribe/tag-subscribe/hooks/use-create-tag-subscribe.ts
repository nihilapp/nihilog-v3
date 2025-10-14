import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { SelectTagSubscribeMappingType } from '@/_types';

interface UseCreateTagSubscribeOptions extends MutationOptionsType<SelectTagSubscribeMappingType> {}

/**
 * @description 태그 구독 생성을 위한 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {UseCreateTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 구독 생성 뮤테이션 객체
 */
export function useCreateTagSubscribe(tagNo: number, options: UseCreateTagSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectTagSubscribeMappingType, any>({
    url: [
      'users', 'subscribes', 'tags', tagNo,
    ],
    key: tagSubscribeKeys.create(tagNo),
    callback() {
      toast.success('태그 구독이 설정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 사용자의 태그 구독 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.search({} as SearchTagSubscribeType).queryKey,
      });
      // 특정 태그 구독 상태도 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.byNo(tagNo, {} as SearchTagSubscribeType).queryKey,
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
