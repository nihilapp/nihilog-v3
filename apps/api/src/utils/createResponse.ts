import { RESPONSE_CODE } from '@nihilog/code';
import type { ResponseType } from '@nihilog/schemas';

import { timeToString } from '@/utils/timeHelper';

export function createResponse<TData = any>(
  code: keyof typeof RESPONSE_CODE,
  message: string,
  data: TData
) {
  return {
    error: false,
    code: RESPONSE_CODE[code] as string,
    message,
    data,
    responseTime: timeToString(),
  } as ResponseType<TData>;
}
