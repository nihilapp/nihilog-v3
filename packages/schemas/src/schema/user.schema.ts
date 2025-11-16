import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { userRoleSchema as baseUserRoleSchema } from './enums.schema';
import { baseSearchSchema } from './search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// USER_MESSAGES는 API에서만 사용되므로 여기서는 기본 메시지 사용
const USER_MESSAGES = {
  USER: {
    EMAIL_INVALID: '올바른 이메일 형식을 입력해주세요.',
    NAME_TOO_SHORT: '사용자명은 2자 이상이어야 합니다.',
    NAME_TOO_LONG: '사용자명은 30자 이하여야 합니다.',
  },
};

/**
 * @description 사용자 권한 스키마 (에러 메시지 추가)
 */
export const userRoleSchema = baseUserRoleSchema.refine(
  (val) => val === 'USER' || val === 'ADMIN',
  {
    message: '사용자 권한은 필수입니다.',
  }
);

/**
 * @description 공통 비밀번호 스키마
 */
export const passwordSchema = z.string()
  .min(
    10,
    '비밀번호는 10자 이상이어야 합니다.'
  )
  .max(
    30,
    '비밀번호는 30자 이하여야 합니다.'
  )
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    '비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 각각 1개 이상 포함해야 합니다.'
  )
  .openapi({
    description: '비밀번호 (10-30자, 영문 대소문자/숫자/특수문자 포함)',
    example: 'Password123!',
  });

// Zod 스키마 정의

/**
 * @description 사용자 정보 스키마
 */
export const userInfoSchema = commonSchema.extend({
  userNo: z
    .number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '사용자 번호',
      example: 1,
    }),
  emlAddr: z.email(USER_MESSAGES.USER.EMAIL_INVALID)
    .openapi({
      description: '사용자 이메일 주소 (올바른 이메일 형식)',
      example: 'user@example.com',
    }),
  userNm: z.string()
    .min(
      2,
      USER_MESSAGES.USER.NAME_TOO_SHORT
    )
    .max(
      30,
      USER_MESSAGES.USER.NAME_TOO_LONG
    )
    .openapi({
      description: '사용자명 (2-30자)',
      example: '홍길동',
    }),
  userRole: userRoleSchema
    .openapi({
      description: '사용자 역할',
      example: 'USER',
    }),
  proflImg: z.url('올바른 URL 형식을 입력해주세요.')
    .max(
      1024,
      '프로필 이미지 URL은 1024자 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '프로필 이미지 URL (올바른 URL 형식)',
      example: 'https://example.com/profile.jpg',
    }),
  userBiogp: z.string()
    .max(
      500,
      '자기소개는 500자를 초과할 수 없습니다.'
    )
    .optional()
    .openapi({
      description: '사용자 자기소개 (500자 이하)',
      example: '안녕하세요! 개발자입니다.',
    }),
  encptPswd: z.string()
    .min(
      1,
      '암호화된 비밀번호는 필수입니다.'
    )
    .max(
      255,
      '암호화된 비밀번호는 255자 이하여야 합니다.'
    )
    .openapi({
      description: '암호화된 비밀번호 (8-255자, 영문/숫자/특수문자 포함)',
      example: 'hashedPassword123!',
    }),
  reshToken: z.string()
    .max(
      500,
      '리프레시 토큰은 500자 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '리프레시 토큰',
      example: 'refresh_token_here',
    }),
  lastLgnDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '마지막 로그인 날짜 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  lastPswdChgDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '마지막 비밀번호 변경 날짜 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce.number()
    .int('총 행 수는 정수여야 합니다.')
    .optional()
    .openapi({
      description: '총 행 수',
      example: 100,
    }),
  userNoList: z.array(z.number())
    .optional()
    .openapi({
      description: '사용자 번호 목록',
      example: [
        1,
        2,
        3,
      ],
    }),
});

// 커스텀 스키마 정의

/**
 * @description 사용자 생성 스키마
 */
export const createUserSchema = userInfoSchema.pick({
  emlAddr: true,
  userNm: true,
  userRole: true,
}).extend({
  password: passwordSchema,
  masterKey: z.string()
    .min(
      1,
      '마스터 키를 입력해주세요.'
    )
    .optional()
    .openapi({
      description: '마스터 키 (프로덕션 환경에서 어드민 생성 시 필요, 개발 환경에서는 선택적)',
      example: 'your-secure-master-key-here',
    }),
});

