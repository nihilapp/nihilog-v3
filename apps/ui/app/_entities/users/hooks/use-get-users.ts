import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { ListType } from '@/_schemas/response.schema';
import type {
  SearchUserType,
  UserInfoType
} from '@/_schemas/user.schema';

interface UseGetUsersOptions extends QueryOptionType<ListType<UserInfoType>> {}

/**
 * @description 사용자 목록을 가져오는 커스텀 훅 (페이지네이션 포함)
 * @param {SearchUserType} params - 검색 파라미터
 * @param {UseGetUsersOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 목록 조회 쿼리 객체
 */
export function useGetUsers(
  params: SearchUserType,
  options?: UseGetUsersOptions
) {
  const queryClient = useQueryClient();

  const {
    response: users,
    loading,
    done,
    ...other
  } = useGet<ListType<UserInfoType>>({
    url: [ 'users', ],
    key: usersKeys.users(params),
    params,
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 목록 조회 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.all().queryKey,
      });
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    options,
  });

  return {
    users,
    loading,
    done,
    ...other,
  };
}
