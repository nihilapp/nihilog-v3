import { RESPONSE_CODE } from '@/code/response.code';
import type { ResponseType } from '@/endpoints/prisma/types/common.types';
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
