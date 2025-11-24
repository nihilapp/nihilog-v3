import type { SelectTagInfoType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 태그 번호로 태그를 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetTagByNo(tagNo: number, enabled: boolean = true) {
  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      tagNo.toString(),
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