/**
 * @description 사용자 수정 스키마
 */
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

/**
 * @description 다중 사용자 삭제 스키마
 */
export const deleteMultipleUsersSchema = userInfoSchema.pick({
  userNoList: true,
});

/**
 * @description 로그인 스키마
 */
export const signInSchema = userInfoSchema.pick({
  emlAddr: true,
}).extend({
  password: z.string()
    .min(
      1,
      '비밀번호를 입력해주세요.'
    )
    .openapi({
      description: '비밀번호',
      example: 'Password123!',
    }),
});

/**
 * @description 비밀번호 찾기 스키마
 */
export const forgotPasswordSchema = userInfoSchema.pick({
  emlAddr: true,
});

/**
 * @description 비밀번호 변경 스키마
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(
      1,
      '현재 비밀번호를 입력해주세요.'
    )
    .openapi({
      description: '현재 비밀번호',
      example: 'OldPassword123!',
    }),
  newPassword: passwordSchema,
});

/**
 * @description 비밀번호 리셋 스키마
 */
export const resetPasswordSchema = z.object({
  resetToken: z.string()
    .min(
      1,
      '리셋 토큰을 입력해주세요.'
    )
    .openapi({
      description: '비밀번호 리셋 토큰',
      example: 'reset_token_abc123',
    }),
  newPassword: passwordSchema,
});

/**
 * @description 회원탈퇴용 스키마
 */
export const withdrawSchema = z.object({
  password: z.string()
    .min(
      1,
      '비밀번호를 입력해주세요.'
    )
    .openapi({
      description: '비밀번호 (회원탈퇴 확인용)',
      example: 'Password123!',
    }),
});

/**
 * @description 사용자 검색 전용 스키마 (기본 검색 스키마 확장)
 */
export const searchUserSchema = baseSearchSchema.extend({
  ...userInfoSchema.pick({
    delYn: true,
    useYn: true,
    userRole: true,
  }).shape,
  srchType: z.enum(
    [
      'userNm',
      'emlAddr',
    ],
    {
      error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
    }
  ).optional()
    .openapi({
      description: '검색 타입 (emlAddr, userNm, 중 하나)',
      example: 'userNm',
    }),
  // 날짜 범위 필터
  crtDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '구독일 시작 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  crtDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '구독일 끝 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-12-31 23:59:59',
    }),
  lastLgnDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '마지막 로그인일 시작 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  lastLgnDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '마지막 로그인일 끝 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-12-31 23:59:59',
    }),
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
  ).optional()
    .openapi({
      description: '정렬 옵션 (이름순/역순, 구독 최신/오래된순, 로그인 최신/오래된순)',
      example: 'SUBSCRIBE_LATEST',
    }),
}).partial();

/**
 * @description 모든 항목이 선택값인 스키마
 */
export const partialUserInfoSchema = userInfoSchema.partial();

// 타입 정의

/**
 * @description 사용자 정보 타입
 */
export type UserInfoType = z.infer<typeof userInfoSchema>;

/**
 * @description 사용자 생성 타입
 */
export type CreateUserType = z.infer<typeof createUserSchema>;

/**
 * @description 사용자 수정 타입
 */
export type UpdateUserType = z.infer<typeof updateUserSchema>;

/**
 * @description 다중 사용자 삭제 타입
 */
export type DeleteMultipleUsersType = z.infer<typeof deleteMultipleUsersSchema>;

/**
 * @description 로그인 타입
 */
export type SignInType = z.infer<typeof signInSchema>;

/**
 * @description 비밀번호 찾기 타입
 */
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

/**
 * @description 비밀번호 변경 타입
 */
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

/**
 * @description 비밀번호 리셋 타입
 */
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

/**
 * @description 사용자 역할 타입
 */
export type UserRoleType = z.infer<typeof userRoleSchema>;

/**
 * @description 부분 사용자 정보 타입
 */
export type PartialUserInfoType = z.infer<typeof partialUserInfoSchema>;

/**
 * @description 사용자 검색 타입
 */
export type SearchUserType = z.infer<typeof searchUserSchema>;

/**
 * @description 회원탈퇴 타입
 */
export type WithdrawType = z.infer<typeof withdrawSchema>;
