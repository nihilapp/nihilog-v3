# DTO 및 Schema 리팩토링 가이드

## 개요

DTO 파일의 중복된 `@ApiProperty` 데코레이터를 제거하고, Zod Schema에 OpenAPI 메타데이터를 추가하여 코드를 간결하게 만드는 작업입니다.

## 목표

- DTO 파일의 중복 코드 제거 (296줄 → 34줄로 감소)
- Zod Schema를 Single Source of Truth로 활용
- Swagger 문서화를 Schema 레벨에서 관리
- Repository 반환 타입을 Prisma Types로 통일

## 1단계: 패키지 설치

```bash
pnpm add @asteasolutions/zod-to-openapi
```

이 패키지는 Zod 스키마에 `.openapi()` 메서드를 추가하여 설명(description)과 예시(example)를 지정할 수 있게 해줍니다.

## 2단계: Schema 파일에 OpenAPI 확장 적용

### common.schema.ts 수정

```typescript
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { yn } from "@/endpoints/drizzle/enums";

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

export const commonSchema = z.object({
  useYn: ynEnumSchema.default("Y").openapi({
    description: "사용 여부",
    example: "Y",
  }),
  delYn: ynEnumSchema.default("N").openapi({
    description: "삭제 여부",
    example: "N",
  }),
  crtNo: z.coerce
    .number()
    .int("생성자 번호는 정수여야 합니다.")
    .nullable()
    .optional()
    .openapi({
      description: "생성자 번호",
      example: 1,
    }),
  // ... 나머지 필드들
});
```

### user.schema.ts 수정

```typescript
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { userRole } from "@/endpoints/drizzle/enums";
import {
  commonSchema,
  dateTimeMessage,
  dateTimeRegex,
} from "@/endpoints/prisma/schemas/common.schema";

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// 공통 비밀번호 스키마
export const passwordSchema = z
  .string()
  .min(10, "비밀번호는 10자 이상이어야 합니다.")
  .max(30, "비밀번호는 30자 이하여야 합니다.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 각각 1개 이상 포함해야 합니다."
  )
  .openapi({
    description: "비밀번호 (10-30자, 영문 대소문자/숫자/특수문자 포함)",
    example: "Password123!",
  });

export const userInfoSchema = commonSchema.extend({
  userNo: z.coerce
    .number()
    .int("사용자 번호는 정수여야 합니다.")
    .positive("사용자 번호는 양수여야 합니다.")
    .optional()
    .openapi({
      description: "사용자 번호",
      example: 1,
    }),
  emlAddr: z.email("올바른 이메일 형식을 입력해주세요.").openapi({
    description: "사용자 이메일 주소 (올바른 이메일 형식)",
    example: "user@example.com",
  }),
  userNm: z
    .string()
    .min(2, "사용자명은 2자 이상이어야 합니다.")
    .max(30, "사용자명은 30자 이하여야 합니다.")
    .openapi({
      description: "사용자명 (2-30자)",
      example: "홍길동",
    }),
  // ... 나머지 필드들
});
```

### 비밀번호 확인 필드 제거

클라이언트에서 검증하므로 서버에서는 불필요:

```typescript
// BEFORE
export const createUserSchema = userInfoSchema
  .pick({
    emlAddr: true,
    userNm: true,
    userRole: true,
  })
  .extend({
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

// AFTER
export const createUserSchema = userInfoSchema
  .pick({
    emlAddr: true,
    userNm: true,
    userRole: true,
  })
  .extend({
    password: passwordSchema,
  });
```

동일하게 다음 스키마들도 수정:

- `changePasswordSchema`: `confirmPassword` 제거
- `resetPasswordSchema`: `confirmPassword` 제거
- `withdrawSchema`: `passwordConfirm` 제거

## 3단계: DTO 파일 간소화

### user.dto.ts 수정

**BEFORE (296줄):**

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { createZodDto } from "nestjs-zod";

export class UserInfoDto extends createZodDto(userInfoSchema.partial()) {
  @ApiProperty({
    description: "사용자 번호",
    example: 1,
    required: false,
  })
  declare userNo?: number;

  @ApiProperty({
    description: "사용자 이메일 주소 (올바른 이메일 형식)",
    example: "user@example.com",
  })
  declare emlAddr: string;

