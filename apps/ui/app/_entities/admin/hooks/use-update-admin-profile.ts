import { toast } from 'sonner';

import { useInvalidateAdminCache } from '@/_entities/admin/admin.keys';
import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectUserInfoType, UpdateUserType> {}

/**
 * @description 관리자 프로필을 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminUpdateProfile(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminCache();

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
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return mutation;
}
