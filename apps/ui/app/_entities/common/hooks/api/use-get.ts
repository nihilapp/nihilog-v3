'use client';

import { useQuery } from '@tanstack/react-query';

import type { QueryOptionType, OkType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';

interface UseGetOptions<TData = unknown> extends QueryOptionType<TData> {
  url: string[];
  params?: Record<string, any>;
  body?: Record<string, any>;
  ttl?: number;
  enable?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: any) => void;
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
    enable = true,
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
      fullUrl, params, body,
    ],
    queryFn: async () => {
      const response = await Api.get<TData>(finalUrl);
      return response.data;
    },
    enabled: enable,
    staleTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    gcTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    ...queryOptions,
  });

  // loading과 done 상태 계산
  const loading = useLoading(query.isLoading, query.isFetching);
  const done = useDone(loading, query.isSuccess);

  // 콜백 실행
  if (query.data && callback) {
    callback(query.data);
  }

  if (query.error && errorCallback) {
    errorCallback(query.error);
  }

  return {
    response: query.data,
    loading,
    done,
    ...query,
  };
}
