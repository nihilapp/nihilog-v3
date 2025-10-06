# Endpoint 리팩토링 작업 계획서

## 📋 작업 개요

NestJS Swagger에서 Zod OpenAPI로 마이그레이션 완료 후, `@Endpoint` 데코레이터의 중복 프로퍼티를 제거하여 코드를 정리합니다.

## 🔍 현재 상태

### 문제점: 이중 문서화 시스템

**Zod OpenAPI** (✅ 활성)
- 위치: `src/openapi/endpoints/*.endpoints.ts` (15개)
- 사용: `main.ts:89`에서 Swagger UI에 적용 중

**NestJS Swagger** (❌ 비활성)
- 위치: `@Endpoint` 데코레이터
- 상태: `main.ts:86`에서 주석처리됨
- 문제: 컨트롤러에서 여전히 중복 정보 생성 중

### 코드 중복 현황

```typescript
// 컨트롤러 (18줄) - 중복 정보
@Endpoint({
  endpoint: '/signup',
  method: 'POST',
  summary: '회원가입',                    // 🔴 Zod OpenAPI와 중복
  description: '새로운 사용자...',         // 🔴 중복
  options: {
    throttle: [ 3, 60000 ],              // ✅ 유지 필요
    serialize: true,                      // ✅ 유지 필요
    body: [ '...', CreateUserDto ],      // 🔴 중복
    responses: [ /* ... */ ]              // 🔴 중복
  }
})

// Zod OpenAPI (동일 정보)
openApiRegistry.registerPath({ /* ... */ })
```

**중복률**: 60-70%

## 🎯 작업 내용

### endpoint.decorator.ts 수정

**제거 대상**
- `summary`, `description` (필수 파라미터 → 선택)
- `options.params`, `options.queries`, `options.responses`, `options.body`
- `ApiOperation()`, `ApiParam()`, `ApiQuery()`, `ApiBody()`, `ApiResponse()` 데코레이터

**유지 대상**
- `endpoint`, `method` (필수)
- `options.authGuard`, `options.roles`, `options.throttle`, `options.serialize`
- HTTP 메서드 데코레이터, `UseGuards()`, `Throttle()`, `ClassSerializerInterceptor`

### 컨트롤러 파일 수정

**제거**
- `summary`, `description`
- `options.responses`, `options.body`, `options.params`, `options.queries`
- `import { CreateExample }`

**유지**
- `endpoint`, `method`
- `options.authGuard`, `options.roles`, `options.throttle`, `options.serialize`

## 📊 예상 결과

### Before (18줄) → After (7줄), **61% 감소**

```typescript
// Before
@Endpoint({
  endpoint: '/profile',
  method: 'GET',
  summary: '👤 내 프로필 조회',
  description: '현재 로그인한 사용자의...',
  options: {
    authGuard: 'JWT-auth',
    roles: [ 'USER', 'ADMIN' ],
    responses: [ /* 여러 줄 */ ]
  }
})

// After
@Endpoint({
  endpoint: '/profile',
  method: 'GET',
  options: {
    authGuard: 'JWT-auth',
    roles: [ 'USER', 'ADMIN' ]
  }
})
```

### 정량적 효과

| 지표 | Before | After | 개선 |
|------|--------|-------|------|
| 평균 줄 수/엔드포인트 | 15-20줄 | 4-8줄 | **60-70%↓** |
| 중복 정보 | 양쪽 존재 | 단일 원천 | **100%↓** |
| 전체 코드 | - | - | **약 120줄↓** |

## 🗂️ 작업 순서

### 1단계: 핵심 컨트롤러
1. Auth Controller (6개 엔드포인트)
2. Users Controller
3. Posts Controller
4. Tags Controller

### 2단계: 구독 컨트롤러
5. Tag Subscribe Controller
6. Category Subscribe Controller

### 3단계: Admin 컨트롤러
7. Admin Controller
8. Admin Users Controller
9. Admin Posts Controller
10. Admin Subscribe Controller
11. Admin Tag Subscribe Controller
12. Admin Category Subscribe Controller

## ✅ 검증 항목

### 각 컨트롤러 수정 후 확인

1. **API 기능**: Swagger UI에서 각 엔드포인트 테스트
2. **인증/권한**: 로그인 → 토큰 발급 → 인증 엔드포인트 호출
3. **Swagger 문서**: 예시 데이터, 스키마, 태그 정상 표시
4. **스로틀링**: 제한 초과 시 429 에러 확인

## ⚠️ 주의사항

### 절대 제거 금지
- `options.authGuard` (JWT 인증)
- `options.roles` (권한 제어)
- `options.throttle` (스로틀링)
- `options.serialize` (직렬화)

### 작업 방식
- **단계적 진행**: 한 번에 1개 컨트롤러씩
- **즉시 검증**: 수정 후 바로 테스트
- **작은 커밋**: 롤백 가능하도록

### 검증 필수
```bash
# 개발 서버 실행
pnpm --filter api dev

# Swagger UI 확인
http://localhost:8000/api
```

## 🎉 기대 효과

1. **코드 품질**: 중복 제거, 가독성 향상
2. **유지보수성**: 수정 포인트 2곳 → 1곳
3. **생산성**: 엔드포인트 작성 시간 60% 감소
4. **타입 안정성**: Zod 스키마 완전 통합

---

**작성일**: 2025-10-06
**문서 버전**: 2.0 (요약본)
