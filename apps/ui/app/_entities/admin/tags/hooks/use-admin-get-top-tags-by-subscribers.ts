import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { TopTagsBySubscriberItemType } from '@/_types';

interface UseAdminGetTopTagsBySubscribersOptions extends QueryOptionType<TopTagsBySubscriberItemType[]> {}

/**
 * @description 관리자용 구독자 많은 태그 TOP N 조회를 위한 커스텀 훅
 * @param {UseAdminGetTopTagsBySubscribersOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 구독자 많은 태그 TOP N 조회 쿼리 객체
 */
export function useAdminGetTopTagsBySubscribers(options: UseAdminGetTopTagsBySubscribersOptions = {}) {
  const query = useGet<TopTagsBySubscriberItemType[]>({
    url: [
      'admin', 'tags', 'analyze', 'top-subscribers',
    ],
    key: adminTagsKeys.analyzeTopTagsBySubscribers(),
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
