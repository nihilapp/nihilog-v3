import { toast } from 'sonner';

import { categoriesKeys } from '@/_entities/categories/categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { ListType, SelectCategoryListItemType } from '@/_types';

interface UseGetCategoriesOptions extends QueryOptionType<ListType<SelectCategoryListItemType>> {}

/**
 * @description 카테고리 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseGetCategoriesOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 목록 조회 쿼리 객체
 */
export function useGetCategories(options: UseGetCategoriesOptions = {}) {
  const query = usePost<ListType<SelectCategoryListItemType>, SearchCategoryType>({
    url: [
      'categories', 'search',
    ],
    key: categoriesKeys.search({} as SearchCategoryType), // 기본값으로 빈 객체 사용
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
