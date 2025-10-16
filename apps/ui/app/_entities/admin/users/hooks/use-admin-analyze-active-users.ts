import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { ActiveUserAnalysisItemType } from '@/_types';

interface UseAdminAnalyzeActiveUsersOptions extends MutationOptionsType<ActiveUserAnalysisItemType, AnalyzeStatType> {}

/**
 * @description 관리자용 활성 사용자 분석을 위한 커스텀 훅
 * @param {UseAdminAnalyzeActiveUsersOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 활성 사용자 분석 뮤테이션 객체
 */
export function useAdminAnalyzeActiveUsers(options: UseAdminAnalyzeActiveUsersOptions = {}) {
  const query = usePost<ActiveUserAnalysisItemType, AnalyzeStatType>({
    url: [
      'admin', 'users', 'analyze', 'active-users',
    ],
    key: adminUsersKeys.analyzeActiveUsers({} as AnalyzeStatType), // 기본값으로 빈 객체 사용
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
