import type { ErrorType } from '@nihilog/schemas';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useDone } from '@/_hooks/common/use-done';
import { useLoading } from '@/_hooks/common/use-loading';
import { Api, buildQueryString } from '@/_libs';
import type { OptionType } from '@/_types';

export function useGet<TData = unknown, TBody = unknown>({
  url,
  params = {},
  body = undefined,
  ttl = 0,
  enabled = true,
  callback,
  errorCallback,
}: OptionType<TData, TBody>) {
  const urlString = url.join('/');

  const queryString = buildQueryString(params);

  const finalUrl = queryString
    ? `${urlString}?${queryString}`
    : urlString;

  const { data: response, isLoading, isFetching, isSuccess, error, ...other } = useQuery({
    queryKey: [
      ...url,
      params,
    ],
    async queryFn() {
      if (body !== undefined) {
        return await Api.getWithDataQuery<TData, TBody>(
          finalUrl,
          body
        );
      }
      return await Api.getQuery<TData>(finalUrl);
    },
    enabled,
    staleTime: ttl * 60 * 1000,
    gcTime: ttl * 60 * 1000,
  });

  // 성공 콜백 처리
  useEffect(
    () => {
      if (isSuccess && response && callback) {
        callback(response);
      }
    },
    [
      isSuccess,
      response,
      callback,
    ]
  );

  // 에러 콜백 처리
  useEffect(
    () => {
      if (error && errorCallback) {
        errorCallback(error as unknown as ErrorType);
      }
    },
    [
      error,
      errorCallback,
    ]
  );

  const loading = useLoading(
    isLoading,
    isFetching
  );
  const done = useDone(
    loading,
    isSuccess
  );

  return {
    response,
    error,
    loading,
    done,
    ...other,
  };
}
