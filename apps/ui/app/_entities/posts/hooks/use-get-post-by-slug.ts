import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SelectPostType } from '@/_types';

interface UseGetPostBySlugOptions extends QueryOptionType<SelectPostType> {}

/**
 * @description 게시글 슬러그로 특정 게시글 조회를 위한 커스텀 훅
 * @param {string} pstCd - 조회할 게시글 슬러그
 * @param {UseGetPostBySlugOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 게시글 조회 쿼리 객체
 */
export function useGetPostBySlug(pstCd: string, options: UseGetPostBySlugOptions = {}) {
  const query = useGet<SelectPostType>({
    url: [
      'posts', 'slug', pstCd,
    ],
    key: postsKeys.postBySlug(pstCd),
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
