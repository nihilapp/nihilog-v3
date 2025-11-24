import type { CreateTagType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 다수 태그를 생성하는 커스텀 훅
 */
export function useAdminMultipleCreateTag() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePost<MultipleResultType, CreateTagType[]>({
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
