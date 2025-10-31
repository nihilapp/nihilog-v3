import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePstTagMpngType } from '@/_schemas';
import type { SelectPstTagMpngType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 태그 매핑을 추가하는 커스텀 훅
 */
export function useAdminAddTagMapping() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePost<SelectPstTagMpngType, CreatePstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
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
