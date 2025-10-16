import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorType, OkType, QueryOptionType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';

/**
 * POST 요청을 위한 쿼리 훅 매개변수
 */
interface PostQueryParams<T = any, TVariables = any> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users']) */
  url: Array<string | number | undefined>;
  /** 쿼리 키 (createQueryKeys 객체 또는 배열 형태) */
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>;
  /** POST 요청 body 데이터 */
  body?: TVariables;
  /** URL 쿼리 파라미터 객체 (선택사항) */
  params?: Record<string, any>;
  /** React Query 옵션 (선택사항) */
  options?: QueryOptionType<T>;
  /** 성공 콜백 */
  callback?: (data: OkType<T>) => void;
  /** 에러 콜백 */
  errorCallback?: (error: AxiosError<ErrorType>) => void;
}

/**
 * @description POST 요청을 위한 커스텀 쿼리 훅 (자동 fetch)
 * @returns 쿼리 결과 객체 (response, loading, done, ...)
 */
export function usePostQuery<T = any, TVariables = any>({
  url,
  key,
  body,
  params,
  options,
  callback,
  errorCallback,
}: PostQueryParams<T, TVariables>) {
  // 키 처리: 문자열이면 배열로 변환, 이미 배열이면 그대로 사용
  const queryKey = Array.isArray(key)
    ? key
    : typeof key === 'object' && 'queryKey' in key
      ? [ ...key.queryKey, ]
      : [ key, ];

  // URL 배열을 문자열로 결합하고 undefined 값 필터링
  const urlPath = url.filter(Boolean).join('/');

  // 쿼리 파라미터 처리
  const queryString = params
    ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([
          _, value,
        ]) => value !== undefined && value !== null)
        .map(([
          key, value,
        ]) => [
          key, String(value),
        ])
    ).toString()
    : '';

  // 최종 URL 생성
  const fullUrl = `/${urlPath}${queryString}`;

  // enabled 조건: URL 배열의 모든 요소가 유효할 때만 실행
  const enabled = url.every((segment) => segment !== undefined && segment !== null && segment !== '');

  const {
    data: response,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<OkType<T>, AxiosError<ErrorType>>({
    queryKey: [
      ...queryKey,
      url,
      body,
      params,
    ],
    queryFn: () => Api.postQuery<T, TVariables>(fullUrl, body || {} as TVariables),
    enabled,
    // 기본 재시도 정책: 비즈니스 UNAUTHORIZED(401 변환) 등은 재시도하지 않도록 최소화
    retry: (failureCount, error) => {
      const status = (error as AxiosError)?.response?.status;
      if (status === 401) return false;
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...(options as any),
  });

  // 콜백 실행 (React Query v5에서 onSuccess/onError가 제거되어 직접 처리)
  if (response && isSuccess && callback) {
    callback(response);
  }
  if (other.error && errorCallback) {
    errorCallback(other.error);
  }

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    response,
    loading,
    done,
    ...other,
  };
}
