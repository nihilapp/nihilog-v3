import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { tagsKeys } from '@/_entities/tags/tags.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagType } from '@/_schemas/tag.schema';
import type { ListType, SelectTagInfoListItemType } from '@/_types';

interface UseGetTagsOptions extends MutationOptionsType<ListType<SelectTagInfoListItemType>, SearchTagType> {}

/**
 * @description 태그 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseGetTagsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 목록 조회 뮤테이션 객체
 */
export function useGetTags(options: UseGetTagsOptions = {}) {
  const query = usePost<ListType<SelectTagInfoListItemType>, SearchTagType>({
    url: [ 'tags', ],
    key: tagsKeys.list({} as Record<string, any>), // 기본값으로 빈 객체 사용
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
