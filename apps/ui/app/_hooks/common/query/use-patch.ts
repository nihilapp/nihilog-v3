import type { ErrorType } from '@nihilog/schemas';
import { useMutation } from '@tanstack/react-query';

import { useDone } from '@/_hooks/common/use-done';
import { Api, buildQueryString } from '@/_libs';
import type { OptionType } from '@/_types';

export function usePatch<TData = unknown, TBody = unknown>({
  url,
  params = {},
  ttl = 0,
  callback,
  errorCallback,
}: OptionType<TData, TBody>) {
  const urlString = url.join('/');

  const queryString = buildQueryString(params);

  const finalUrl = queryString
    ? `${urlString}?${queryString}`
    : urlString;

  const { data: response, isPending: loading, isSuccess, error, ...other } = useMutation({
    mutationKey: [ ...url, ],
    mutationFn: async (patchData: TBody) => {
      return await Api.patchQuery<TData, TBody>(
        finalUrl,
        patchData
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
