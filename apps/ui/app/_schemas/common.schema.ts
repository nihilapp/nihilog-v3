import { z } from 'zod';

// Y/N 플래그
export const ynEnumSchema = z.enum([
  'Y', 'N',
], 'Y 또는 N 값을 입력해주세요.');
export type YnType = z.infer<typeof ynEnumSchema>;

// 사용자 역할
export const userRoleSchema = z.enum([
  'USER', 'ADMIN',
], '사용자 권한은 필수입니다.');
export type UserRoleType = z.infer<typeof userRoleSchema>;

// 게시물 상태
export const postStatusSchema = z.enum([
  'EMPTY', 'WRITING', 'FINISHED',
], '올바른 포스트 상태를 입력해주세요.');
export type PostStatusType = z.infer<typeof postStatusSchema>;

// 공통 비밀번호 스키마
export const passwordSchema = z.string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(30, '비밀번호는 30자 이하여야 합니다.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    '비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 각각 1개 이상 포함해야 합니다.'
  );

// 범용 검색 스키마 (기본 필드만)
export const baseSearchSchema = z.object({
  strtRow: z.number()
    .int('시작행은 정수여야 합니다.')
    .min(0, '시작행은 0 이상이어야 합니다.')
    .optional(),
  endRow: z.number()
    .int('끝행은 정수여야 합니다.')
    .min(1, '끝행은 1 이상이어야 합니다.')
    .optional(),
  srchType: z.string().optional(),
  srchKywd: z.string()
    .max(100, '검색 키워드는 100자 이하여야 합니다.')
    .optional(),
  page: z.number()
    .int('페이지는 정수여야 합니다.')
    .min(1, '페이지는 1 이상이어야 합니다.')
    .optional(),
});

// 통계 분석 스키마
export const analyzeStatSchema = z.object({
  dateStart: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'),
  dateEnd: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'),
  period: z.enum([
    'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY',
  ], {
    error: '기간은 DAILY, WEEKLY, MONTHLY, YEARLY 중 하나여야 합니다.',
  }).optional(),
  limit: z.number()
    .int('제한 수는 정수여야 합니다.')
    .min(1, '제한 수는 1 이상이어야 합니다.')
    .max(100, '제한 수는 100 이하여야 합니다.')
    .optional(),
});

// 타입 추출
export type BaseSearchType = z.infer<typeof baseSearchSchema>;
export type AnalyzeStatType = z.infer<typeof analyzeStatSchema>;
