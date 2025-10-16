import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { SearchTagType } from '@/_schemas/tag.schema';
import type { ListType, SelectTagInfoListItemType } from '@/_types';

interface UseAdminGetTagListOptions extends QueryOptionType<ListType<SelectTagInfoListItemType>> {
  searchParams?: SearchTagType;
}

/**
 * @description 관리자용 태그 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseAdminGetTagListOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 목록 조회 쿼리 객체
 */
export function useAdminGetTagList(options: UseAdminGetTagListOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectTagInfoListItemType>, SearchTagType>({
    url: [
      'admin', 'tags',
    ],
    key: adminTagsKeys.search(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
