import type { MESSAGE_CODE, RESPONSE_CODE } from '@/code';

export type ListType<TData = unknown> = {
  list: TData[];
  totalCnt: number;
};

export type MultipleResultType = {
  successCnt: number;
  failCnt: number;
  failNoList: number[];
};

export type ResponseType<TData = unknown> = {
  error: false;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: TData;
};

export type ErrorType = {
  error: true;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: null;
};
