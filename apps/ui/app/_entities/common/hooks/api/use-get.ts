'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';
import type { QueryOptionType, OkType } from '@/_types';
import type { ErrorType } from '@/_types';

interface UseGetOptions<TData = unknown> extends QueryOptionType<TData> {
  url: string[];
  params?: Record<string, any>;
  body?: Record<string, any>;
  ttl?: number;
  enabled?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: ErrorType) => void;
}

/**
 * GET 요청을 위한 커스텀 훅
 * @param options - 쿼리 옵션
 */
export function useGet<TData = unknown>(options: UseGetOptions<TData>) {
  const {
    url,
    params = {},
    body = {},
    ttl = 60,
    enabled = true,
    callback,
    errorCallback,
    ...queryOptions
  } = options;

  // URL 세그먼트를 조합하여 완전한 URL 생성
  const fullUrl = url.join('/');

  // 쿼리 파라미터를 URL에 추가
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = queryString
    ? `${fullUrl}?${queryString}`
    : fullUrl;

  const query = useQuery({
    queryKey: [
      fullUrl,
      params,
      body,
    ],
    queryFn: async () => {
      // ensureOk 검증을 통해 error: true 응답을 에러로 처리
      return await Api.getQuery<TData>(finalUrl);
    },
    enabled,
    staleTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    gcTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    ...queryOptions,
  });

  // loading과 done 상태 계산
  const loading = useLoading(
    query.isLoading,
    query.isFetching
  );
  const done = useDone(
    loading,
    query.isSuccess
  );

  // 콜백 실행을 useEffect로 처리하여 렌더링 이후에 실행
  useEffect(
    () => {
      if (query.data && callback) {
        callback(query.data);
      }
    },
    [
      query.data,
      callback,
    ]
  );

  useEffect(
    () => {
      if (query.error && errorCallback) {
        errorCallback(query.error as ErrorType);
      }
    },
    [
      query.error,
      errorCallback,
    ]
  );

  return {
    response: query.data,
    loading,
    done,
    ...query,
  };
}
