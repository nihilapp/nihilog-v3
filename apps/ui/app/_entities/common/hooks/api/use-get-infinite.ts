'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import type { InfiniteQueryOptionType, OkType } from '@/_entities/common/common.types';
import { useDone, useLoading } from '@/_entities/common/hooks';
import { Api } from '@/_libs/tools/axios.tools';

interface UseGetInfiniteOptions<TPageData = unknown, TPageParam = unknown> extends Omit<InfiniteQueryOptionType<TPageData, TPageParam>, 'getNextPageParam' | 'getPreviousPageParam'> {
  url: string[];
  params?: Record<string, any>;
  body?: Record<string, any>;
  ttl?: number;
  enable?: boolean;
  getNextPageParam?: (lastPage: OkType<TPageData>, allPages: OkType<TPageData>[]) => TPageParam | undefined;
  getPreviousPageParam?: (firstPage: OkType<TPageData>, allPages: OkType<TPageData>[]) => TPageParam | undefined;
  callback?: (response: OkType<TPageData>) => void;
  errorCallback?: (error: any) => void;
}

/**
 * 무한 스크롤을 위한 GET 요청 커스텀 훅
 * @param options - 무한 쿼리 옵션
 */
export function useGetInfinite<TPageData = unknown, TPageParam = unknown>(
  options: UseGetInfiniteOptions<TPageData, TPageParam>
) {
  const {
    url,
    params = {},
    body = {},
    ttl = 60,
    enable = true,
    getNextPageParam,
    getPreviousPageParam,
    callback,
    errorCallback,
    ...queryOptions
  } = options;

  // URL 세그먼트를 조합하여 완전한 URL 생성
  const fullUrl = url.join('/');

  const query = useInfiniteQuery({
    queryKey: [
      fullUrl,
      params,
      body,
    ],
    queryFn: async ({ pageParam, }: { pageParam: TPageParam }) => {
      // 페이지 파라미터를 쿼리 파라미터에 추가
      const queryParams = { ...params, page: String(pageParam), };
      const queryString = new URLSearchParams(queryParams).toString();
      const finalUrl = queryString
        ? `${fullUrl}?${queryString}`
        : fullUrl;

      const response = await Api.get<TPageData>(finalUrl);
      return response.data;
    },
    enabled: enable,
    staleTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    gcTime: ttl * 60 * 1000, // 분을 밀리초로 변환
    ...(getNextPageParam && { getNextPageParam, }),
    ...(getPreviousPageParam && { getPreviousPageParam, }),
    ...queryOptions,
  } as any);

  // loading과 done 상태 계산
  const loading = useLoading(query.isLoading, query.isFetching);
  const done = useDone(loading, query.isSuccess);

  // 콜백 실행
  if (query.data && callback) {
    query.data.pages.forEach((page) => callback(page as OkType<TPageData>));
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
