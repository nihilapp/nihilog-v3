# 📋 MESSAGE_CODE 마이그레이션 계획

## 📊 현재 상황 분석

### 기존 구조

`src/code/message.code.ts` (평면 구조)

```typescript
MESSAGE_CODE.SUCCESS;
MESSAGE_CODE.USER_CREATE_SUCCESS;
MESSAGE_CODE.DB_CONNECTED;
```

### 신규 구조

`src/code/messages/index.ts` (혼합 구조)

```typescript
// 평면 구조 (AUTH, DB)
MESSAGE_CODE.AUTH.SIGN_IN_SUCCESS;
MESSAGE_CODE.DB.DB_CONNECTED;

// 중첩 구조 (USER)
MESSAGE_CODE.USER.USER.CREATE_SUCCESS;
MESSAGE_CODE.USER.PROFILE.GET_SUCCESS;

// 공통 구조
MESSAGE_CODE.COMMON.SUCCESS;
```

**구조별 특징**:

- **AUTH**: 평면 구조 (`AUTH.SIGN_IN_SUCCESS`)
- **USER**: 중첩 구조 (`USER.USER.CREATE_SUCCESS`, `USER.PROFILE.GET_SUCCESS`)
- **COMMON**: 평면 구조 (`COMMON.SUCCESS`)
- **기타**: 각 엔티티별로 구조 결정

### 영향받는 파일들

1. `utils/createResponse.ts` - 타입으로 사용 (`keyof typeof MESSAGE_CODE`)
2. `utils/createError.ts` - 타입으로 사용 (`keyof typeof MESSAGE_CODE`)
3. `endpoints/prisma/prisma.service.ts` - 직접 접근 (`MESSAGE_CODE.DB_CONNECTED`)
4. `interceptors/unified-response.interceptor.ts` - 직접 접근 (`MESSAGE_CODE.SUCCESS`)

---

## 🎯 마이그레이션 전략

### 전략 A: 점진적 마이그레이션 (권장)

기존 코드를 깨뜨리지 않으면서 점진적으로 전환

**장점**:

- 기존 코드 호환성 유지
- 단계별 마이그레이션 가능
- 롤백 용이

**단계**:

1. ✅ 모든 메시지를 엔티티별 파일로 분리
2. 📝 기존 `message.code.ts`를 새 구조로 re-export하여 평면화
3. 🔄 사용처를 점진적으로 새 구조로 변경
4. 🗑️ 기존 파일 제거

### 전략 B: 일괄 마이그레이션

모든 파일을 한 번에 변경

**장점**:

- 빠른 전환
- 일관된 코드베이스

**단점**:

- 한 번에 많은 파일 수정
- 타입 시스템 대대적 변경 필요

---

## 📝 상세 실행 계획 (전략 A 기준)

### Phase 1: 메시지 파일 분리 ✅ (일부 완료)

필요한 파일들:

- [x] `common-message.code.ts`
- [x] `auth-message.code.ts` ✅ (평면 구조로 구현됨)
- [x] `user-message.code.ts` ✅ (중첩 구조로 구현됨)
- [ ] `profile-message.code.ts`
- [ ] `admin-message.code.ts`
- [ ] `category-message.code.ts`
- [x] `tag-message.code.ts` ✅
- [x] `subscribe-message.code.ts` ✅
- [x] `post-message.code.ts` ✅
- [x] `comment-message.code.ts` ✅
- [x] `db-message.code.ts` ✅

### Phase 2: 호환성 레이어 구축

`message.code.ts`를 다음과 같이 변경:

```typescript
// @deprecated - 새로운 MESSAGE_CODE from '@/code/messages' 사용을 권장합니다
import { MESSAGE_CODE as NEW_MESSAGE_CODE } from "@/code/messages";

// 평면 구조로 재구성
export const MESSAGE_CODE = {
  // COMMON
  SUCCESS: NEW_MESSAGE_CODE.COMMON.SUCCESS,
  ERROR: NEW_MESSAGE_CODE.COMMON.ERROR,
  // ... 모든 메시지를 평면화

  // AUTH
  SIGN_IN_SUCCESS: NEW_MESSAGE_CODE.AUTH.SIGN_IN_SUCCESS,
  // ...

  // DB
  DB_CONNECTED: NEW_MESSAGE_CODE.DB.DB_CONNECTED,
  // ...
} as const;
```