  // ... 100줄 이상의 반복적인 @ApiProperty 데코레이터
}
```

**AFTER (34줄):**

```typescript
import { Exclude } from "class-transformer";
import { createZodDto } from "nestjs-zod";

import {
  updateUserSchema,
  userInfoSchema,
  deleteMultipleUsersSchema,
  searchUserSchema,
} from "@/endpoints/prisma/schemas/user.schema";

// 사용자 조회 DTO
export class UserInfoDto extends createZodDto(userInfoSchema.partial()) {
  @Exclude({ toPlainOnly: true })
  declare encptPswd: string;

  @Exclude({ toPlainOnly: true })
  declare reshToken?: string | null;
}

// 사용자 업데이트 DTO
export class UpdateUserDto extends createZodDto(updateUserSchema) {
  @Exclude({ toPlainOnly: true })
  declare encptPswd?: string;

  @Exclude({ toPlainOnly: true })
  declare reshToken?: string | null;
}

// 사용자 검색 DTO
export class SearchUserDto extends createZodDto(searchUserSchema) {}

// 다수 사용자 삭제 DTO
export class DeleteMultipleUsersDto extends createZodDto(
  deleteMultipleUsersSchema
) {}
```

**핵심 포인트:**

- `@ApiProperty` 데코레이터 완전 제거
- Schema에서 정의한 메타데이터가 자동으로 Swagger에 반영됨
- `@Exclude` 데코레이터만 DTO에서 관리 (응답 시 민감 정보 제외)

## 4단계: Repository 타입 정의

### user.types.ts 생성

```typescript
import type { UserInfo } from "@prisma/client";

// 단일 사용자 조회
export type SelectUserInfoType = UserInfo;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectUserInfoListItemType = UserInfo & {
  totalCnt: number;
  rowNo: number;
};

// 다중 작업 결과
export type MultipleResultType = {
  successCnt: number;
  failCnt: number;
  failNoList: number[];
};
```

### user.repository.ts 타입 적용

```typescript
import { Inject, Injectable } from "@nestjs/common";

import { CreateAdminDto } from "@/dto/admin.dto";
import { CreateUserDto } from "@/dto/auth.dto";
import { UpdateUserDto, type SearchUserDto } from "@/dto/user.dto";
import type { ListType } from "@/endpoints/prisma/schemas/response.schema";
import { PRISMA } from "@/endpoints/prisma/prisma.module";
import type {
  MultipleResultType,
  SelectUserInfoListItemType,
  SelectUserInfoType,
} from "@/endpoints/prisma/types/user.types";
import { pageHelper } from "@/utils/pageHelper";
import { timeToString } from "@/utils/timeHelper";
import { PrismaClient, type UserRole } from "@prisma/client";

@Injectable()
export class UserRepository {
  // 단일 조회
  async getUserByNo(
    userNo: number,
    delYn: "Y" | "N" = "N"
  ): Promise<SelectUserInfoType | null> {
    // ...
  }

  // 목록 조회
  async getUserList(
    searchData: SearchUserDto
  ): Promise<ListType<SelectUserInfoListItemType>> {
    // ...
  }

