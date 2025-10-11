import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { TagWithoutSubscribersItemType } from '@/_types';

interface UseAdminGetTagsWithoutSubscribersOptions extends QueryOptionType<TagWithoutSubscribersItemType[]> {}

/**
 * @description 관리자용 구독자 없는 태그 조회를 위한 커스텀 훅
 * @param {UseAdminGetTagsWithoutSubscribersOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 구독자 없는 태그 조회 쿼리 객체
 */
export function useAdminGetTagsWithoutSubscribers(options: UseAdminGetTagsWithoutSubscribersOptions = {}) {
  const query = useGet<TagWithoutSubscribersItemType[]>({
    url: [
      'admin', 'tags', 'analyze', 'no-subscribers',
    ],
    key: adminTagsKeys.tagsWithoutSubscribers(),
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
