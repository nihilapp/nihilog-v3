import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchUserType } from '@/_schemas';
import type { ListType, SelectUserInfoListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectUserInfoListItemType>> {}

/**
 * @description 사용자 목록을 조회하는 커스텀 훅
 * @param {SearchUserType} searchData - 검색 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserList(
  searchData: SearchUserType,
  options: OptionType = {}
) {
  const query = useGet<ListType<SelectUserInfoListItemType>>({
    url: [
      'admin',
      'users',
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
