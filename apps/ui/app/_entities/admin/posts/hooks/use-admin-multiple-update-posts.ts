import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdatePostType } from '@/_schemas/post.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminMultipleUpdatePostsOptions extends MutationOptionsType<MultipleResultType, UpdatePostType> {}

/**
 * @description 관리자용 다수 게시글 일괄 수정을 위한 커스텀 훅
 * @param {UseAdminMultipleUpdatePostsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 게시글 일괄 수정 뮤테이션 객체
 */
export function useAdminMultipleUpdatePosts(options: UseAdminMultipleUpdatePostsOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType, UpdatePostType>({
    url: [
      'admin', 'posts', 'multiple',
    ],
    key: adminPostsKeys.multipleUpdatePost(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 게시글 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminPostsKeys.postList({}).queryKey,
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
