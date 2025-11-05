import { useGet } from '@/_entities/common/hooks';
import type { SelectCategoryType } from '@/_types';

/**
 * @description 카테고리 번호로 카테고리를 조회하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 */
export function useAdminGetCategoryByNo(ctgryNo: number) {
  const query = useGet<SelectCategoryType>({
    url: [
      'admin',
      'categories',
      ctgryNo.toString(),
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
