# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**CRITICAL** - Respond in Korean.

## Package Overview

`@nihilog/code`는 nihilog 모노레포에서 사용되는 **응답 코드 및 메시지 상수 패키지**입니다. API와 UI 간에 일관된 응답 코드와 메시지를 공유하기 위해 중앙화된 상수를 제공합니다.

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
├── index.ts                    # Main export file
├── response.code.ts            # HTTP response status codes
├── prisma.code.ts              # Prisma error code references
└── messages/                   # Domain-specific messages
    ├── index.ts                # Unified MESSAGE export
    ├── common-message.code.ts  # Common messages
    ├── auth-message.code.ts    # Authentication messages
    ├── user-message.code.ts    # User messages
    ├── post-message.code.ts    # Post messages
    ├── category-message.code.ts
    ├── tag-message.code.ts
    ├── comment-message.code.ts
    ├── subscribe-message.code.ts
    └── db-message.code.ts
```

### Exports

#### 1. Response Codes (`RESPONSE_CODE`)

HTTP 상태 코드와 매핑되는 응답 코드 상수:

```typescript
RESPONSE_CODE.SUCCESS              // 200
RESPONSE_CODE.CREATED              // 201
RESPONSE_CODE.NO_CONTENT           // 204
RESPONSE_CODE.BAD_REQUEST          // 400
RESPONSE_CODE.UNAUTHORIZED         // 401
RESPONSE_CODE.FORBIDDEN            // 403
RESPONSE_CODE.NOT_FOUND            // 404
RESPONSE_CODE.CONFLICT             // 409
RESPONSE_CODE.INTERNAL_SERVER_ERROR // 500
```

#### 2. Prisma Error Codes (`PRISMA_ERROR_CODE`)

Prisma ORM 에러 코드 레퍼런스 (공식 문서 기반):

```typescript
PRISMA_ERROR_CODE.P2002  // Unique constraint failed
PRISMA_ERROR_CODE.P2025  // Record not found
PRISMA_ERROR_CODE.P2003  // Foreign key constraint failed
// ... 등등
```

#### 3. Message Constants (`MESSAGE`)

도메인별로 조직화된 메시지 상수:

```typescript
// 사용 예시
MESSAGE.AUTH.SIGN_IN_SUCCESS           // "로그인되었습니다."
MESSAGE.USER.CREATE_SUCCESS            // 사용자 생성 성공 메시지
MESSAGE.POST.DELETE_SUCCESS            // 포스트 삭제 성공 메시지
MESSAGE.CATEGORY.ADMIN.CREATE_SUCCESS  // 카테고리 생성 성공 메시지
MESSAGE.COMMON.INTERNAL_SERVER_ERROR   // 일반적인 서버 에러 메시지
MESSAGE.DB.UNIQUE_CONSTRAINT_FAILED    // DB 고유 제약조건 실패
```

### Message Organization

메시지는 다음과 같은 계층 구조로 조직됩니다:

- **COMMON**: 공통 메시지 (서버 에러, 유효성 검증 등)
- **AUTH**: 인증 관련 (로그인, 로그아웃, 토큰 등)
- **USER**: 사용자 관리
- **POST**: 게시글 관련
- **CATEGORY**: 카테고리 관리
- **TAG**: 태그 관리
- **COMMENT**: 댓글 관리
- **SUBSCRIBE**: 구독 관련
- **DB**: 데이터베이스 에러 메시지

## Usage

### In API (NestJS)

```typescript
import { RESPONSE_CODE, MESSAGE, PRISMA_ERROR_CODE } from '@nihilog/code';

// 응답 코드 사용
return createResponse(
  RESPONSE_CODE.SUCCESS,
  MESSAGE.AUTH.SIGN_IN_SUCCESS,
  data
);

// Prisma 에러 핸들링
if (error.code === PRISMA_ERROR_CODE.P2002) {
  throw createError(
    RESPONSE_CODE.CONFLICT,
    MESSAGE.DB.UNIQUE_CONSTRAINT_FAILED
  );
}
```

### In UI (Next.js)

```typescript
import { RESPONSE_CODE, MESSAGE } from '@nihilog/code';

// API 응답 처리
if (response.code === RESPONSE_CODE.SUCCESS) {
  toast.success(MESSAGE.AUTH.SIGN_IN_SUCCESS);
}
```

## Development Guidelines

### Adding New Constants

1. **응답 코드 추가** (필요한 경우):
   - `src/response.code.ts`에 새로운 응답 코드 추가
   - HTTP 상태 코드와 매핑되도록 주석 작성

2. **메시지 추가**:
   - 적절한 도메인 파일 선택 (`src/messages/*-message.code.ts`)
   - 없는 경우 새로운 도메인 파일 생성
   - 성공/에러 메시지를 명확하게 구분
   - 한국어로 작성 (사용자 대면 메시지)

3. **새로운 도메인 추가**:
   ```typescript
   // src/messages/new-domain-message.code.ts
   export const NEW_DOMAIN_MESSAGES = {
     CREATE_SUCCESS: '생성되었습니다.',
     CREATE_ERROR: '생성에 실패했습니다.',
     // ...
   } as const;

   // src/messages/index.ts에 추가
   import { NEW_DOMAIN_MESSAGES } from './new-domain-message.code';

   export const MESSAGE = {
     // ...
     NEW_DOMAIN: NEW_DOMAIN_MESSAGES,
   } as const;
   ```

4. **빌드**:
   ```bash
   pnpm build  # 또는 root에서 pnpm code:build
   ```

### Code Conventions

- **상수 네이밍**: UPPER_SNAKE_CASE
- **객체는 `as const`**: 타입 안정성을 위해 모든 상수 객체에 `as const` 사용
- **주석 작성**: 각 코드 파일 상단에 목적 설명
- **메시지 작성**: 사용자 친화적이고 명확한 한국어 메시지
- **분류**: 관련 메시지는 도메인별로 그룹화

### Build Configuration

- **Build Tool**: tsup
- **Output Formats**: ESM (`.mjs`) + CJS (`.js`)
- **Type Declarations**: `.d.ts` 파일 자동 생성
- **Source Maps**: 디버깅을 위해 포함됨
- **Clean Build**: 매 빌드마다 dist 폴더 클린

## Important Notes

- **Zero Dependencies**: 이 패키지는 외부 런타임 의존성이 없습니다
- **Type Safety**: TypeScript strict mode로 타입 안정성 보장
- **Dual Package**: ESM과 CJS 모두 지원하여 호환성 극대화
- **Build Required**: 수정 후 반드시 빌드 필요 (API/UI에서 사용 전)
- **Shared Usage**: API와 UI 모두에서 import 가능
- **Message Updates**: 메시지 변경 시 API와 UI를 모두 확인하여 영향도 파악

## Reference

- Prisma Error Reference: https://www.prisma.io/docs/orm/reference/error-reference
