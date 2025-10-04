import { z } from 'zod';

// Y/N 플래그
export const ynSchema = z.enum([ 'Y', 'N', ]);
export type YnType = z.infer<typeof ynSchema>;

// 사용자 역할
export const userRoleSchema = z.enum([ 'USER', 'ADMIN', ]);
export type UserRoleType = z.infer<typeof userRoleSchema>;

// 게시물 상태: EMPTY(초안 없음), WRITING(작성중), FINISHED(작성완료)
export const postStatusSchema = z.enum([ 'EMPTY', 'WRITING', 'FINISHED', ]);
export type PostStatusType = z.infer<typeof postStatusSchema>;
