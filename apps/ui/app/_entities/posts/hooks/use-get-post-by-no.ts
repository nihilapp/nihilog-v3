import type { SelectPostType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 포스트 번호로 포스트를 조회하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetPostByNo(pstNo: number, enabled: boolean = true) {
  const query = useGet<SelectPostType>({
    url: [
      'posts',
      pstNo.toString(),
    ],
    enabled: enabled && !!pstNo,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
