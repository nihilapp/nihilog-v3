import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { DeletePostType, SearchPostType } from '@/_schemas/post.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminMultipleDeletePostsOptions extends MutationOptionsType<MultipleResultType, DeletePostType> {}

/**
 * @description 관리자용 다수 포스트 일괄 삭제를 위한 커스텀 훅
 * @param {UseAdminMultipleDeletePostsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 포스트 일괄 삭제 뮤테이션 객체
 */
export function useAdminMultipleDeletePosts(options: UseAdminMultipleDeletePostsOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType, DeletePostType>({
    url: [
      'admin', 'posts', 'multiple',
    ],
    key: adminPostsKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 포스트 삭제 성공 시 관련 쿼리 무효화
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
