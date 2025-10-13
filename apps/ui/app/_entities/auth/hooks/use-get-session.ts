import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ResponseType } from '@/_schemas/response.schema';
import type { UserInfoType } from '@/_types';

interface UseGetSessionOptions extends QueryOptionType<UserInfoType> {}

/**
 * @description 현재 로그인된 사용자의 세션 정보를 조회하는 커스텀 훅
 * @returns 세션 조회 쿼리 객체 (session, loading, done, ...)
 */
export function useGetSession(options: UseGetSessionOptions = {}) {
  const {
    response: session,
    loading,
    done,
    ...other
  } = useGet<UserInfoType>({
    url: [
      'auth', 'session',
    ],
    key: authKeys.session(),
    callback() {
      // 세션 성공 시 토스트는 불필요하므로 생략 (노이즈 감소)
    },
    errorCallback(err: AxiosError<ResponseType<null>>) {
      // 백엔드가 200을 반환해도 Api.ensureOk에서 AxiosError로 변환됨
      // 비즈니스 코드 UNAUTHORIZED일 땐 토스트 스팸 방지를 위해 무시
      if (
        err.response?.data.code === 'UNAUTHORIZED'
        || err.code === 'UNAUTHORIZED'
      ) return;
      toast.error((err.response?.data.message ?? err.message) as string, {
        style: getToastStyle('error'),
      });
    },
    options: {
      // 세션 데이터는 자주 변경되지 않으므로 긴 캐싱 시간 사용
      staleTime: 50 * 60 * 1000, // 50분간 신선한 데이터로 간주
      gcTime: 60 * 60 * 1000, // 60분간 캐시 유지
      // 포커스/재연결 시 자동 재조회 방지, 인증 전 과다 요청 억제
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // 인증 실패 시 재시도 방지
      retry: false,
      // 마운트 시에만 한 번 요청
      refetchOnMount: false,
      ...options,
    },
  });

  return {
    session,
    loading,
    done,
    ...other,
  };
}
