import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { UserStatusDistributionItemType } from '@/_types';

interface UseAdminGetStatusDistributionOptions extends QueryOptionType<UserStatusDistributionItemType[]> {}

/**
 * @description 관리자용 상태별 사용자 분포 조회를 위한 커스텀 훅
 * @param {UseAdminGetStatusDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 상태별 사용자 분포 조회 쿼리 객체
 */
export function useAdminGetStatusDistribution(options: UseAdminGetStatusDistributionOptions = {}) {
  const query = useGet<UserStatusDistributionItemType[]>({
    url: [
      'admin', 'users', 'analyze', 'status-distribution',
    ],
    key: adminUsersKeys.statusDistribution(),
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
