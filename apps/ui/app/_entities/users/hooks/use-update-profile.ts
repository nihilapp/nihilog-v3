import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas/user.schema';
import type { UserInfoType } from '@/_types';

interface UseUpdateProfileOptions
  extends MutationOptionsType<UserInfoType, UpdateUserType> { }

/**
 * @description 사용자 프로필 정보 수정을 위한 커스텀 훅
 * @param {UseUpdateProfileOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 프로필 수정 뮤테이션 객체
 */
export function useUpdateProfile(options: UseUpdateProfileOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<UserInfoType, UpdateUserType>({
    url: [
      'users', 'profile',
    ],
    key: usersKeys.profile(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 프로필 업데이트 성공 시 관련 쿼리 무효화
      // 세션 정보도 함께 무효화하여 UI가 즉시 업데이트되도록 함
      queryClient.invalidateQueries({
        queryKey: authKeys.session().queryKey,
      });
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
