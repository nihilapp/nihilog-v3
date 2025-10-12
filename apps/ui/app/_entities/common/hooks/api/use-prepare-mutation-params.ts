import { useQueryClient } from '@tanstack/react-query';

/**
 * @description 뮤테이션 훅에서 공통으로 사용하는 로직을 처리하는 헬퍼 함수
 * @returns queryClient, queryKey, fullUrl 객체
 */
export function usePrepareMutationParams(
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>,
  url: Array<string | number | undefined>,
  params?: Record<string, any>
) {
  const queryClient = useQueryClient();

  const queryKey = Array.isArray(key)
    ? key
    : typeof key === 'object' && 'queryKey' in key
      ? [ ...key.queryKey, ]
      : [ key, ];

  const urlPath = url.filter(Boolean).join('/');

  // 쿼리 파라미터 처리
  const queryString = params
    ? '?' + new URLSearchParams(params).toString()
    : '';

  const fullUrl = `/${urlPath}${queryString}`;

  return { queryClient, queryKey, fullUrl, };
}
