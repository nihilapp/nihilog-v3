import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import type { ResponseType } from '@/endpoints/prisma/types/common.types';

export function createResponse<TData = any>(
  code: keyof typeof RESPONSE_CODE,
  message: keyof typeof MESSAGE_CODE,
  data: TData
) {
  return {
    error: false,
    code: RESPONSE_CODE[code] as string,
    message: MESSAGE_CODE[message] as string,
    data,
  } as ResponseType<TData>;
}
