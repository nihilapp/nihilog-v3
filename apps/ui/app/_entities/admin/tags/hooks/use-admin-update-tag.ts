import { usePatch } from '@/_entities/common/hooks';
import type { UpdateTagType } from '@/_schemas';
import type { SelectTagInfoType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 태그를 수정하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 */
export function useAdminUpdateTag(tagNo: number) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePatch<SelectTagInfoType, UpdateTagType>({
    url: [
      'admin',
      'tags',
      tagNo.toString(),
    ],
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
