import { useGet } from '@/_entities/common/hooks';
import type { SelectCategoryType } from '@/_types';

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {string} name - 카테고리명
 * @param {string} name - 카테고리명
 */
export function useGetCategoryByName(name: string) {
  const query = useGet<SelectCategoryType>({
    url: [
      'categories',
      'name',
      name,
    ],
    enabled: !!name,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
