import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminKeys } from '@/_entities/admin/admin.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminUpdateProfileOptions extends MutationOptionsType<SelectUserInfoType, UpdateUserType> {}

/**
 * @description 관리자 프로필 수정을 위한 커스텀 훅
 * @param {UseAdminUpdateProfileOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 관리자 프로필 수정 뮤테이션 객체
 */
export function useAdminUpdateProfile(options: UseAdminUpdateProfileOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<SelectUserInfoType, UpdateUserType>({
    url: [
      'admin', 'profile',
    ],
    key: adminKeys.updateProfile(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 관리자 프로필 수정 성공 시 관련 쿼리 무효화
      // 관리자 프로필 정보만 무효화 (전체 캐시 무효화 불필요)
      queryClient.invalidateQueries({
        queryKey: usersKeys.profile().queryKey,
      });
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
