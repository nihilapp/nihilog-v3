import type { CreatePstTagMpngType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminTagsCache } from '@/_keys/admin/tags/admin-tags.keys';

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
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
