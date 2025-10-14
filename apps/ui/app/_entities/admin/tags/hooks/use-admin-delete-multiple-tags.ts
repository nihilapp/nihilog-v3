import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { DeleteTagType, SearchTagType } from '@/_schemas/tag.schema';
import type { MultipleResultType, SelectTagInfoType } from '@/_types';

interface UseAdminDeleteMultipleTagsOptions extends MutationOptionsType<MultipleResultType<SelectTagInfoType>, DeleteTagType[]> {}

/**
 * @description 관리자용 다수 태그 삭제를 위한 커스텀 훅
 * @param {UseAdminDeleteMultipleTagsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 삭제 뮤테이션 객체
 */
export function useAdminDeleteMultipleTags(options: UseAdminDeleteMultipleTagsOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType<SelectTagInfoType>, DeleteTagType[]>({
    url: [
      'admin', 'tags', 'multiple',
    ],
    key: adminTagsKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminTagsKeys.search({} as SearchTagType).queryKey,
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
