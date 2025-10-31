import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePstTagMpngType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 다수 태그 매핑을 추가하는 커스텀 훅
 */
export function useAdminMultipleAddTagMapping() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePost<MultipleResultType, CreatePstTagMpngType[]>({
    url: [
      'admin',
      'tags',
      'mapping',
      'multiple',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Tags 관련 캐시 무효화
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
  });

  return mutation;
}
