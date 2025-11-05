import { useGet } from '@/_entities/common/hooks';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 이메일로 사용자를 조회하는 커스텀 훅
 * @param {string} email - 이메일 주소
 */
export function useAdminGetUserByEmail(email: string) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin',
      'users',
      'email',
      email,
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
