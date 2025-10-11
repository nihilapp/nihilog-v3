import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { adminKeys } from '@/_entities/admin/admin.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminSignUpOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

export function useAdminSignUp(options: UseAdminSignUpOptions = {}) {
  const router = useRouter();

  const {
    response: userInfo,
    ...query
  } = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin', 'signup',
    ],
    key: adminKeys.signup(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 관리자 계정 생성 성공 시 사용자 목록으로 이동
      router.push('/users');
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return {
    userInfo,
    ...query,
  };
}
