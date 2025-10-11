import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { UserRoleDistributionItemType } from '@/_types';

interface UseAdminGetRoleDistributionOptions extends QueryOptionType<UserRoleDistributionItemType[]> {}

/**
 * @description 관리자용 역할별 사용자 분포 조회를 위한 커스텀 훅
 * @param {UseAdminGetRoleDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 역할별 사용자 분포 조회 쿼리 객체
 */
export function useAdminGetRoleDistribution(options: UseAdminGetRoleDistributionOptions = {}) {
  const query = useGet<UserRoleDistributionItemType[]>({
    url: [
      'admin', 'users', 'analyze', 'role-distribution',
    ],
    key: adminUsersKeys.roleDistribution(),
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
