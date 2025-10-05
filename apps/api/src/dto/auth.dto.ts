import { createZodDto } from 'nestjs-zod';

import { changePasswordSchema, createUserSchema, forgotPasswordSchema, resetPasswordSchema, signInSchema, withdrawSchema } from '@/endpoints/prisma/schemas/user.schema';

// 회원가입 DTO
export class CreateUserDto extends createZodDto(createUserSchema) {}

// 로그인 DTO
export class SignInDto extends createZodDto(signInSchema) {}

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}

// 비밀번호 재설정 DTO
export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}

// 비밀번호 변경 DTO
export class ChangePasswordDto extends createZodDto(changePasswordSchema) {}

// 회원탈퇴 DTO (비밀번호 확인)
export class WithdrawDto extends createZodDto(withdrawSchema) {}
