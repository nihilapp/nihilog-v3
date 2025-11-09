# UI 앱 마이그레이션 분석: @/\_schemas, @/\_types → @nihilog/schemas

## 📋 현재 상황

### API 앱

- ✅ 이미 `@nihilog/schemas`와 `@nihilog/code` 사용 중
- ✅ OpenAPI 스키마 확장 포함
- ✅ Prisma 타입 기반 타입 정의

### UI 앱

- ❌ `@/_schemas` (로컬 스키마) 사용 중
- ❌ `@/_types` (로컬 타입) 사용 중
- ⚠️ `@nihilog/schemas`는 package.json에 의존성으로만 존재 (실제 사용 안 함)

## 🎯 교체 범위

**자원(Resource) 관련 타입/스키마만 교체 대상**

- ✅ 요청/응답 스키마 (Zod 스키마)
- ✅ 데이터 모델 타입 (Select 타입, Table 타입)
- ✅ API 응답 타입 (ResponseType, ListType 등)

**UI 전용 타입은 교체 대상 아님** (당연히 UI에서만 사용)

- ❌ `ReactElementProps`: React 컴포넌트 props
- ❌ `Menu`: UI 메뉴 구조
- ❌ `SiteMetadata`, `OpenGraphType`: SEO 메타데이터
- ❌ `OptionType`: React Query 옵션
- ❌ `ColumnType`: 테이블 컬럼 타입

## 🔍 구조 비교

### 1. 스키마 구조

#### `@/_schemas` (UI 로컬)

- 위치: `apps/ui/app/_schemas/`
- 특징:
  - OpenAPI 확장 없음
  - 순수 Zod 스키마만 정의
  - UI 전용 스키마 (예: `responseSchema`, `listResponseSchema`)

#### `@nihilog/schemas` (공유 패키지)

- 위치: `packages/schemas/src/schema/`
- 특징:
  - OpenAPI 확장 포함 (`extendZodWithOpenApi`)
  - API와 공유되는 스키마
  - 동일한 Zod 스키마 정의

### 2. 타입 구조

#### `@/_types` (UI 로컬)

- 위치: `apps/ui/app/_types/`
- 특징:
  - **React 전용 타입 포함**:
    - `ReactElementProps`: React 컴포넌트 props 타입
    - `Menu`: UI 메뉴 구조 타입
    - `SiteMetadata`: SEO 메타데이터 타입
    - `OpenGraphType`: Open Graph 타입
  - **응답 타입**:
    - `ResponseType`: `error: boolean`, `code: string` (문자열)
    - `ListResponseType`, `ListType`, `OkType`, `ErrorType`
  - **Select 타입**:
    - Prisma 타입 직접 사용 (예: `PstInfoTableType`)
    - UI 전용 확장 타입 (예: `SelectPostType`, `SelectPostListItemType`)

#### `@nihilog/schemas/types` (공유 패키지)

- 위치: `packages/schemas/src/types/`
- 특징:
  - **응답 타입**:
    - `ResponseType`: `error: false`, `code: keyof typeof RESPONSE_CODE` (타입 안전)
    - `ErrorType`: `error: true` (구분된 타입)
    - `ListResponseType`, `ListType`, `RepoResponseType`
  - **Select 타입**:
    - Prisma 타입 직접 사용 (`Prisma.PstInfoGetPayload`)
    - 동일한 구조의 Select 타입 정의

### 3. 주요 차이점

#### ResponseType 차이

```typescript
// @/_types (UI)
export type ResponseType<TData = unknown> = {
  error: boolean; // boolean
  code: string; // string
  message: string;
  data: TData | null;
  responseTime?: string | null;
};

// @nihilog/schemas/types (공유)
export type ResponseType<TData = unknown> = {
  error: false; // 리터럴 타입
  code: keyof typeof RESPONSE_CODE; // 타입 안전
  message: string;
  data: TData; // null 없음
  responseTime: string;
};
```

#### Select 타입 차이

```typescript
// @/_types (UI) - Prisma 타입 직접 사용
export type SelectPostType = PstInfoTableType & {
  category: CtgryInfoTableType | null;
};

// @nihilog/schemas/types (공유) - Prisma GetPayload 사용
export type SelectPostType = Prisma.PstInfoGetPayload<{
  include: {
    category: true;
  };
}>;
```

## 📊 사용 현황

### `@/_schemas` 사용 (111개 파일)

- 주로 **요청 스키마**와 **타입 추출**에 사용
- 예: `signInSchema`, `createUserSchema`, `SearchPostType` 등
- React Hook Form과 함께 사용 (`zodResolver`)

### `@/_types` 사용 (222개 파일)

- **React 컴포넌트 props**: `ReactElementProps` (대부분의 컴포넌트)
- **Select 타입**: `SelectPostType`, `SelectUserInfoType` 등
- **응답 타입**: `ResponseType`, `ListType`, `ErrorType` 등
- **UI 전용 타입**: `Menu`, `ColumnType` 등

## 🎯 교체 전략

### 1단계: 스키마 교체 (`@/_schemas` → `@nihilog/schemas`)

#### ✅ 교체 가능

- 모든 Zod 스키마 (동일한 정의)
- 스키마에서 추출한 타입 (예: `SignInType`, `CreateUserType`)

#### ⚠️ 주의사항

