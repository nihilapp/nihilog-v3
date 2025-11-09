import type { SelectUserSbcrInfoType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 특정 사용자 구독 설정을 조회하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 */
export function useAdminGetUserSubscribeByNo(userNo: number) {
  const query = useGet<SelectUserSbcrInfoType>({
    url: [
      'admin',
      'subscribes',
      userNo.toString(),
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
