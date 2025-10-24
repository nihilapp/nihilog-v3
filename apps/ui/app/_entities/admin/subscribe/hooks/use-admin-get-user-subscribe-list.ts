import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ListType, SearchSubscribeType } from '@/_schemas';
import type { SelectUserSubscribeInfoListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectUserSubscribeInfoListItemType>> {}

/**
 * @description 전체 사용자 구독 설정 목록을 조회하는 커스텀 훅
 * @param {SearchSubscribeType} searchData - 검색 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserSubscribeList(
  searchData: SearchSubscribeType,
  options: OptionType = {}
) {
  const query = useGet<ListType<SelectUserSubscribeInfoListItemType>>({
    url: [
      'admin',
      'subscribes',
      'search',
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
    ...options,
  });

  return query;
}
