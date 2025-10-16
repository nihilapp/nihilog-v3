import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdatePostType, SearchPostType } from '@/_schemas/post.schema';
import type { SelectPostType } from '@/_types';

interface UseAdminUpdatePostOptions extends MutationOptionsType<SelectPostType, UpdatePostType> {}

/**
 * @description 관리자용 포스트 수정을 위한 커스텀 훅
 * @param {number} pstNo - 수정할 포스트 번호
 * @param {UseAdminUpdatePostOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 포스트 수정 뮤테이션 객체
 */
export function useAdminUpdatePost(pstNo: number, options: UseAdminUpdatePostOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<SelectPostType, UpdatePostType>({
    url: [
      'admin', 'posts', pstNo,
    ],
    key: adminPostsKeys.update(pstNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 포스트 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminPostsKeys.byNo(pstNo).queryKey,
      });
      // 관리자 포스트 목록도 무효화
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
