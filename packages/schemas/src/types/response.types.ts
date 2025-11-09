// 응답 타입 정의 (common.types.ts의 타입들을 재사용)
import type { ResponseType, ListType } from './common.types';

export type ListResponseType<TData = unknown> = ResponseType<{
  list: TData[];
  totalCnt: number;
}>;

export type OkType<TData = unknown> = ResponseType<TData>;

