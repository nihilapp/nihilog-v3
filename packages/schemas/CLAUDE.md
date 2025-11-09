# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**CRITICAL** - Respond in Korean.

## Package Overview

`@nihilog/schemas`는 nihilog 모노레포에서 사용되는 **공유 Zod 스키마 및 TypeScript 타입 패키지**입니다. API와 UI 간에 일관된 데이터 검증 및 타입 안정성을 제공하며, Swagger/OpenAPI 문서 자동 생성을 지원합니다.

## Development Commands

```bash
# Build package (ESM + CJS)
pnpm build

# Watch mode (rebuild on changes)
pnpm dev
```

## Architecture

### Package Structure

```
src/
├── index.ts                # Main export file
├── schema/                 # Zod validation schemas
│   ├── index.ts            # Schema exports
│   ├── common.schema.ts    # Common schemas (useYn, delYn, etc.)
│   ├── enums.schema.ts     # Enum schemas (UserRole, PostStatus, YN)
│   ├── search.schema.ts    # Base search schema
│   ├── user.schema.ts      # User-related schemas
│   ├── post.schema.ts      # Post-related schemas
│   ├── category.schema.ts  # Category schemas
│   ├── tag.schema.ts       # Tag schemas
│   ├── comment.schema.ts   # Comment schemas
│   ├── subscribe.schema.ts # User subscription schemas
│   ├── category-subscribe.schema.ts
│   └── tag-subscribe.schema.ts
└── types/                  # TypeScript type definitions
    ├── index.ts            # Type exports
    ├── common.types.ts     # Common types (Response, List, Error)
    ├── response.types.ts   # Response utility types
    ├── user.types.ts       # User Select/Analyze types
    ├── post.types.ts       # Post Select/Analyze types
    ├── category.types.ts   # Category Select/Analyze types
    ├── tag.types.ts        # Tag Select/Analyze types
    ├── comment.types.ts    # Comment Select/Analyze types
    ├── subscribe.types.ts  # Subscribe Select/Analyze types
    ├── category-subscribe.types.ts
    └── tag-subscribe.types.ts
```

### Dependencies

- **@nihilog/db**: Prisma 클라이언트 및 타입 참조
- **@nihilog/code**: 응답 코드 및 메시지 참조
- **zod**: Runtime validation 및 타입 추론
- **@asteasolutions/zod-to-openapi**: Swagger/OpenAPI 문서 생성

## Key Concepts

### 1. Schema vs Types

- **Schema (`schema/`)**: Zod 스키마 정의
  - Runtime validation
  - Input/Output DTO
  - API 요청/응답 검증
  - 타입 추론 (`z.infer<typeof schema>`)

- **Types (`types/`)**: TypeScript 타입 정의
  - 데이터베이스 Select 타입
  - 분석/통계 타입
  - Repository 반환 타입
  - 컴파일 타임 타입 체크

### 2. Schema Patterns

각 도메인은 일관된 CRUD 스키마 패턴을 따릅니다:

```typescript
// 예: user.schema.ts
export const userInfoSchema = commonSchema.extend({...});
export const createUserSchema = z.object({...});
export const updateUserSchema = z.object({...});
export const deleteUserSchema = z.object({...});
export const searchUserSchema = baseSearchSchema.extend({...});

// 타입 추출
export type UserInfoType = z.infer<typeof userInfoSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
// ...
```

### 3. Common Schema

모든 엔티티가 공유하는 공통 필드:

```typescript
commonSchema = {
  useYn: 'Y' | 'N',      // 사용 여부 (default: 'Y')
  delYn: 'Y' | 'N',      // 삭제 여부 (default: 'N')
  crtNo: number,         // 생성자 번호
  udtNo: number,         // 수정자 번호
  crtDttm: string,       // 생성 일시 (YYYY-MM-DD HH:MM:SS)
  udtDttm: string,       // 수정 일시
}
```

### 4. OpenAPI Integration

모든 스키마는 `.openapi()` 메서드로 Swagger 문서 정보 포함:

```typescript
export const passwordSchema = z.string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(30, '비밀번호는 30자 이하여야 합니다.')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, '...')
  .openapi({
    description: '비밀번호 (10-30자, 영문 대소문자/숫자/특수문자 포함)',
    example: 'Password123!',
  });
```

