import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreatePstTagMpngType, SearchPstTagMpngType } from '@/_schemas/tag.schema';
import type { SelectPostTagMappingType } from '@/_types';

interface UseAdminCreateTagMappingOptions extends MutationOptionsType<SelectPostTagMappingType, CreatePstTagMpngType> {}

/**
 * @description 관리자용 태그 매핑 생성을 위한 커스텀 훅
 * @param {UseAdminCreateTagMappingOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 매핑 생성 뮤테이션 객체
 */
export function useAdminCreateTagMapping(options: UseAdminCreateTagMappingOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<SelectPostTagMappingType, CreatePstTagMpngType>({
    url: [
      'admin', 'tags', 'mapping',
    ],
    key: adminTagsKeys.createMapping(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 태그 매핑 생성 성공 시 관련 쿼리 무효화
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
