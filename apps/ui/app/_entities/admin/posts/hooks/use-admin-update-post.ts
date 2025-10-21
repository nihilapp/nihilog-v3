import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdatePostType } from '@/_schemas';
import type { SelectPostType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

interface OptionType extends MutationOptionsType<SelectPostType, UpdatePostType> {}

/**
 * @description 포스트를 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminUpdatePost(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = usePut<SelectPostType, UpdatePostType>({
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
