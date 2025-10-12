import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminSignupOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 개발 환경에서 최초 어드민 계정 생성을 위한 커스텀 훅
 * @param {UseAdminSignupOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 어드민 회원가입 뮤테이션 객체
 */
export function useAdminSignup(options: UseAdminSignupOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin', 'users', 'signup',
    ],
    key: adminUsersKeys.signup(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 어드민 회원가입 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminUsersKeys.userList({}).queryKey,
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
