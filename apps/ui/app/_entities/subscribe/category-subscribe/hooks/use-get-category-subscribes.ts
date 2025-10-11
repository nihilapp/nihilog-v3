import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { ListType, SelectCategorySubscribeMappingListItemType } from '@/_types';

interface UseGetCategorySubscribesOptions extends QueryOptionType<ListType<SelectCategorySubscribeMappingListItemType>> {}

/**
 * @description 카테고리 구독 목록 조회를 위한 커스텀 훅 (GET 방식)
 * @param {UseGetCategorySubscribesOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 구독 목록 조회 쿼리 객체
 */
export function useGetCategorySubscribes(options: UseGetCategorySubscribesOptions = {}) {
  const query = useGet<ListType<SelectCategorySubscribeMappingListItemType>>({
    url: [
      'users', 'subscribes', 'categories',
    ],
    key: categorySubscribeKeys.categorySubscribeList({} as SearchCategorySubscribeType), // 기본값으로 빈 객체 사용
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
