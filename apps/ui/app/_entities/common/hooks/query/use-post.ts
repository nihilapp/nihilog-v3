import { useMutation } from '@tanstack/react-query';

import { useDone } from '@/_entities/common/hooks/use-done';
import { useLoading } from '@/_entities/common/hooks/use-loading';
import { Api } from '@/_libs';
import type { ErrorType, OptionType } from '@/_types';

export function usePost<TData = unknown, TBody = unknown>({
  url,
  params = {},
  ttl = 0,
  callback,
  errorCallback,
}: OptionType<TData, TBody>) {
  const urlString = url.join('/');

  const queryString = new URLSearchParams(params).toString();

  const finalUrl = queryString
    ? `${urlString}?${queryString}`
    : urlString;

  const { data: response, isPending, isSuccess, error, ...other } = useMutation({
    mutationKey: [ ...url, ],
    mutationFn: async (postData: TBody) => {
      return await Api.postQuery<TData, TBody>(
        finalUrl,
        postData
      );
    },
    gcTime: ttl * 60 * 1000,
    onSuccess(res) {
      if (res && callback) {
        callback(res);
      }
    },
    onError(errorRes) {
      if (errorRes && errorCallback) {
        errorCallback(errorRes as unknown as ErrorType);
      }
    },
  });

  const loading = useLoading(
    isPending,
    isPending
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
