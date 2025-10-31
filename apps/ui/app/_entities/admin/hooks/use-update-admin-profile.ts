import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useInvalidateAdminCache } from '@/_entities/admin/admin.keys';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 관리자 프로필을 수정하는 커스텀 훅
 */
export function useAdminUpdateProfile() {
  const invalidateCache = useInvalidateAdminCache();
  const router = useRouter();

  const mutation = usePut<SelectUserInfoType, UpdateUserType>({
    url: [
      'admin',
      'profile',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 관리자 관련 캐시 무효화
      invalidateCache();

      // 프로필 수정 후 관리자 대시보드로 이동
      router.push('/admin/dashboard');
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return mutation;
}