## Usage

### In API (NestJS)

```typescript
import { createUserSchema, type CreateUserType } from '@nihilog/schemas';

// DTO 검증
@Body() createUserDto: CreateUserType

// Controller에서 Zod 검증 (nestjs-zod)
@UsePipes(ZodValidationPipe)
async createUser(@Body() body: CreateUserType) {
  const validated = createUserSchema.parse(body);
  return this.userService.create(validated);
}

// Repository 반환 타입
import { type SelectUserInfoType } from '@nihilog/schemas';

async findById(userNo: number): Promise<SelectUserInfoType | null> {
  // ...
}
```

### In UI (Next.js)

```typescript
import { signInSchema, type SignInType } from '@nihilog/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

// React Hook Form 검증
const form = useForm<SignInType>({
  resolver: zodResolver(signInSchema),
  defaultValues: {
    userEmail: '',
    userPwd: '',
  },
});

// API 응답 타입
import { type ResponseType, type SelectUserInfoType } from '@nihilog/schemas';

const response: ResponseType<SelectUserInfoType> = await fetch(...);
```

## Schema Categories

### User Schemas
- `userInfoSchema`: 사용자 정보 전체
- `createUserSchema`: 사용자 생성
- `signInSchema`: 로그인
- `changePasswordSchema`: 비밀번호 변경
- `searchUserSchema`: 사용자 검색

### Post Schemas
- `postSchema`: 게시글 정보
- `createPostSchema`: 게시글 생성
- `updatePostSchema`: 게시글 수정
- `postBookmarkSchema`: 북마크 관련
- `postViewLogSchema`: 조회 로그
- `postShareLogSchema`: 공유 로그

### Category/Tag Schemas
- CRUD 패턴 (create, update, delete, search)
- Subscribe schemas (구독 관련)

### Common Schemas
- `commonSchema`: 공통 필드 (useYn, delYn, etc.)
- `baseSearchSchema`: 검색 기본 스키마 (page, limit, order)
- `ynEnumSchema`: Y/N enum 검증

### Enum Schemas
- `userRoleSchema`: 'USER' | 'ADMIN'
- `postStatusSchema`: 'DRAFT' | 'PUBLISHED' | 'PRIVATE'
- `ynSchema`: 'Y' | 'N'

## Type Categories

### Common Types
- `ResponseType<T>`: API 성공 응답
- `ErrorType`: API 에러 응답
- `ListType<T>`: 페이징된 리스트 응답
- `MultipleResultType`: 다중 작업 결과

### Select Types
각 도메인별 데이터베이스 Select 결과 타입:
- `SelectUserInfoType`: 사용자 정보
- `SelectPostType`: 게시글 정보
- `SelectCategoryType`: 카테고리 정보
- `SelectTagInfoType`: 태그 정보
- `SelectCommentType`: 댓글 정보

### Analyze/Stat Types
각 도메인별 분석/통계 타입:
- `AnalyzeUserStatItemType`: 사용자 통계
- `AnalyzePostItemType`: 게시글 분석
- `TopPopularPostItemType`: 인기 게시글
- `ViewStatItemType`: 조회수 통계
- 등등...

## Development Guidelines

### Adding New Schema

1. **새로운 도메인 스키마 생성**:

```typescript
// src/schema/new-domain.schema.ts
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonSchema } from './common.schema';
import { baseSearchSchema } from './search.schema';

extendZodWithOpenApi(z);

// 정보 스키마
export const newDomainInfoSchema = commonSchema.extend({
  newDomainNo: z.coerce.number().int().openapi({
    description: '도메인 번호',
    example: 1,
  }),
  name: z.string().min(1).max(100).openapi({
    description: '이름',
    example: 'Example Name',
  }),
});

// CRUD 스키마
export const createNewDomainSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
});

export const updateNewDomainSchema = createNewDomainSchema.partial();

export const deleteNewDomainSchema = z.object({
  newDomainNo: z.coerce.number().int(),
});

export const searchNewDomainSchema = baseSearchSchema.extend({
  name: z.string().optional(),
});

// 타입 추출
export type NewDomainInfoType = z.infer<typeof newDomainInfoSchema>;
export type CreateNewDomainType = z.infer<typeof createNewDomainSchema>;
export type UpdateNewDomainType = z.infer<typeof updateNewDomainSchema>;
export type DeleteNewDomainType = z.infer<typeof deleteNewDomainSchema>;
export type SearchNewDomainType = z.infer<typeof searchNewDomainSchema>;
```

