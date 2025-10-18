'use client';

import { useMutation } from '@tanstack/react-query';

import type { MutationOptionsType, OkType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';
import type { ErrorType } from '@/_types';

interface UsePutOptions<TData = unknown, TVariables = unknown> extends MutationOptionsType<TData, TVariables> {
  url: string[];
  params?: Record<string, any>;
  body?: TVariables;
  enabled?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: ErrorType) => void;
}

/**
 * PUT 요청을 위한 커스텀 훅
 * @param options - 뮤테이션 옵션
 */
export function usePut<TData = unknown, TVariables = unknown>(options: UsePutOptions<TData, TVariables>) {
  const {
    url,
    params = {},
    body,
    enabled = true,
    callback,
    errorCallback,
    ...mutationOptions
  } = options;

  // URL 세그먼트를 조합하여 완전한 URL 생성
  const fullUrl = url.join('/');

  // 쿼리 파라미터를 URL에 추가
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = queryString
    ? `${fullUrl}?${queryString}`
    : fullUrl;

  const mutation = useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await Api.put<TData, TVariables>(
        finalUrl,
        variables
      );
      return response.data;
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

  // 콜백 실행
  if (mutation.data && callback) {
    callback(mutation.data);
  }

  if (mutation.error && errorCallback) {
    errorCallback(mutation.error as ErrorType);
  }

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
