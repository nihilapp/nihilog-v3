import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorType, MutationOptionsType, OkType } from '@/_entities/common/common.types';
import { Api } from '@/_libs/tools/axios.tools';

import { usePrepareMutationParams } from './use-prepare-mutation-params';

/**
 * POST 요청을 위한 뮤테이션 훅 매개변수
 */
interface MutationWithDataParams<TData, TVariables> {
  /** API 엔드포인트 URL 경로 배열 (예: ['api', 'users']) */
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
 * @description POST 요청을 위한 커스텀 뮤테이션 훅
 * @returns React Query 뮤테이션 객체
 */
export function usePost<TData = any, TVariables = any>({
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
      return await Api.postQuery<TData, TVariables>(fullUrl, variables);
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      // 1. 수동 캐싱 처리 - 기존 쿼리 키로 캐시 업데이트
      const oldData = queryClient.getQueryData(queryKey);
      if (oldData && Array.isArray((oldData as any)?.data)) {
        // 배열 데이터인 경우 새 데이터 추가
        const newCacheData = {
          ...oldData,
          data: [
            ...(oldData as any).data,
            data.data,
          ],
        };
        queryClient.setQueryData(queryKey, newCacheData);
      }
      else if (oldData) {
        // 단일 객체 데이터인 경우 교체
        queryClient.setQueryData(queryKey, data);
      }

      // 2. 쿼리 무효화 (기본 동작)
      queryClient.invalidateQueries({ queryKey, });

      // 3. options의 onSuccess 실행 (사용자 정의 options)
      options?.onSuccess?.(data, variables, onMutateResult, mutationContext);

      // 4. callback 실행 (훅 레벨의 기본 콜백)
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
