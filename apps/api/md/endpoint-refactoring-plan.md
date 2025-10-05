# Endpoint 리팩토링 작업 계획서

## 📋 작업 개요

NestJS Swagger에서 `@asteasolutions/zod-to-openapi`로 마이그레이션한 후, 기존 `@Endpoint` 데코레이터에서 중복된 프로퍼티들을 제거하여 코드를 정리하는 작업입니다.

## 🎯 작업 목표

1. **코드 중복 제거**: API 문서화가 Zod OpenAPI로 이관된 후 불필요한 프로퍼티 제거
2. **데코레이터 간소화**: `@Endpoint` 데코레이터를 핵심 기능만 남기고 정리
3. **유지보수성 향상**: 단일 진실의 원천(Single Source of Truth) 확립
4. **코드 가독성 개선**: 불필요한 중복 코드 제거로 가독성 향상

## 🔍 작업 내용

### 1. 제거 대상 프로퍼티

#### API 문서화 관련

- `summary`: Zod OpenAPI에서 처리
- `description`: Zod OpenAPI에서 처리
- `options.responses`: Zod OpenAPI에서 처리
- `options.body`: Zod OpenAPI에서 처리
- `options.params`: Zod OpenAPI에서 처리 (path parameter 자동 감지)

#### 예시 데이터 관련

- `CreateExample.*` 사용: Zod OpenAPI에서 처리
- 응답 예시 배열: Zod OpenAPI에서 처리

### 2. 유지할 프로퍼티

#### 핵심 라우팅 정보

- `endpoint`: 경로 정보
- `method`: HTTP 메서드

#### 보안/성능 설정

- `options.authGuard`: 인증 가드
- `options.roles`: 권한 설정
- `options.throttle`: 스로틀링 설정
- `options.serialize`: 직렬화 설정

## 📝 작업 절차

### Phase 1: 분석 및 준비

1. **현재 상태 분석**

   - 마이그레이션 완료된 컨트롤러 목록 확인
   - 각 컨트롤러의 `@Endpoint` 데코레이터 분석
   - 중복 프로퍼티 식별 및 분류

2. **리팩토링 대상 식별**
   - 완료된 Zod OpenAPI 엔드포인트 파일과 매핑
   - 제거 가능한 프로퍼티 목록 작성
   - 유지해야 할 프로퍼티 목록 작성

### Phase 2: 데코레이터 정리

1. **@Endpoint 데코레이터 수정**

   - 불필요한 프로퍼티 제거
   - 핵심 기능만 유지
   - 타입 정의 업데이트

2. **컨트롤러 파일 정리**
   - 각 컨트롤러의 `@Endpoint` 데코레이터 간소화
   - 주석 및 문서화 정리
   - Import 문 정리

### Phase 3: 검증 및 테스트

1. **기능 검증**

   - API 엔드포인트 정상 작동 확인
   - 인증/권한 설정 유지 확인
   - 스로틀링 등 성능 설정 확인

2. **문서화 검증**
   - Swagger UI에서 문서 정상 표시 확인
   - 예시 데이터 정상 표시 확인
   - 태그 분류 정상 확인

## 🗂️ 작업 순서 (컨트롤러별)

### 1단계: 핵심 컨트롤러 (우선순위 높음)

- [ ] **Auth Controller** (`auth.controller.ts`)
- [ ] **Users Controller** (`users.controller.ts`)
- [ ] **Posts Controller** (`posts.controller.ts`)
- [ ] **Tags Controller** (`tags.controller.ts`)

### 2단계: 구독 관련 컨트롤러

- [ ] **Tag Subscribe Controller** (`tag-subscribe.controller.ts`)
- [ ] **Category Subscribe Controller** (`category-subscribe.controller.ts`)

### 3단계: Admin 컨트롤러

- [ ] **Admin Controller** (`admin.controller.ts`)
- [ ] **Admin Users Controller** (`admin-users.controller.ts`)
- [ ] **Admin Posts Controller** (`admin-posts.controller.ts`)
- [ ] **Admin Subscribe Controller** (`admin-subscribe.controller.ts`)
- [ ] **Admin Tag Subscribe Controller** (`admin-tag-subscribe.controller.ts`)
- [ ] **Admin Category Subscribe Controller** (`admin-category-subscribe.controller.ts`)

## 📋 작업 체크리스트

### 각 컨트롤러별 작업 항목

#### ✅ **제거할 프로퍼티**

- [ ] `summary` 제거
- [ ] `description` 제거
- [ ] `options.responses` 제거
- [ ] `options.body` 제거 (Zod OpenAPI에서 처리)
- [ ] `options.params` 제거 (path parameter 자동 감지)
- [ ] `CreateExample.*` 사용 제거

#### ✅ **유지할 프로퍼티**

- [ ] `endpoint` 유지
- [ ] `method` 유지
- [ ] `options.authGuard` 유지
- [ ] `options.roles` 유지
- [ ] `options.throttle` 유지
- [ ] `options.serialize` 유지

#### ✅ **검증 항목**

- [ ] API 엔드포인트 정상 작동
- [ ] 인증/권한 설정 유지
- [ ] Swagger UI 문서 정상 표시
- [ ] 예시 데이터 정상 표시

## 🎯 예상 결과

### Before (현재)

```typescript
@Endpoint({
  endpoint: '/profile',
  method: 'GET',
  summary: '👤 내 프로필 조회',
  description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
  options: {
    authGuard: 'JWT-auth',
    roles: [ 'USER', 'ADMIN', ],
    responses: [
      [
        '프로필 조회 성공',
        [ false, 'SUCCESS', 'PROFILE_GET_SUCCESS', CreateExample.user('detail'), ],
      ],
      [
        '사용자를 찾을 수 없음 (Repository)',
        [ true, 'NOT_FOUND', 'USER_NOT_FOUND', null, ],
      ],
    ],
  },
})
```

### After (정리 후)

```typescript
@Endpoint({
  endpoint: '/profile',
  method: 'GET',
  options: {
    authGuard: 'JWT-auth',
    roles: [ 'USER', 'ADMIN', ],
  },
})
```

## 📊 작업 일정

- **1단계 (핵심 컨트롤러)**: 1일
- **2단계 (구독 컨트롤러)**: 1일
- **3단계 (Admin 컨트롤러)**: 2일
- **검증 및 테스트**: 1일

**총 예상 소요 시간**: 5일

## ⚠️ 주의사항

1. **기능 유지**: API 기능은 그대로 유지하면서 문서화만 Zod OpenAPI로 이관
2. **보안 설정**: 인증/권한 관련 설정은 반드시 유지
3. **성능 설정**: 스로틀링 등 성능 관련 설정 유지
4. **단계적 진행**: 한 번에 모든 컨트롤러를 수정하지 말고 단계적으로 진행
5. **검증 필수**: 각 단계마다 기능 정상 작동 확인

## 🎉 기대 효과

1. **코드 간소화**: 불필요한 중복 코드 제거로 가독성 향상
2. **유지보수성**: 단일 진실의 원천으로 유지보수성 향상
3. **일관성**: 모든 API 문서화가 Zod OpenAPI로 통일
4. **성능**: 불필요한 프로퍼티 제거로 약간의 성능 향상
