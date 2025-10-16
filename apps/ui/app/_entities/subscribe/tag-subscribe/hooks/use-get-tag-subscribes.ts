import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { ListType, SelectTagSubscribeMappingListItemType } from '@/_types';

interface UseGetTagSubscribesOptions extends QueryOptionType<ListType<SelectTagSubscribeMappingListItemType>> {
  searchParams?: SearchTagSubscribeType;
}

/**
 * @description 태그 구독 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseGetTagSubscribesOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 구독 목록 조회 쿼리 객체
 */
export function useGetTagSubscribes(options: UseGetTagSubscribesOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectTagSubscribeMappingListItemType>, SearchTagSubscribeType>({
    url: [
      'users', 'subscribes', 'tags', 'search',
    ],
    key: tagSubscribeKeys.search(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