### Phase 3: 타입 유틸리티 추가

새로운 타입 시스템 구축:

```typescript
// messages/types.ts
export type MessagePath =
  | `COMMON.${keyof typeof COMMON_MESSAGES}`
  | `AUTH.${keyof typeof AUTH_MESSAGES}`
  | `USER.${keyof typeof USER_MESSAGES}`;
// ...

export type GetMessage<T extends MessagePath> =
  T extends `${infer Category}.${infer Key}`
    ? Category extends keyof MessageCode
      ? Key extends keyof MessageCode[Category]
        ? MessageCode[Category][Key]
        : never
      : never
    : never;
```

### Phase 4: 사용처 점진적 변경

#### 1. prisma.service.ts

```typescript
// Before
MESSAGE_CODE.DB_CONNECTED;

// After
MESSAGE_CODE.DB.DB_CONNECTED;
```

#### 2. unified-response.interceptor.ts

```typescript
// Before
MESSAGE_CODE.SUCCESS;

// After
MESSAGE_CODE.COMMON.SUCCESS;
```

#### 3. auth 관련 사용처 ✅ (완료)

```typescript
// Before
MESSAGE_CODE.SIGN_IN_SUCCESS;

// After
MESSAGE_CODE.AUTH.SIGN_IN_SUCCESS;
```

**완료된 파일들**:

- `auth.service.ts` ✅
- `auth.controller.ts` ✅
- `jwt-auth.guard.ts` ✅
- `role-auth.guard.ts` ✅
- `admin-auth.guard.ts` ✅

#### 4. createResponse/createError - 두 가지 옵션

**옵션 A**: 헬퍼 함수 수정 (타입 복잡도 증가)

```typescript
type MessagePath =
  | `COMMON.${keyof typeof COMMON_MESSAGES}`
  | `AUTH.USER.${keyof typeof AUTH_MESSAGES.USER}`;
// ...

function createResponse<TData = any>(
  code: keyof typeof RESPONSE_CODE,
  messagePath: MessagePath,
  data: TData
);
```

**옵션 B**: 직접 메시지 문자열 전달 (단순함)

```typescript
function createResponse<TData = any>(
  code: keyof typeof RESPONSE_CODE,
  message: string,
  data: TData
);
```

### Phase 5: 레거시 제거

1. 기존 `message.code.ts` deprecated 경고 추가
2. 모든 사용처가 새 구조로 변경되었는지 확인
3. 기존 파일 삭제

---

## 🔍 필요한 작업 목록

### 즉시 작업

- [x] 나머지 메시지 파일들 생성 (auth, user, profile, admin, category, tag, subscribe, post, comment, db) ✅
- [x] `messages/index.ts` 완성 및 검증 ✅

### 타입 시스템 결정

- [ ] `createResponse`/`createError`의 타입 전략 결정 (옵션 A vs B)
- [ ] 타입 유틸리티 구현

### 코드 변경

- [ ] `prisma.service.ts` 변경
- [ ] `unified-response.interceptor.ts` 변경
- [x] auth 관련 서비스/컨트롤러 파일 마이그레이션 ✅ (완료)
- [ ] 기타 서비스/컨트롤러 파일 검색 및 변경

### 테스트 및 정리

- [ ] 빌드 검증
- [ ] 타입 오류 확인
- [ ] 기존 파일 제거

---

## 💡 권장사항

**추천**: **전략 A + 옵션 B**

- 점진적 마이그레이션으로 안정성 확보
- `createResponse`/`createError`는 직접 문자열을 받도록 단순화
- 복잡한 타입 시스템보다는 런타임 안정성 우선

---

## 다음 단계

1. ✅ 나머지 메시지 파일들 생성 (완료)
2. ✅ auth 관련 서비스/컨트롤러 마이그레이션 (완료)
3. 호환성 레이어 구축
4. 타입 전략 결정 및 구현
5. 기타 사용처를 새 구조로 마이그레이션
