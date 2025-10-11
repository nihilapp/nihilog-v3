import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdateTagType } from '@/_schemas/tag.schema';
import type { MultipleResultType, SelectTagInfoType } from '@/_types';

interface UseAdminUpdateMultipleTagsOptions extends MutationOptionsType<MultipleResultType<SelectTagInfoType>, UpdateTagType[]> {}

/**
 * @description 관리자용 다수 태그 수정을 위한 커스텀 훅
 * @param {UseAdminUpdateMultipleTagsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 수정 뮤테이션 객체
 */
export function useAdminUpdateMultipleTags(options: UseAdminUpdateMultipleTagsOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType<SelectTagInfoType>, UpdateTagType[]>({
    url: [
      'admin', 'tags', 'multiple',
    ],
    key: adminTagsKeys.updateMultipleTags(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminTagsKeys.tagList({}).queryKey,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
