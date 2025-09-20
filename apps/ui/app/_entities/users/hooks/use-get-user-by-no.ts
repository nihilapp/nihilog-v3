import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UserInfoType } from '@/_schemas/user.schema';

interface UseGetUserByNoOptions extends QueryOptionType<UserInfoType> {}

/**
 * @description 번호로 특정 사용자 정보를 가져오는 커스텀 훅
 * @param {number} userNo - 조회할 사용자의 번호
 * @param {UseGetUserByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과
 */
export function useGetUserByNo(userNo: number, options?: UseGetUserByNoOptions) {
  const queryClient = useQueryClient();

  const {
    response: user,
    loading,
    done,
    ...other
  } = useGet<UserInfoType>({
    url: [
      'users', userNo.toString(),
    ],
    key: usersKeys.userByNo(userNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 정보 조회 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.all().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.userByNo(userNo).queryKey,
      });
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    options: {
      ...options,
      enabled: !!userNo,
    },
  });

  return {
    user,
    loading,
    done,
    ...other,
  };
}
