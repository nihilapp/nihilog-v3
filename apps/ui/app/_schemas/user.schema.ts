import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, userRoleSchema, passwordSchema, baseSearchSchema } from './common.schema';

// 사용자 요청 스키마들

// 사용자 생성 스키마
export const createUserSchema = z.object({
  emlAddr: z.email('올바른 이메일 형식을 입력해주세요.'),
  userNm: z.string()
    .min(
      2,
      '사용자명은 2자 이상이어야 합니다.'
    )
    .max(
      30,
      '사용자명은 30자 이하여야 합니다.'
    ),
  userRole: userRoleSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema,
}).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  }
);

// 사용자 수정 스키마
export const updateUserSchema = z.object({
  userNm: z.string()
    .min(
      2,
      '사용자명은 2자 이상이어야 합니다.'
    )
    .max(
      30,
      '사용자명은 30자 이하여야 합니다.'
    )
    .optional(),
  userRole: userRoleSchema.optional(),
  proflImg: z
    .url('올바른 URL 형식을 입력해주세요.')
    .max(
      1024,
      '프로필 이미지 URL은 1024자 이하여야 합니다.'
    )
    .nullable()
    .optional(),
  userBiogp: z.string()
    .max(
      500,
      '자기소개는 500자 이하여야 합니다.'
    )
    .nullable()
    .optional(),
}).partial();

// 로그인 스키마
export const signInSchema = z.object({
  emlAddr: z.email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(
    1,
    '비밀번호를 입력해주세요.'
  ),
});

// 비밀번호 찾기 스키마
export const forgotPasswordSchema = z.object({
  emlAddr: z.email('올바른 이메일 형식을 입력해주세요.'),
});

// 비밀번호 변경 스키마
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(
    1,
    '현재 비밀번호를 입력해주세요.'
  ),
  newPassword: passwordSchema,
  newPasswordConfirm: passwordSchema,
}).refine(
  (data) => data.newPassword === data.newPasswordConfirm,
  {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: [ 'newPasswordConfirm', ],
  }
);

// 비밀번호 리셋 스키마
export const resetPasswordSchema = z.object({
  resetToken: z.string().min(
    1,
    '리셋 토큰을 입력해주세요.'
  ),
  newPassword: passwordSchema,
  newPasswordConfirm: passwordSchema,
}).refine(
  (data) => data.newPassword === data.newPasswordConfirm,
  {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: [ 'newPasswordConfirm', ],
  }
);

// 회원탈퇴 스키마
export const withdrawSchema = z.object({
  password: z.string().min(
    1,
    '비밀번호를 입력해주세요.'
  ),
  passwordConfirm: z.string().min(
    1,
    '비밀번호를 확인해주세요.'
  ),
}).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  }
);

// 사용자 삭제 스키마
export const deleteUserSchema = z.object({
  userNo: z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .optional(),
  userNoList: z.array(z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 사용자 검색 스키마
export const searchUserSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  useYn: ynEnumSchema.optional(),
  userRole: userRoleSchema.optional(),
  srchType: z.enum(
    [
      'userNm',
      'emlAddr',
    ],
    {
      error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
    }
  ).optional(),
  // 날짜 범위 필터
  crtDtFrom: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
    )
    .optional(),
  crtDtTo: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
    )
    .optional(),
  lastLgnDtFrom: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
    )
    .optional(),
  lastLgnDtTo: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
    )
    .optional(),
  // 정렬 옵션
  orderBy: z.enum(
    [
      'NAME_ASC',
      'NAME_DESC',
      'SUBSCRIBE_LATEST',
      'SUBSCRIBE_OLDEST',
      'LOGIN_LATEST',
      'LOGIN_OLDEST',
    ],
    {
      error: '정렬 옵션은 NAME_ASC, NAME_DESC, SUBSCRIBE_LATEST, SUBSCRIBE_OLDEST, LOGIN_LATEST, LOGIN_OLDEST 중 하나여야 합니다.',
    }
  ).optional(),
}).partial();

// 타입 추출
export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type DeleteUserType = z.infer<typeof deleteUserSchema>;
export type SignInType = z.infer<typeof signInSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type WithdrawType = z.infer<typeof withdrawSchema>;
export type SearchUserType = z.infer<typeof searchUserSchema>;
