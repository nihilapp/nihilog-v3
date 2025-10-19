import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeletePostType } from '@/_schemas';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

interface UseDeletePostOptions extends MutationOptionsType<boolean, DeletePostType> {
  pstNo: number;
}

/**
 * @description 포스트를 삭제하는 커스텀 훅
 * @param {UseDeletePostOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeletePost(options: UseDeletePostOptions = { pstNo: 0, }) {
  const { pstNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = useDelete<boolean, DeletePostType>({
    url: [
      'admin',
      'posts',
      pstNo.toString(),
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Posts 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...mutationOptions,
  });

  return mutation;
}
