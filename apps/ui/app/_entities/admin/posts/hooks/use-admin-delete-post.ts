import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';

interface UseAdminDeletePostOptions extends MutationOptionsType<boolean> {}

/**
 * @description 관리자용 포스트 삭제를 위한 커스텀 훅
 * @param {number} pstNo - 삭제할 포스트 번호
 * @param {UseAdminDeletePostOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 포스트 삭제 뮤테이션 객체
 */
export function useAdminDeletePost(pstNo: number, options: UseAdminDeletePostOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<boolean>({
    url: [
      'admin', 'posts', pstNo,
    ],
    key: adminPostsKeys.delete(pstNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 포스트 삭제 성공 시 관련 쿼리 무효화
      // 관리자 포스트 목록만 무효화 (전체 캐시 무효화 불필요)
      queryClient.invalidateQueries({
        queryKey: adminPostsKeys.search({} as SearchPostType).queryKey,
      });
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
