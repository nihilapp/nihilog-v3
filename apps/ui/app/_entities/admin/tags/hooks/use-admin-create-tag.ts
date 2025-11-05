import { usePost } from '@/_entities/common/hooks';
import type { CreateTagType } from '@/_schemas';
import type { SelectTagInfoType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 새 태그를 생성하는 커스텀 훅
 */
export function useAdminCreateTag() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePost<SelectTagInfoType, CreateTagType>({
    url: [
      'admin',
      'tags',
    ],
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
