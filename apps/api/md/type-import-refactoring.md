# 타입 Import 경로 통일 작업

## 작업 일시
2025-10-04

## 작업 이유

### 문제점
현재 프로젝트에서 동일한 타입(`ListType`, `MultipleResultType`)을 **두 가지 경로**에서 제공하고 있어 일관성이 없음:

1. `@/endpoints/prisma/schemas/response.schema.ts` - 대부분의 파일에서 사용
2. `@/endpoints/prisma/types/common.types.ts` - `post.repository.ts`만 사용

### 해결 방안
- **`common.types.ts`로 통일**하여 타입 import 경로 일관성 확보
- 불필요한 `response.schema.ts` 파일 제거
- 타입 정의의 단일 출처(Single Source of Truth) 확립

## 작업 대상

### 수정 대상 파일 (총 11개)

#### 1. 리포지토리 (4개)
- `/src/endpoints/repositories/user.repository.ts`
- `/src/endpoints/repositories/category-subscribe.repository.ts`
- `/src/endpoints/repositories/tag-subscribe.repository.ts`
- `/src/endpoints/repositories/subscribe.repository.ts`

#### 2. 서비스 (6개)
- `/src/endpoints/admin/category-subscribe/admin-category-subscribe.service.ts`
- `/src/endpoints/admin/subscribe/admin-user-subscribe.service.ts`
- `/src/endpoints/admin/users/admin-users.service.ts`
- `/src/endpoints/admin/tag-subscribe/admin-tag-subscribe.service.ts`
- `/src/endpoints/subscribe/tag-subscribe/tag-subscribe.service.ts`
- `/src/endpoints/subscribe/category-subscribe/category-subscribe.service.ts`

#### 3. DTO (1개)
- `/src/dto/response.dto.ts`

#### 4. 삭제 대상 (1개)
- `/src/endpoints/prisma/schemas/response.schema.ts`

## 작업 순서

### 1단계: 파일 목록 파악 ✅
- [x] Grep으로 `response.schema.ts` 사용 파일 검색
- [x] 총 11개 수정 대상 확인

### 2단계: 리포지토리 파일 수정
```typescript
// 변경 전
import type { ListType, MultipleResultType } from '@/endpoints/prisma/schemas/response.schema';

// 변경 후
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
```

**대상**:
- [ ] `user.repository.ts`
- [ ] `category-subscribe.repository.ts`
- [ ] `tag-subscribe.repository.ts`
- [ ] `subscribe.repository.ts`

### 3단계: 서비스 파일 수정
```typescript
// 변경 전
import type { ListType, MultipleResultType } from '@/endpoints/prisma/schemas/response.schema';

// 변경 후
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
```

**대상**:
- [ ] `admin-category-subscribe.service.ts`
- [ ] `admin-user-subscribe.service.ts`
- [ ] `admin-users.service.ts`
- [ ] `admin-tag-subscribe.service.ts`
- [ ] `tag-subscribe.service.ts`
- [ ] `category-subscribe.service.ts`

### 4단계: DTO 파일 수정
- [ ] `response.dto.ts` - schema export 확인 및 타입 import 경로 수정

### 5단계: 삭제 작업
- [ ] `response.schema.ts` 파일 삭제
- [ ] 관련 index.ts에서 export 제거 (있는 경우)

### 6단계: 검증
- [ ] 타입 에러 확인: `pnpm run lint`
- [ ] 빌드 확인: `pnpm run build`
- [ ] 모든 import가 정상 작동하는지 확인

## 작업 후 기대 효과

1. **일관성**: 모든 타입이 단일 경로에서 import
2. **유지보수성**: 타입 정의 수정 시 한 곳만 변경
3. **코드 간결성**: 중복 제거로 코드베이스 정리
4. **명확성**: `types/` 디렉토리가 타입 정의의 명확한 위치

## 참고사항

### common.types.ts 현재 타입 정의
```typescript
export type ListType<TData = unknown> = {
  list: TData[];
  totalCnt: number;
};

export type MultipleResultType = {
  successCnt: number;
  failCnt: number;
  failNoList: number[];
};

export type ResponseType<TData = unknown> = {
  error: false;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: TData;
};

export type ErrorType = {
  error: true;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: null;
};
```

### response.schema.ts 역할
- Zod 스키마 정의 및 validation
- 타입은 `common.types.ts`에서 관리
- 스키마는 필요한 곳에서만 사용
