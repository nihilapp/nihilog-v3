import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchPstTagMpngType } from '@/_schemas/tag.schema';
import type { ListType, SelectPostTagMappingListItemType } from '@/_types';

interface UseAdminGetTagMappingsOptions extends MutationOptionsType<ListType<SelectPostTagMappingListItemType>, SearchPstTagMpngType> {}

/**
 * @description 관리자용 태그 매핑 검색을 위한 커스텀 훅 (POST 방식)
 * @param {UseAdminGetTagMappingsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 매핑 검색 뮤테이션 객체
 */
export function useAdminGetTagMappings(options: UseAdminGetTagMappingsOptions = {}) {
  const query = usePost<ListType<SelectPostTagMappingListItemType>, SearchPstTagMpngType>({
    url: [
      'admin', 'tags', 'mapping', 'search',
    ],
    key: adminTagsKeys.searchMappings({} as SearchPstTagMpngType), // 기본값으로 빈 객체 사용
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
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