- OpenAPI 확장이 포함되어 있지만, UI에서는 무시됨 (문제 없음)
- `responseSchema`, `listResponseSchema`는 UI 전용이므로 유지 필요

### 2단계: 자원 타입 교체 (`@/_types` → `@nihilog/schemas/types`)

#### ✅ 교체 대상 (자원 관련)

- `ListType`: 동일한 구조
- `MultipleResultType`: 동일한 구조
- `Select*Type`: 구조는 동일하지만 타입 정의 방식이 다름
  - UI: Zod `*TableType` 기반
  - 공유: Prisma 타입 직접 사용
  - **주의**: 타입 호환성 확인 필요 (Zod 타입과 Prisma 타입이 완전히 일치하는지)
- `ResponseType`, `ErrorType`, `ListResponseType`: API 응답 타입
  - 구조 차이 있음 (교체 시 코드 수정 필요)

#### ❌ 교체 대상 아님 (UI 전용 - 당연히 UI에서만 사용)

- `ReactElementProps`: React 컴포넌트 전용
- `Menu`: UI 메뉴 구조
- `SiteMetadata`, `OpenGraphType`: SEO 메타데이터
- `OptionType`: React Query 옵션 타입
- `ColumnType`: 테이블 컬럼 타입

#### ⚠️ 주의 필요

- `ResponseType`: 구조가 다름 (교체 시 코드 수정 필요)
- `ErrorType`: 구조가 다름 (교체 시 코드 수정 필요)
- `ListResponseType`: 구조는 유사하지만 세부 차이 있음

## 🔧 필요한 작업

### 1. 패키지 의존성 확인

- ✅ `@nihilog/schemas` 이미 package.json에 있음
- ⚠️ `@nihilog/code` 필요할 수 있음 (ResponseType에서 사용)

### 2. 타입 호환성 검토

- `ResponseType` 차이로 인한 타입 에러 가능
- API 응답과 UI 타입이 일치하지 않을 수 있음

### 3. 마이그레이션 순서 (자원 관련만)

1. **자원 스키마 교체** (낮은 리스크)

   - `@/_schemas` → `@nihilog/schemas` import 변경
   - 요청 스키마: `createUserSchema`, `signInSchema` 등
   - 테스트: React Hook Form 검증

2. **자원 Select 타입 교체** (중간 리스크)

   - `@/_types`의 Select 타입 → `@nihilog/schemas/types`
   - Zod `*TableType` → Prisma 타입으로 변경
   - 타입 호환성 검증 필요 (Zod 타입과 Prisma 타입이 일치하는지)

3. **응답 타입 교체** (높은 리스크)

   - `ResponseType`, `ErrorType`, `ListResponseType` 교체
   - API 응답 구조와 일치하는지 확인
   - 코드 수정 필요할 수 있음

4. **UI 전용 타입 유지** (교체 대상 아님)
   - `ReactElementProps`, `Menu`, `SiteMetadata` 등은 `@/_types`에 그대로 유지
   - UI에서만 사용하는 타입이므로 교체 불필요

## 📝 권장 사항

### 옵션 1: 점진적 교체 (권장)

1. **자원 스키마 교체**: `@/_schemas` → `@nihilog/schemas`
2. **자원 Select 타입 교체**: `@/_types`의 Select 타입 → `@nihilog/schemas/types`
3. **응답 타입 교체**: API 응답 구조 확인 후 `ResponseType`, `ErrorType` 교체
4. **UI 전용 타입 유지**: `@/_types`에 그대로 유지

### 옵션 2: 하이브리드 유지

- 자원 스키마: `@nihilog/schemas` 사용
- 자원 Select 타입: `@nihilog/schemas/types` 사용
- 응답 타입: API 구조 확인 후 결정
- UI 전용 타입: `@/_types` 유지 (당연히 UI에서만 사용)

## 🚨 주의사항

1. **ResponseType 불일치**

   - API: `error: false`, `code: keyof typeof RESPONSE_CODE`
   - UI: `error: boolean`, `code: string`
   - 실제 API 응답이 어떤 구조인지 확인 필요

2. **Prisma 타입 사용 방식**

   - UI: Zod 스키마에서 추출한 `*TableType` 사용
     ```typescript
     // UI: Zod 스키마에서 pick으로 추출
     export const userInfoTableSchema = userInfoSchema.pick({...});
     export type UserInfoTableType = z.infer<typeof userInfoTableSchema>;
     export type SelectUserInfoType = UserInfoTableType;
     ```
   - 공유: Prisma 타입 직접 사용
     ```typescript
     // 공유: Prisma 타입 직접 사용
     import type { UserInfo } from "@nihilog/db";
     export type SelectUserInfoType = UserInfo;
     ```
   - **호환성 문제**: Zod 타입과 Prisma 타입이 완전히 일치하지 않을 수 있음

3. **테이블 스키마**

   - UI: `*TableSchema` (Zod 스키마에서 `.pick()`으로 추출)
   - 공유: 테이블 스키마 없음 (Prisma 타입 직접 사용)
   - **교체 시**: `*TableType` → Prisma 타입으로 변경 필요

4. **Select 타입 차이**
   - UI: `SelectUserInfoType = UserInfoTableType` (Zod 기반)
   - 공유: `SelectUserInfoType = UserInfo` (Prisma 기반)
   - 구조는 동일하지만 타입 정의 방식이 다름
