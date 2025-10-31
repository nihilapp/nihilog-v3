import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchSubscribeType } from '@/_schemas';
import type { ListType, SelectUserSbcrInfoListItemType } from '@/_types';

/**
 * @description 전체 사용자 구독 설정 목록을 조회하는 커스텀 훅
 * @param {SearchSubscribeType} searchData - 검색 데이터
 */
export function useAdminGetUserSubscribeList(searchData: SearchSubscribeType) {
  const query = useGet<ListType<SelectUserSbcrInfoListItemType>>({
    url: [
      'admin',
      'subscribes',
    ],
    params: searchData,
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return query;
}
