import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseCreateUserOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 사용자 계정 생성을 위한 커스텀 훅
 * @param {UseCreateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 생성 뮤테이션 객체
 */
export function useCreateUser(options: UseCreateUserOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = usePost<SelectUserInfoType, CreateUserType>({
    url: [ 'users', ],
    key: usersKeys.create(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 생성 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.profile().queryKey,
      });

      router.push('/');
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
