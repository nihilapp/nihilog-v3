import {
  useQuery,
  useInfiniteQuery,
  type InfiniteData
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorType, OkType, QueryOptionType, InfiniteQueryOptionType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';
import { addPaginationParams } from '@/_libs/tools/pagination.tools';

/**
 * GET 요청을 위한 쿼리 훅 매개변수
 */
interface GetParams<T = any> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users']) */
  url: Array<string | number | undefined>;
  /** 쿼리 키 (createQueryKeys 객체 또는 배열 형태) */
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>;
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
 * @description GET 요청을 위한 커스텀 쿼리 훅
 * @returns 쿼리 결과 객체 (response, loading, done, ...)
 */
export function useGet<T = any>({
  url,
  key,
  params,
  options,
  callback,
  errorCallback,
}: GetParams<T>) {
  // 키 처리: 문자열이면 배열로 변환, 이미 배열이면 그대로 사용
  const queryKey = Array.isArray(key)
    ? key
    : typeof key === 'object' && 'queryKey' in key
      ? [ ...key.queryKey, ]
      : [ key, ];

  // URL 배열을 문자열로 결합하고 undefined 값 필터링
  const urlPath = url.filter(Boolean).join('/');

  // 페이지네이션 파라미터 자동 계산
  const processedParams = params
    ? addPaginationParams(params)
    : undefined;

  // 쿼리 파라미터 문자열 생성
  const queryString = processedParams
    ? '?' + new URLSearchParams(processedParams).toString()
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
      processedParams,
    ],
    queryFn: () => Api.getQuery<T>(fullUrl),
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

/**
 * 무한 스크롤 GET 요청을 위한 쿼리 훅 매개변수
 */
interface GetInfiniteParams<T = any> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users']) */
  url: Array<string | number | undefined>;
  /** 쿼리 키 (createQueryKeys 객체 또는 배열 형태) */
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>;
  /** URL 쿼리 파라미터 객체 (선택사항) */
  params?: Record<string, any>;
  /** React Query 무한 쿼리 옵션 (선택사항) */
  options?: InfiniteQueryOptionType<T>;
  /** 성공 콜백 */
  callback?: (data: InfiniteData<OkType<T>>) => void;
  /** 에러 콜백 */
  errorCallback?: (error: AxiosError<ErrorType>) => void;
}

/**
 * @description 무한 스크롤 GET 요청을 위한 커스텀 쿼리 훅
 * @returns 무한 쿼리 결과 객체 (response, loading, done, fetchNextPage, hasNextPage, ...)
 */
export function useGetInfinite<T = any>({
  url,
  key,
  params,
  options,
  callback,
  errorCallback,
}: GetInfiniteParams<T>) {
  // 키 처리: 문자열이면 배열로 변환, 이미 배열이면 그대로 사용
  const queryKey = Array.isArray(key)
    ? key
    : typeof key === 'object' && 'queryKey' in key
      ? [ ...key.queryKey, ]
      : [ key, ];

  // URL 배열을 문자열로 결합하고 undefined 값 필터링
  const urlPath = url.filter(Boolean).join('/');

  // 페이지네이션 파라미터 자동 계산 (인피니티 쿼리용)
  const processedParams = params
    ? addPaginationParams(params)
    : undefined;

  // enabled 조건: URL 배열의 모든 요소가 유효할 때만 실행
  const enabled = url.every((segment) => segment !== undefined && segment !== null && segment !== '');

  const {
    data: response,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...other
  } = useInfiniteQuery<OkType<T>, AxiosError<ErrorType>>({
    queryKey: [
      ...queryKey,
      url,
      'infinite',
    ],
    queryFn: async ({ pageParam = 1, }) => {
      const page = (pageParam as number).toString();

      // 페이지네이션 파라미터가 있는 경우 자동 계산 적용
      const queryParams = processedParams
        ? {
          ...processedParams,
          page,
        }
        : { page, };

      const queryString = '?' + new URLSearchParams(queryParams).toString();
      const fullUrl = `/${urlPath}${queryString}`;
      return Api.getQuery<T>(fullUrl);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 비어있거나 최대 페이지에 도달했으면 undefined 반환
      if (
        !lastPage.data
        || (Array.isArray(lastPage.data) && lastPage.data.length === 0)
      ) {
        return undefined;
      }
      const nextPage = allPages.length + 1;
      return nextPage;
    },
    enabled,
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

  // InfiniteData 타입으로 캐스팅하여 타입 안전성 유지
  const infiniteData = response as unknown as
    | InfiniteData<{ data: T }>
    | undefined;

  return {
    response: infiniteData?.pages.flatMap((page) => page.data) || [],
    pageParams: infiniteData?.pageParams || [],
    loading,
    done,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...other,
  };
}
