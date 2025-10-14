import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdateTagType, SearchTagType } from '@/_schemas/tag.schema';
import type { SelectTagInfoType } from '@/_types';

interface UseAdminUpdateTagOptions extends MutationOptionsType<SelectTagInfoType, UpdateTagType> {}

/**
 * @description 관리자용 태그 수정을 위한 커스텀 훅
 * @param {number} tagNo - 수정할 태그 번호
 * @param {UseAdminUpdateTagOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 수정 뮤테이션 객체
 */
export function useAdminUpdateTag(tagNo: number, options: UseAdminUpdateTagOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<SelectTagInfoType, UpdateTagType>({
    url: [
      'admin', 'tags',
    ],
    key: adminTagsKeys.update(tagNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 태그 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminTagsKeys.byNo(tagNo).queryKey,
      });
      // 관리자 태그 목록도 무효화
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
