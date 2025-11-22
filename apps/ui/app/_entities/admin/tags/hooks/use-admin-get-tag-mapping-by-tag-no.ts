import type { SelectPstTagMpngType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그 번호로 매핑을 조회하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 * @param {number} tagNo - 태그 번호
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagMappingByTagNo(pstNo: number, tagNo: number, enabled: boolean = true) {
  const query = useGet<SelectPstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
      pstNo.toString(),
      tagNo.toString(),
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
