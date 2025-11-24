import type { CreatePstTagMpngType } from '@nihilog/schemas';
import type { SelectPstTagMpngType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminTagsCache } from '@/_keys/admin/tags/admin-tags.keys';

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
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
