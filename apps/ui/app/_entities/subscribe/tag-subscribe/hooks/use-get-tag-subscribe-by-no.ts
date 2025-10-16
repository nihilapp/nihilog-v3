import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';
import type { ListType, SelectTagSubscribeMappingListItemType } from '@/_types';

interface UseGetTagSubscribeByNoOptions extends QueryOptionType<ListType<SelectTagSubscribeMappingListItemType>> {
  searchParams?: SearchTagSubscribeType;
}

/**
 * @description 특정 태그 구독 상태 조회를 위한 커스텀 훅 (POST 방식)
 * @param {number} tagNo - 태그 번호
 * @param {UseGetTagSubscribeByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 특정 태그 구독 상태 조회 쿼리 객체
 */
export function useGetTagSubscribeByNo(tagNo: number, options: UseGetTagSubscribeByNoOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectTagSubscribeMappingListItemType>, SearchTagSubscribeType>({
    url: [
      'users', 'subscribes', 'tags', tagNo, 'search',
    ],
    key: tagSubscribeKeys.byNo(tagNo, searchParams),
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
