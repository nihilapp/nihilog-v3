import { useQueryClient } from '@tanstack/react-query';

/**
 * @description 뮤테이션 훅에서 공통으로 사용하는 로직을 처리하는 헬퍼 함수
 * @returns queryClient, queryKey, fullUrl 객체
 */
export function usePrepareMutationParams(
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>,
  url: Array<string | number | undefined>
) {
  const queryClient = useQueryClient();

  const queryKey = Array.isArray(key)
    ? key
    : typeof key === 'object' && 'queryKey' in key
      ? [ ...key.queryKey, ]
      : [ key, ];

  const urlPath = url.filter(Boolean).join('/');
  const fullUrl = `/${urlPath}`;

  return { queryClient, queryKey, fullUrl, };
}
