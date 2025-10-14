import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminGetUserByNameOptions extends QueryOptionType<SelectUserInfoType> {}

/**
 * @description 관리자용 사용자명으로 특정 사용자 조회를 위한 커스텀 훅
 * @param {string} name - 조회할 사용자명
 * @param {UseAdminGetUserByNameOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 조회 쿼리 객체
 */
export function useAdminGetUserByName(name: string, options: UseAdminGetUserByNameOptions = {}) {
  const query = useGet<SelectUserInfoType>({
    url: [
      'admin', 'users', 'name', name,
    ],
    key: adminUsersKeys.byName(name),
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