2. **src/schema/index.ts에 export 추가**:

```typescript
export {
  newDomainInfoSchema,
  createNewDomainSchema,
  updateNewDomainSchema,
  deleteNewDomainSchema,
  searchNewDomainSchema,
  type NewDomainInfoType,
  type CreateNewDomainType,
  type UpdateNewDomainType,
  type DeleteNewDomainType,
  type SearchNewDomainType,
} from './new-domain.schema';
```

3. **타입 정의 파일 생성** (필요한 경우):

```typescript
// src/types/new-domain.types.ts
export type SelectNewDomainType = {
  newDomainNo: number;
  name: string;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtDttm: string;
  // ...
};

export type SelectNewDomainListItemType = SelectNewDomainType & {
  // 추가 필드
};
```

4. **src/types/index.ts에 export 추가**:

```typescript
export type {
  SelectNewDomainType,
  SelectNewDomainListItemType,
} from './new-domain.types';
```

5. **빌드**:

```bash
pnpm build  # 또는 root에서 pnpm schemas:build
```

### Code Conventions

- **Schema 파일명**: `{domain}.schema.ts` (kebab-case)
- **Type 파일명**: `{domain}.types.ts` (kebab-case)
- **Schema 네이밍**: camelCase + `Schema` suffix
- **Type 네이밍**: PascalCase + `Type` suffix
- **OpenAPI 메타데이터**: 모든 필드에 `description`과 `example` 포함
- **에러 메시지**: 사용자 친화적인 한국어 메시지
- **Common Schema 활용**: 공통 필드는 `commonSchema.extend()` 사용
- **Validation**: 적절한 min/max/regex 검증 추가
- **z.coerce**: 숫자 타입은 `z.coerce.number()` 사용 (문자열 → 숫자 자동 변환)

### Schema Validation Best Practices

1. **명확한 에러 메시지**: 사용자가 이해하기 쉬운 한국어 메시지
2. **적절한 제약조건**: min, max, regex 등으로 데이터 품질 보장
3. **선택적 필드**: `.optional()` 또는 `.nullable()` 명시
4. **기본값**: `.default()` 설정으로 안정성 향상
5. **타입 강제**: z.coerce 활용으로 타입 변환 처리
6. **OpenAPI 문서화**: 모든 스키마에 충분한 설명 추가

## Build Configuration

- **Build Tool**: tsup
- **Output Formats**: ESM (`.mjs`) + CJS (`.js`)
- **Type Declarations**: `.d.ts` 파일 자동 생성
- **Source Maps**: 디버깅을 위해 포함됨
- **Clean Build**: 매 빌드마다 dist 폴더 클린
- **Path Aliases**: `@nihilog/code`, `@nihilog/db` 로컬 참조

## Important Notes

- **Build Required**: 스키마 수정 후 반드시 빌드 필요
- **Type Safety**: Zod의 `z.infer`로 스키마에서 타입 자동 추출
- **Runtime + Compile**: Runtime validation과 TypeScript 타입 체크 모두 지원
- **Dual Package**: ESM과 CJS 모두 지원
- **Shared Usage**: API와 UI 모두에서 import 가능
- **OpenAPI Auto-gen**: 스키마 변경 시 Swagger 문서 자동 업데이트
- **Dependency Chain**: `@nihilog/db` → `@nihilog/code` → `@nihilog/schemas`
- **Circular Dependency 주의**: db, code 패키지와의 순환 참조 방지

## Testing Schemas

```typescript
import { createUserSchema } from '@nihilog/schemas';

// 유효한 데이터
const validData = {
  userEmail: 'test@example.com',
  userPwd: 'Password123!',
  userName: 'John Doe',
};

const result = createUserSchema.safeParse(validData);
if (result.success) {
  console.log('Valid:', result.data);
} else {
  console.error('Errors:', result.error.issues);
}
```

## Reference

- Zod Documentation: https://zod.dev
- Zod to OpenAPI: https://github.com/asteasolutions/zod-to-openapi
