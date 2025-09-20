import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorType, MutationOptionsType, OkType } from '@/_entities/common/common.types';
import { Api } from '@/_libs/tools/axios.tools';

import { usePrepareMutationParams } from './use-prepare-mutation-params';

/**
 * PATCH 요청을 위한 뮤테이션 훅 매개변수
 */
interface MutationWithDataParams<TData, TVariables> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users', userId]) */
  url: Array<string | number | undefined>;
  /** 무효화할 쿼리 키 (createQueryKeys 객체 또는 배열 형태) */
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>;
  /** React Query 뮤테이션 옵션 (선택사항) */
  options?: MutationOptionsType<OkType<TData>, TVariables>;
  /** 성공 콜백 */
  callback?: (data: OkType<TData>, variables: TVariables, context: unknown) => void;
  /** 에러 콜백 */
  errorCallback?: (error: AxiosError<ErrorType>, variables: TVariables, context: unknown) => void;
}

/**
 * @description PATCH 요청을 위한 커스텀 뮤테이션 훅
 * @returns React Query 뮤테이션 객체
 */
export function usePatch<TData = any, TVariables = any>({
  url,
  key,
  options,
  callback,
  errorCallback,
}: MutationWithDataParams<TData, TVariables>) {
  const { queryClient, queryKey, fullUrl, } = usePrepareMutationParams(key, url);

  const {
    data: response,
    ...mutation
  } = useMutation<OkType<TData>, AxiosError<ErrorType>, TVariables>({
    mutationFn: async (variables: TVariables) => {
      return await Api.patchQuery<TData, TVariables>(fullUrl, variables);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey, });
      callback?.(data, variables, context);
    },
    onError: (errorData, variables, context) => {
      errorCallback?.(errorData, variables, context);
    },
    ...options,
  });

  return {
    response,
    ...mutation,
  };
}
