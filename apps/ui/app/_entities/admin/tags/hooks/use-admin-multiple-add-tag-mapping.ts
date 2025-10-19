import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePstTagMpngType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface UseMultipleAddTagMappingOptions extends MutationOptionsType<MultipleResultType, CreatePstTagMpngType[]> {}

/**
 * @description 다수 태그 매핑을 추가하는 커스텀 훅
 * @param {UseMultipleAddTagMappingOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleAddTagMapping(options: UseMultipleAddTagMappingOptions = {}) {
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
    ...options,
  });

  return mutation;
}
