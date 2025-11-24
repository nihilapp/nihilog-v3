import type { CreateTagType } from '@nihilog/schemas';
import type { SelectTagInfoType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminTagsCache } from '@/_keys/admin/tags/admin-tags.keys';

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