  // 다중 작업
  async adminMultipleUpdateUser(
    userNo: number,
    updateUserDto: UpdateUserDto
  ): Promise<MultipleResultType | null> {
    // ...
  }
}
```

**타입 적용 규칙:**

- **매개변수**: DTO 타입 유지 (검증용)
- **반환 타입**: Prisma 타입 사용 (`user.types.ts`)

## 5단계: 다른 엔티티 적용 순서

User 작업을 완료했으므로, 다음 순서로 진행:

1. **Subscribe (구독)**

   - `subscribe.schema.ts`
   - `subscribe.dto.ts`
   - `subscribe.types.ts`
   - `subscribe.repository.ts`

2. **Category (카테고리)**

   - `category.schema.ts`
   - `category.dto.ts`
   - `category.types.ts`
   - `category.repository.ts`

3. **Tag (태그)**

   - `tag.schema.ts`
   - `tag.dto.ts`
   - `tag.types.ts`
   - `tag.repository.ts`

4. **Post (포스트)**
   - `post.schema.ts`
   - `post.dto.ts`
   - `post.types.ts`
   - `post.repository.ts`

## 체크리스트

### Subscribe (구독) ✅ 완료

#### Schema 파일 (subscribe.schema.ts)

- [x] `extendZodWithOpenApi(z)` 추가
- [x] 모든 필드에 `.openapi({ description, example })` 추가
- [x] 불필요한 필드 제거 (sbcrCtgryList, sbcrTagList → user 중첩 구조로 변경)
- [x] 공통 스키마(`commonSchema`) 활용

#### DTO 파일 (subscribe.dto.ts)

- [x] `@ApiProperty` 데코레이터 제거
- [x] `createZodDto(schema)` 사용
- [x] 코드 라인 수 대폭 감소 (210줄 → 20줄, 90% 감소)

#### Types 파일 (subscribe.types.ts)

- [x] `SelectUserSbcrInfoType` 정의 (단일, user 정보 포함)
- [x] `SelectUserSbcrInfoListItemType` 정의 (목록, totalCnt/rowNo 포함)

#### Repository 파일 (subscribe.repository.ts)

- [x] 반환 타입을 `types.ts`의 타입으로 변경
- [x] 매개변수는 DTO 타입 유지

#### Service 파일

- [x] admin-user-subscribe.service.ts 반환 타입을 Prisma Types로 변경
- [x] users.service.ts 반환 타입을 Prisma Types로 변경

### Tag Subscribe (태그 구독) ✅ 완료

#### Schema 파일 (tag-subscribe.schema.ts)

- [x] `extendZodWithOpenApi(z)` 추가
- [x] 모든 필드에 `.openapi({ description, example })` 추가
- [x] 공통 스키마(`commonSchema`) 활용
- [x] `baseSearchSchema` 활용

#### DTO 파일 (tag-subscribe.dto.ts)

- [x] `@ApiProperty` 데코레이터 제거
- [x] `createZodDto(schema)` 사용
- [x] 코드 라인 수 대폭 간소화 (28줄)

#### Types 파일 (tag-subscribe.types.ts)

- [x] `SelectTagSbcrMpngType` 정의 (단일, tag 정보 포함)
- [x] `SelectTagSbcrMpngListItemType` 정의 (목록, totalCnt/rowNo 포함)

#### Repository 파일 (tag-subscribe.repository.ts)

- [x] 반환 타입을 `types.ts`의 타입으로 변경
- [x] 매개변수는 DTO 타입 유지

#### Service 파일

- [x] admin-tag-subscribe.service.ts 반환 타입을 Prisma Types로 변경
- [x] tag-subscribe.service.ts 반환 타입을 Prisma Types로 변경

### Category Subscribe (카테고리 구독) ✅ 완료

#### Schema 파일 (category-subscribe.schema.ts)

- [x] `extendZodWithOpenApi(z)` 추가
- [x] 모든 필드에 `.openapi({ description, example })` 추가
- [x] 공통 스키마(`commonSchema`) 활용
- [x] `baseSearchSchema` 활용
- [x] Multiple\* 스키마 통합 (Create/Update/Delete 스키마로 통합)

#### DTO 파일 (category-subscribe.dto.ts)

- [x] `@ApiProperty` 데코레이터 제거
- [x] `createZodDto(schema)` 사용
- [x] 코드 라인 수 대폭 간소화 (305줄 → 28줄, 91% 감소)

#### Types 파일 (category-subscribe.types.ts)

- [x] `SelectCtgrySbcrMpngType` 정의 (단일, category 정보 포함)
- [x] `SelectCtgrySbcrMpngListItemType` 정의 (목록, totalCnt/rowNo 포함)

#### Repository 파일 (category-subscribe.repository.ts)

- [x] 반환 타입을 `types.ts`의 타입으로 변경
- [x] 매개변수는 DTO 타입 유지
- [x] 불필요한 수동 변환 로직 제거
- [x] Prisma 스키마에 맞게 sbcrNo 기반으로 수정

#### Service 파일

- [x] admin-category-subscribe.service.ts 반환 타입을 Prisma Types로 변경
- [x] category-subscribe.service.ts 반환 타입을 Prisma Types로 변경

### Category (카테고리) ⏳ 대기중

#### Schema 파일 (category.schema.ts)

- [ ] `extendZodWithOpenApi(z)` 추가
- [ ] 모든 필드에 `.openapi({ description, example })` 추가
- [ ] 불필요한 필드 제거
- [ ] 공통 스키마(`commonSchema`) 활용

#### DTO 파일 (category.dto.ts)

- [ ] `@ApiProperty` 데코레이터 제거
- [ ] `createZodDto(schema)` 사용
- [ ] 민감 정보만 `@Exclude` 데코레이터 유지
- [ ] 코드 라인 수 대폭 감소 확인

#### Types 파일 (category.types.ts)

- [ ] `Select{Entity}Type` 정의 (단일)
- [ ] `Select{Entity}ListItemType` 정의 (목록)

#### Repository 파일 (category.repository.ts)

- [ ] 반환 타입을 `types.ts`의 타입으로 변경
- [ ] 매개변수는 DTO 타입 유지

#### Service 파일

- [ ] 반환 타입을 Prisma Types로 변경

### Tag (태그) ⏳ 대기중

#### Schema 파일 (tag.schema.ts)

- [ ] `extendZodWithOpenApi(z)` 추가
- [ ] 모든 필드에 `.openapi({ description, example })` 추가
- [ ] 불필요한 필드 제거
- [ ] 공통 스키마(`commonSchema`) 활용

#### DTO 파일 (tag.dto.ts)

- [ ] `@ApiProperty` 데코레이터 제거
- [ ] `createZodDto(schema)` 사용
- [ ] 민감 정보만 `@Exclude` 데코레이터 유지
- [ ] 코드 라인 수 대폭 감소 확인

#### Types 파일 (tag.types.ts)

- [ ] `Select{Entity}Type` 정의 (단일)
- [ ] `Select{Entity}ListItemType` 정의 (목록)

#### Repository 파일 (tag.repository.ts)

- [ ] 반환 타입을 `types.ts`의 타입으로 변경
- [ ] 매개변수는 DTO 타입 유지

#### Service 파일

- [ ] 반환 타입을 Prisma Types로 변경

### Post (포스트) ⏳ 대기중

#### Schema 파일

- [ ] `extendZodWithOpenApi(z)` 추가
- [ ] 모든 필드에 `.openapi({ description, example })` 추가
- [ ] 불필요한 필드 제거
- [ ] 공통 스키마(`commonSchema`) 활용

#### DTO 파일

- [ ] `@ApiProperty` 데코레이터 제거
- [ ] `createZodDto(schema)` 사용
- [ ] 민감 정보만 `@Exclude` 데코레이터 유지
- [ ] 코드 라인 수 대폭 감소 확인

#### Types 파일

- [ ] `Select{Entity}Type` 정의 (단일)
- [ ] `Select{Entity}ListItemType` 정의 (목록)

#### Repository 파일

- [ ] 반환 타입을 `types.ts`의 타입으로 변경
- [ ] 매개변수는 DTO 타입 유지
- [ ] `PostStatus` enum import 추가

#### Service 파일

- [ ] 반환 타입을 Prisma Types로 변경

## 주의사항

1. **extendZodWithOpenApi는 한 번만 호출**

   - `common.schema.ts`에서 한 번 호출하면 됨
   - 다른 schema 파일에서는 중복 호출 불필요

2. **민감 정보 제외**

   - 비밀번호(`encptPswd`), 토큰(`reshToken`) 등은 반드시 `@Exclude` 유지

3. **타입 일관성**

   - Repository 반환: Prisma Types
   - Service 매개변수/반환: 비즈니스 로직에 따라 선택
   - Controller 매개변수: DTO

4. **검증 로직**
   - 복잡한 검증(비밀번호 일치 등)은 클라이언트 담당
   - 서버는 기본 검증만 (형식, 길이 등)

## 예상 효과

- **코드 라인 수 감소**: 평균 80-90% 감소
- **유지보수성 향상**: Schema 한 곳만 수정하면 DTO와 Swagger 문서 자동 반영
- **타입 안정성**: Prisma Types 활용으로 DB와 타입 일치 보장
- **중복 제거**: DRY 원칙 준수

## 참고 자료

- [@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)
- [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod)
- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)
