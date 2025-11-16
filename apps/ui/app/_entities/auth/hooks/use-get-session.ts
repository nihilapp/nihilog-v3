import type { SelectUserInfoType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';
import { useAuthActions } from '@/_stores/auth.store';

/**
 * @description 현재 로그인된 사용자의 세션 정보를 조회하는 커스텀 훅
 *
 * @usage
 * - 앱 초기 로드 시: 서버에서 세션 정보를 가져와 store에 저장
 * - 세션 상태 확인: 컴포넌트에서 useSession() hook 사용 권장
 * - 이 hook은 서버와 동기화가 필요한 경우에만 사용
 */
export function useGetSession() {
  const { setSession, clearSession, } = useAuthActions();

  const query = useGet<SelectUserInfoType>({
    url: [
      'auth',
      'session',
    ],
    callback(res) {
      // 세션 정보를 store에 저장
      if (res.data) {
        setSession(res.data);
      }
      else {
        // 세션이 없으면 store도 클리어
        clearSession();
      }
    },
    errorCallback(_error) {
      // 에러 발생 시 세션 클리어
      clearSession();
    },
  });

  return query;
}
