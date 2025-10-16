import { toast } from 'sonner';

import { categoriesKeys } from '@/_entities/categories/categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { ListType, SelectCategoryListItemType } from '@/_types';

interface UseGetCategoriesOptions extends QueryOptionType<ListType<SelectCategoryListItemType>> {
  searchParams?: SearchCategoryType;
}

/**
 * @description 카테고리 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseGetCategoriesOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 목록 조회 쿼리 객체
 */
export function useGetCategories(options: UseGetCategoriesOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectCategoryListItemType>, SearchCategoryType>({
    url: [
      'categories', 'search',
    ],
    key: categoriesKeys.search(searchParams),
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
