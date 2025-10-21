'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import type { MutationOptionsType, OkType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';
import type { ErrorType } from '@/_types';

interface UseDeleteOptions<TData = unknown, TVariables = unknown> extends MutationOptionsType<TData, TVariables> {
  url: string[] | ((variables: TVariables) => string[]);
  params?: Record<string, any>;
  enabled?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: ErrorType) => void;
}

/**
 * DELETE 요청을 위한 커스텀 훅
 * @param options - 뮤테이션 옵션
 */
export function useDelete<TData = unknown, TVariables = unknown>(options: UseDeleteOptions<TData, TVariables>) {
  const {
    url,
    params = {},
    enabled = true,
    callback,
    errorCallback,
    ...mutationOptions
  } = options;

  const mutation = useMutation({
    mutationFn: async (variables: TVariables) => {
      // URL 세그먼트를 조합하여 완전한 URL 생성
      const urlSegments = typeof url === 'function'
        ? url(variables)
        : url;
      const fullUrl = urlSegments.join('/');

      // 쿼리 파라미터를 URL에 추가
      const queryString = new URLSearchParams(params).toString();
      const finalUrl = queryString
        ? `${fullUrl}?${queryString}`
        : fullUrl;

      // ensureOk 검증을 통해 error: true 응답을 에러로 처리
      if (variables) {
        return await Api.deleteWithDataQuery<TData, TVariables>(
          finalUrl,
          variables
        );
      }
      return await Api.deleteQuery<TData>(finalUrl);
    },
    ...mutationOptions,
  });

  // loading과 done 상태 계산
  const loading = useLoading(
    mutation.isPending,
    mutation.isPending
  );
  const done = useDone(
    loading,
    mutation.isSuccess
  );

  // 콜백 실행을 useEffect로 처리하여 렌더링 이후에 실행
  useEffect(
    () => {
      if (mutation.data && callback) {
        callback(mutation.data);
      }
    },
    [
      mutation.data,
      callback,
    ]
  );

  useEffect(
    () => {
      if (mutation.error && errorCallback) {
        errorCallback(mutation.error as ErrorType);
      }
    },
    [
      mutation.error,
      errorCallback,
    ]
  );

  return {
    response: mutation.data,
    loading,
    done,
    ...mutation,
    mutate: enabled
      ? mutation.mutate
      : (..._args: any[]) => undefined as any,
    mutateAsync: enabled
      ? mutation.mutateAsync
      : async (..._args: any[]) => undefined as any,
  };
}
