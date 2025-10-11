import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SelectPostType } from '@/_types';

interface UseGetPostByNoOptions extends QueryOptionType<SelectPostType> {}

/**
 * @description 게시글 번호로 특정 게시글 조회를 위한 커스텀 훅
 * @param {number} pstNo - 조회할 게시글 번호
 * @param {UseGetPostByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 게시글 조회 쿼리 객체
 */
export function useGetPostByNo(pstNo: number, options: UseGetPostByNoOptions = {}) {
  const query = useGet<SelectPostType>({
    url: [
      'posts', pstNo,
    ],
    key: postsKeys.postByNo(pstNo),
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
