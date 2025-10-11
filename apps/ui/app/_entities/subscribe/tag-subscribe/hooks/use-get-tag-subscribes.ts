import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { ListType, SelectTagSubscribeMappingListItemType } from '@/_types';

interface UseGetTagSubscribesOptions extends QueryOptionType<ListType<SelectTagSubscribeMappingListItemType>> {}

/**
 * @description 태그 구독 목록 조회를 위한 커스텀 훅 (GET 방식)
 * @param {UseGetTagSubscribesOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 구독 목록 조회 쿼리 객체
 */
export function useGetTagSubscribes(options: UseGetTagSubscribesOptions = {}) {
  const query = useGet<ListType<SelectTagSubscribeMappingListItemType>>({
    url: [
      'users', 'subscribes', 'tags',
    ],
    key: tagSubscribeKeys.tagSubscribeList({} as SearchTagSubscribeType), // 기본값으로 빈 객체 사용
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
