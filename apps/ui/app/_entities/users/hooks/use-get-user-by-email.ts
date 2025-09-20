import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UserInfoType } from '@/_schemas/user.schema';

interface UseGetUserByEmailOptions extends QueryOptionType<UserInfoType> {}

/**
 * @description 이메일로 특정 사용자 정보를 가져오는 커스텀 훅
 * @param {string} emlAddr - 조회할 사용자의 이메일 주소
 * @param {UseGetUserByEmailOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과
 */
export function useGetUserByEmail(emlAddr: string, options?: UseGetUserByEmailOptions) {
  const queryClient = useQueryClient();

  const {
    response: user,
    loading,
    done,
    ...other
  } = useGet<UserInfoType>({
    url: [
      'users', 'email', emlAddr,
    ],
    key: usersKeys.userByEmail(emlAddr),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 정보 조회 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.all().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.userByEmail(emlAddr).queryKey,
      });
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    options: {
      ...options,
      enabled: !!emlAddr,
    },
  });

  return {
    user,
    loading,
    done,
    ...other,
  };
}
