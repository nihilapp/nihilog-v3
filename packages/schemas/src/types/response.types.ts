/**
 * @description 응답 타입 정의 (common.types.ts의 타입들을 재사용)
 */
import type { ResponseType, ListType } from './common.types';

/**
 * @description 리스트 응답 타입
 */
export type ListResponseType<TData = unknown> = ResponseType<{
  list: TData[];
  totalCnt: number;
}>;

/**
 * @description 성공 응답 타입
 */
export type OkType<TData = unknown> = ResponseType<TData>;

