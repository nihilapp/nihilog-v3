import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeletePostType } from '@/_schemas';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

interface OptionType extends MutationOptionsType<boolean, DeletePostType> {}

/**
 * @description 포스트를 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminDeletePost(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = useDelete<boolean, DeletePostType>({
    url: (variables) => [
      'admin',
      'posts',
      variables.pstNo?.toString() || '0',
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
    ...options,
  });

  return mutation;
}
