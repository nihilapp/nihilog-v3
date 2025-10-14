import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { DeletePstTagMpngType, SearchPstTagMpngType } from '@/_schemas/tag.schema';
import type { SelectPostTagMappingType } from '@/_types';

interface UseAdminDeleteTagMappingOptions extends MutationOptionsType<SelectPostTagMappingType, DeletePstTagMpngType> {}

/**
 * @description 관리자용 태그 매핑 삭제를 위한 커스텀 훅
 * @param {UseAdminDeleteTagMappingOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 매핑 삭제 뮤테이션 객체
 */
export function useAdminDeleteTagMapping(options: UseAdminDeleteTagMappingOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<SelectPostTagMappingType, DeletePstTagMpngType>({
    url: [
      'admin', 'tags', 'mapping',
    ],
    key: adminTagsKeys.deleteMapping(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 태그 매핑 삭제 성공 시 관련 쿼리 무효화
      // 태그 매핑 목록만 무효화 (전체 캐시 무효화 불필요)
      queryClient.invalidateQueries({
        queryKey: adminTagsKeys.searchMappings({} as SearchPstTagMpngType).queryKey,
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
