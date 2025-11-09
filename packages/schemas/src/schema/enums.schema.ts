import { z } from 'zod';

// 스키마 정의

/**
 * @description Y/N 플래그
 */
export const ynSchema = z.enum([
  'Y',
  'N',
]);

/**
 * @description 사용자 역할
 */
export const userRoleSchema = z.enum([
  'USER',
  'ADMIN',
]);

/**
 * @description 게시물 상태: EMPTY(초안 없음), WRITING(작성중), FINISHED(작성완료)
 */
export const postStatusSchema = z.enum([
  'EMPTY',
  'WRITING',
  'FINISHED',
]);

// 타입 정의

/**
 * @description Y/N 플래그 타입
 */
export type YnType = z.infer<typeof ynSchema>;

/**
 * @description 사용자 역할 타입
 */
export type UserRoleType = z.infer<typeof userRoleSchema>;

/**
 * @description 게시물 상태 타입
 */
export type PostStatusType = z.infer<typeof postStatusSchema>;
