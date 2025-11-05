import { useGet } from '@/_entities/common/hooks';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 사용자 번호로 사용자를 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 */
export function useAdminGetUserByNo(userNo: number) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      userNo.toString(),
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
