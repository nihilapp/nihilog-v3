import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateTagType, SearchTagType } from '@/_schemas/tag.schema';
import type { SelectTagInfoType } from '@/_types';

interface UseAdminCreateTagOptions extends MutationOptionsType<SelectTagInfoType, CreateTagType> {}

/**
 * @description 관리자용 태그 생성을 위한 커스텀 훅
 * @param {UseAdminCreateTagOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 생성 뮤테이션 객체
 */
export function useAdminCreateTag(options: UseAdminCreateTagOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<SelectTagInfoType, CreateTagType>({
    url: [
      'admin', 'tags',
    ],
    key: adminTagsKeys.create(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 태그 생성 성공 시 관련 쿼리 무효화
      // 관리자 태그 목록만 무효화 (전체 캐시 무효화 불필요)
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
