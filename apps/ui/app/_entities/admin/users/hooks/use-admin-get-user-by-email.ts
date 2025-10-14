import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminGetUserByEmailOptions extends QueryOptionType<SelectUserInfoType> {}

/**
 * @description 관리자용 이메일로 특정 사용자 조회를 위한 커스텀 훅
 * @param {string} email - 조회할 이메일
 * @param {UseAdminGetUserByEmailOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 조회 쿼리 객체
 */
export function useAdminGetUserByEmail(email: string, options: UseAdminGetUserByEmailOptions = {}) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin', 'users', 'email', email,
    ],
    key: adminUsersKeys.byEmail(email),
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
