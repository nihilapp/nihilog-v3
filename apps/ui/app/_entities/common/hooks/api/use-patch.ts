'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';
import type { MutationOptionsType, OkType } from '@/_types';
import type { ErrorType } from '@/_types';

interface UsePatchOptions<TData = unknown, TVariables = unknown> extends MutationOptionsType<TData, TVariables> {
  url: string[] | ((variables: TVariables) => string[]);
  params?: Record<string, any>;
  enabled?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: ErrorType) => void;
}

/**
 * PATCH 요청을 위한 커스텀 훅
 * @param options - 뮤테이션 옵션
 */
export function usePatch<TData = unknown, TVariables = unknown>(options: UsePatchOptions<TData, TVariables>) {
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
      return await Api.patchQuery<TData, TVariables>(
        finalUrl,
        variables
      );
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
      : (_variables: TVariables, _options?: any) => undefined,
    mutateAsync: enabled
      ? mutation.mutateAsync
      : async (_variables: TVariables, _options?: any) => undefined as any,
  };
}
