import { toast } from 'sonner';

import { categoriesKeys } from '@/_entities/categories/categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface UseGetCategoryByNameOptions extends QueryOptionType<SelectCategoryType> {}

/**
 * @description 카테고리명으로 특정 카테고리 조회를 위한 커스텀 훅
 * @param {string} name - 조회할 카테고리명
 * @param {UseGetCategoryByNameOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 조회 쿼리 객체
 */
export function useGetCategoryByName(name: string, options: UseGetCategoryByNameOptions = {}) {
  const query = useGet<SelectCategoryType>({
    url: [
      'categories', 'name', name,
    ],
    key: categoriesKeys.categoryByName(name),
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
