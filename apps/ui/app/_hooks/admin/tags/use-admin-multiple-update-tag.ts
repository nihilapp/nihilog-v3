import type { UpdateTagType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePatch } from '@/_hooks/common';

import { useInvalidateAdminTagsCache } from '@/_keys/admin/tags/admin-tags.keys';

/**
 * @description 다수 태그를 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateTag() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePatch<MultipleResultType, UpdateTagType>({
    url: [
      'admin',
      'tags',
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
