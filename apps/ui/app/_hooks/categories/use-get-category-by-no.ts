import type { SelectCategoryType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리 번호로 카테고리를 조회하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetCategoryByNo(ctgryNo: number, enabled: boolean = true) {
  const query = useGet<SelectCategoryType>({
    url: [
      'categories',
      ctgryNo.toString(),
    ],
    enabled: enabled && !!ctgryNo,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
