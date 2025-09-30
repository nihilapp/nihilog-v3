import { z } from 'zod';

import { userRole } from '@/endpoints/drizzle/enums';
import { commonSchema, dateTimeMessage, dateTimeRegex, ynEnumSchema } from '@/endpoints/drizzle/schemas/common.schema';

import { baseSearchSchema, addPaginationValidation } from './search.schema';

// Drizzle enum을 Zod 스키마로 변환
export const userRoleSchema = z.enum(userRole.enumValues, '사용자 권한은 필수입니다.');

// 공통 비밀번호 스키마
export const passwordSchema = z.string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(30, '비밀번호는 30자 이하여야 합니다.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    '비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 각각 1개 이상 포함해야 합니다.'
  );

// Zod 스키마 정의

export const userInfoSchema = commonSchema.extend({
  userNo: z.coerce.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .optional(),
  emlAddr: z.email('올바른 이메일 형식을 입력해주세요.'),
  userNm: z.string()
    .min(2, '사용자명은 2자 이상이어야 합니다.')
    .max(30, '사용자명은 30자 이하여야 합니다.'),
  userRole: userRoleSchema,
  proflImg: z.url('올바른 URL 형식을 입력해주세요.')
    .max(1024, '프로필 이미지 URL은 1024자 이하여야 합니다.')
    .nullable().optional(),
  userBiogp: z.string()
    .max(500, '자기소개는 500자 이하여야 합니다.')
    .nullable()
    .optional(),
  encptPswd: z.string()
    .min(1, '암호화된 비밀번호는 필수입니다.')
    .max(255, '암호화된 비밀번호는 255자 이하여야 합니다.'),
  reshToken: z.string()
    .max(500, '리프레시 토큰은 500자 이하여야 합니다.')
    .nullable()
    .optional(),
  lastLgnDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  lastPswdChgDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 행 수는 정수여야 합니다.')
    .nullable()
    .optional(),
  userNoList: z.array(z.coerce.number())
    .nullable()
    .optional(),
});

// 커스텀 스키마 정의
export const createUserSchema = userInfoSchema.pick({
  emlAddr: true,
  userNm: true,
  userRole: true,
}).extend({
  password: passwordSchema,
  passwordConfirm: passwordSchema,
})
  .refine((data) => data.password === data.passwordConfirm, {
    error: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  });

export const updateUserSchema = userInfoSchema.pick({
  userNm: true,
  userRole: true,
  proflImg: true,
  userBiogp: true,
  useYn: true,
  delYn: true,
  delDt: true,
  encptPswd: true,
  reshToken: true,
  lastLgnDt: true,
  lastPswdChgDt: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  userNoList: true,
}).partial();

export const deleteMultipleUsersSchema = userInfoSchema.pick({
  userNoList: true,
});

export const signInSchema = userInfoSchema.pick({
  emlAddr: true,
}).extend({
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export const forgotPasswordSchema = userInfoSchema.pick({
  emlAddr: true,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: '비밀번호가 일치하지 않습니다.',
    path: [ 'confirmPassword', ],
  });

export const resetPasswordSchema = z.object({
  resetToken: z.string().min(1, '리셋 토큰을 입력해주세요.'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: '비밀번호가 일치하지 않습니다.',
    path: [ 'confirmPassword', ],
  });

// 회원탈퇴용 스키마 (비밀번호 확인)
export const withdrawSchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  passwordConfirm: z.string().min(1, '비밀번호를 확인해주세요.'),
})
  .refine((data) => data.password === data.passwordConfirm, {
    error: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  });

// 사용자 검색 전용 스키마 (기본 검색 스키마 확장)
export const searchUserSchema = addPaginationValidation(baseSearchSchema.extend({
  srchType: z.enum([ 'userNm', 'emlAddr', 'userRole', ], {
    error: '검색 타입은 userNm, emlAddr, userRole 중 하나여야 합니다.',
  }).optional(),
  delYn: ynEnumSchema.optional(),
}));

// 모든 항목이 선택값인 스키마
export const partialUserInfoSchema = userInfoSchema.partial();

// 타입 추출
export type UserInfoType = z.infer<typeof userInfoSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type DeleteMultipleUsersType = z.infer<typeof deleteMultipleUsersSchema>;
export type SignInType = z.infer<typeof signInSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type UserRoleType = z.infer<typeof userRoleSchema>;
export type PartialUserInfoType = z.infer<typeof partialUserInfoSchema>;
export type SearchUserType = z.infer<typeof searchUserSchema>;
export type WithdrawType = z.infer<typeof withdrawSchema>;
