import type { SelectPostType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 포스트 슬러그로 포스트를 조회하는 커스텀 훅
 * @param {string} pstCd - 포스트 슬러그
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetPostBySlug(pstCd: string, enabled: boolean = true) {
  const query = useGet<SelectPostType>({
    url: [
      'posts',
      'slug',
      pstCd,
    ],
    enabled: enabled && !!pstCd,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
