import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateTagType, SearchTagType } from '@/_schemas/tag.schema';
import type { MultipleResultType, SelectTagInfoType } from '@/_types';

interface UseAdminCreateMultipleTagsOptions extends MutationOptionsType<MultipleResultType<SelectTagInfoType>, CreateTagType[]> {}

/**
 * @description 관리자용 다수 태그 생성을 위한 커스텀 훅
 * @param {UseAdminCreateMultipleTagsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 생성 뮤테이션 객체
 */
export function useAdminCreateMultipleTags(options: UseAdminCreateMultipleTagsOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<MultipleResultType<SelectTagInfoType>, CreateTagType[]>({
    url: [
      'admin', 'tags', 'multiple',
    ],
    key: adminTagsKeys.createMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 태그 생성 성공 시 관련 쿼리 무효화
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
