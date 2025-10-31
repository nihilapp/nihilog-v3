import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 태그를 삭제하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 */
export function useAdminDeleteTag(tagNo: number) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDelete<boolean>({
    url: [
      'admin',
      'tags',
      tagNo.toString(),
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
