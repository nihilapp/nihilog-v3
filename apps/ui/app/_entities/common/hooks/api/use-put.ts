import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorType, MutationOptionsType, OkType } from '@/_entities/common/common.types';
import { Api } from '@/_libs/tools/axios.tools';

import { usePrepareMutationParams } from './use-prepare-mutation-params';

/**
 * PUT 요청을 위한 뮤테이션 훅 매개변수
 */
interface MutationWithDataParams<TData, TVariables> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users', userId]) */
  url: Array<string | number | undefined>;
  /** 무효화할 쿼리 키 (createQueryKeys 객체 또는 배열 형태) */
  key: { queryKey: readonly (string | number | Record<string, any>)[] } | string | Array<string | number | Record<string, any>>;
  /** URL 쿼리 파라미터 객체 (선택사항) */
  params?: Record<string, any>;
  /** React Query 뮤테이션 옵션 (선택사항) */
  options?: MutationOptionsType<OkType<TData>, TVariables>;
  /** 성공 콜백 */
  callback?: (data: OkType<TData>, variables: TVariables, context: unknown) => void;
  /** 에러 콜백 */
  errorCallback?: (error: AxiosError<ErrorType>, variables: TVariables, context: unknown) => void;
}

/**
 * @description PUT 요청을 위한 커스텀 뮤테이션 훅
 * @returns React Query 뮤테이션 객체
 */
export function usePut<TData = any, TVariables = any>({
  url,
  key,
  params,
  options,
  callback,
  errorCallback,
}: MutationWithDataParams<TData, TVariables>) {
  const { queryClient, queryKey, fullUrl, } = usePrepareMutationParams(key, url, params);

  const {
    data: response,
    ...mutation
  } = useMutation<OkType<TData>, AxiosError<ErrorType>, TVariables>({
    mutationFn: async (variables: TVariables) => {
      return await Api.putQuery<TData, TVariables>(fullUrl, variables);
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      // 1. 쿼리 무효화 (기본 동작)
      queryClient.invalidateQueries({ queryKey, });

      // 2. options의 onSuccess 실행 (사용자 정의 options)
      options?.onSuccess?.(data, variables, onMutateResult, mutationContext);

      // 3. callback 실행 (훅 레벨의 기본 콜백)
      callback?.(data, variables, onMutateResult);
    },
    onError: (errorData, variables, onMutateResult, mutationContext) => {
      // 1. options의 onError 실행 (사용자 정의 options)
      options?.onError?.(errorData, variables, onMutateResult, mutationContext);

      // 2. errorCallback 실행 (훅 레벨의 기본 콜백)
      errorCallback?.(errorData, variables, onMutateResult);
    },
  });

  return {
    response,
    ...mutation,
  };
}
