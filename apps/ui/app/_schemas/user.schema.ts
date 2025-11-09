import { createUserSchema, changePasswordSchema, resetPasswordSchema, passwordSchema } from '@nihilog/schemas';
import { z } from 'zod';

// 스키마 정의
export const createUserUISchema = createUserSchema.extend({
  passwordConfirm: passwordSchema,
}).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: [ 'passwordConfirm', ],
  }
);

export const changePasswordUISchema = changePasswordSchema.extend({
  newPasswordConfirm: passwordSchema,
}).refine(
  (data) => data.newPassword === data.newPasswordConfirm,
  {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: [ 'newPasswordConfirm', ],
  }
);

export const resetPasswordUISchema = resetPasswordSchema.extend({
  newPasswordConfirm: passwordSchema,
}).refine(
  (data) => data.newPassword === data.newPasswordConfirm,
  {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: [ 'newPasswordConfirm', ],
  }
);

// 타입 정의
export type CreateUserUISchemaType = z.infer<typeof createUserUISchema>;
export type ChangePasswordUISchemaType = z.infer<typeof changePasswordUISchema>;
export type ResetPasswordUISchemaType = z.infer<typeof resetPasswordUISchema>;
