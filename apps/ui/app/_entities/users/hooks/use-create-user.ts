import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

interface UseCreateUserOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 새 사용자 계정을 생성하는 커스텀 훅
 * @param {UseCreateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useCreateUser(options: UseCreateUserOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [ 'users', ],
    callback() {
      toast.success('사용자 계정이 생성되었습니다.', {
        style: getToastStyle('success'),
      });

      // 사용자 목록 무효화 (필요시)
      queryClient.invalidateQueries({
        queryKey: usersKeys._def,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return mutation;
}
