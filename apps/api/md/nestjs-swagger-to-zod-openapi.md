# NestJS Swagger to Zod OpenAPI 마이그레이션 작업 설명서

이 문서는 NestJS Swagger 데코레이터 기반 API 문서화를 `@asteasolutions/zod-to-openapi`로 마이그레이션하는 작업을 설명합니다.

## 작업 이유

### 기존 문제점

- NestJS Swagger 데코레이터와 Zod 스키마가 중복 정의되어 유지보수성 저하
- `@ApiProperty` 데코레이터와 Zod 스키마 간 불일치 가능성
- 스키마 변경 시 두 곳을 모두 수정해야 하는 번거로움

### 마이그레이션 목표

- **단일 진실의 원천**: Zod 스키마만 사용하여 OpenAPI 문서 생성
- **타입 안전성**: Zod 스키마에서 TypeScript 타입 자동 추론
- **일관성**: 모든 API 문서가 동일한 패턴으로 생성
- **유지보수성**: 스키마 변경 시 한 곳만 수정하면 됨

## 작업 방법

### 1. 기존 구조 분석

```typescript
// 기존: NestJS Swagger 데코레이터
@Endpoint({
  endpoint: '/users/profile',
  method: 'GET',
  responses: [
    ['프로필 조회 성공', [false, 'SUCCESS', 'PROFILE_GET_SUCCESS', CreateExample.user('detail')]],
    ['사용자를 찾을 수 없음', [true, 'NOT_FOUND', 'USER_NOT_FOUND', null]],
  ]
})
```

### 2. 새로운 구조 생성

```typescript
// 새로운: Zod OpenAPI 엔드포인트
openApiRegistry.registerPath({
  method: "get",
  path: "/users/profile",
  summary: "👤 내 프로필 조회",
  responses: {
    200: {
      content: {
        "application/json": {
          examples: {
            success: {
              summary: "프로필 조회 성공",
              value: createResponse(
                "SUCCESS",
                "PROFILE_GET_SUCCESS",
                CreateExample.user("detail")
              ),
            },
            error: {
              summary: "사용자를 찾을 수 없음",
              value: createError("NOT_FOUND", "USER_NOT_FOUND"),
            },
          },
        },
      },
    },
  },
});
```

### 3. 핵심 변환 규칙

- `@Endpoint` 데코레이터 → `openApiRegistry.registerPath()`
- `responses` 배열 → `examples` 객체
- `createResponse/createError` 함수 재사용
- `CreateExample` 유틸리티 재사용

### 4. Request 설정 방법

#### Body 설정

```typescript
// POST/PUT 요청에 body 스키마 추가
openApiRegistry.registerPath({
  method: "post",
  path: "/users",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserSchema, // Zod 스키마 사용
        },
      },
    },
  },
  // ... responses
});
```

#### Path Parameters 설정

```typescript
// 경로 파라미터는 path 문자열에 {paramName} 형태로 정의하고 Zod 스키마로 검증
openApiRegistry.registerPath({
  method: "get",
  path: "/users/{userNo}", // {userNo}가 path parameter
  request: {
    params: z.object({
      userNo: z.coerce.number().int().positive().openapi({
        description: "사용자 번호",
        example: 1,
      }),
    }),
  },
  // ... responses
});
```

#### Query Parameters 설정

```typescript
// Query 파라미터가 필요한 경우
openApiRegistry.registerPath({
  method: "get",
  path: "/users",
  request: {
    query: {
      schema: searchUserSchema, // Zod 스키마로 query 파라미터 정의
    },
  },
  // ... responses
});
```

## 작업 순서

### Phase 1: 기반 설정 (완료)

- [x] `@asteasolutions/zod-to-openapi` 패키지 설치 및 설정
- [x] `openapi/registry.ts` 생성 및 스키마 등록
- [x] `openapi/generator.ts` 생성 및 문서 생성 로직 구현
- [x] `main.ts`에서 Zod OpenAPI 문서 통합

### Phase 2: 핵심 컨트롤러 마이그레이션 (완료)

- [x] **Users Controller** → `users.endpoints.ts`
- [x] **Auth Controller** → `auth.endpoints.ts`
- [x] **Tag Subscribe Controller** → `tag-subscribe.endpoints.ts`
- [x] **Category Subscribe Controller** → `category-subscribe.endpoints.ts`

### Phase 3: 나머지 컨트롤러 마이그레이션 (진행 예정)

- [ ] **Posts Controller** → `posts.endpoints.ts`
- [ ] **Categories Controller** → `categories.endpoints.ts`
- [ ] **Tags Controller** → `tags.endpoints.ts`
- [ ] **Comments Controller** → `comments.endpoints.ts`

### Phase 4: Admin 컨트롤러 마이그레이션 (진행 예정)

- [ ] **Admin Controller** → `admin.endpoints.ts`
- [ ] **Admin Users Controller** → `admin-users.endpoints.ts`
- [ ] **Admin Posts Controller** → `admin-posts.endpoints.ts`
- [ ] **Admin Categories Controller** → `admin-categories.endpoints.ts`
- [ ] **Admin Tags Controller** → `admin-tags.endpoints.ts`
- [ ] **Admin Subscribe Controller** → `admin-subscribe.endpoints.ts`

### Phase 5: 검증 및 정리 (진행 예정)

- [ ] 모든 엔드포인트 문서화 검증
- [ ] Swagger UI에서 예시 선택 기능 확인
- [ ] 기존 NestJS Swagger 데코레이터 제거
- [ ] 코드 정리 및 최적화

## 작업 결과 형식

### 1. 파일 구조

```
src/openapi/
├── endpoints/
│   ├── auth.endpoints.ts          ✅ 완료
│   ├── users.endpoints.ts         ✅ 완료
│   ├── tag-subscribe.endpoints.ts ✅ 완료
│   ├── category-subscribe.endpoints.ts ✅ 완료
│   ├── posts.endpoints.ts         🔄 예정
│   ├── categories.endpoints.ts    🔄 예정
│   ├── tags.endpoints.ts          🔄 예정
│   ├── comments.endpoints.ts       🔄 예정
│   ├── admin.endpoints.ts          🔄 예정
│   ├── admin-users.endpoints.ts   🔄 예정
│   ├── admin-posts.endpoints.ts   🔄 예정
│   ├── admin-categories.endpoints.ts 🔄 예정
│   ├── admin-tags.endpoints.ts    🔄 예정
│   └── admin-subscribe.endpoints.ts 🔄 예정
├── registry.ts                    ✅ 완료
└── generator.ts                   ✅ 완료
```

### 2. 각 엔드포인트 파일 구조

```typescript
import { z } from 'zod';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';
import { openApiRegistry } from '../registry';

export const register[Entity]Endpoints = () => {
  // GET 엔드포인트 (Path Parameter 포함)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users/{userNo}', // Path parameter는 {paramName} 형태
    summary: '📋 사용자 조회',
    description: '특정 사용자 정보를 조회합니다.',
    tags: ['users'],
    security: [{ 'JWT-auth': [] }],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              success: {
                summary: '사용자 조회 성공',
                value: createResponse('SUCCESS', 'USER_GET_SUCCESS', CreateExample.user('detail'))
              },
              error: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND')
              }
            }
          }
        }
      }
    }
  });

  // POST 엔드포인트 (Body 포함)
  openApiRegistry.registerPath({
    method: 'post',
    path: '/users',
    summary: '➕ 사용자 생성',
    description: '새로운 사용자를 생성합니다.',
    tags: ['users'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema, // Zod 스키마 사용
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              success: {
                summary: '사용자 생성 성공',
                value: createResponse('CREATED', 'USER_CREATE_SUCCESS', CreateExample.user('detail'))
              },
              error: {
                summary: '이메일 중복',
                value: createError('CONFLICT', 'EMAIL_IN_USE')
              }
            }
          }
        }
      }
    }
  });

  // GET 엔드포인트 (Query Parameter 포함)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/users',
    summary: '📋 사용자 목록 조회',
    description: '사용자 목록을 조회합니다.',
    tags: ['users'],
    request: {
      query: {
        schema: searchUserSchema, // Query 파라미터 스키마
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: {
              success: {
                summary: '사용자 목록 조회 성공',
                value: createResponse('SUCCESS', 'USER_SEARCH_SUCCESS', [CreateExample.user('list')])
              }
            }
          }
        }
      }
    }
  });

  // PUT/DELETE 엔드포인트들...
};
```

### 3. Generator 통합

```typescript
// generator.ts
import { registerAuthEndpoints } from './endpoints/auth.endpoints';
import { registerUserEndpoints } from './endpoints/users.endpoints';
// ... 다른 엔드포인트들

export const generateOpenApiDocument = (): OpenAPIObject => {
  registerAllSchemas();

  // 모든 엔드포인트 등록
  registerAuthEndpoints();
  registerUserEndpoints();
  // ... 다른 엔드포인트들

  return generator.generateDocument({...});
};
```

### 4. 예상 결과

- **Swagger UI**: 선택 가능한 응답 예시 드롭다운
- **타입 안전성**: Zod 스키마 기반 자동 타입 추론
- **일관성**: 모든 API가 동일한 패턴으로 문서화
- **유지보수성**: 스키마 변경 시 한 곳만 수정

## 진행 상황 (2025 1006)

### ✅ 완료된 작업

1. **기반 설정**: Zod OpenAPI 통합 완료
2. **핵심 컨트롤러 4개**: Users, Auth, Tag Subscribe, Category Subscribe
3. **DTO 수정**: Controller에서 `Object` → 적절한 DTO로 변경
4. **Import 수정**: `import type` → 일반 `import`로 변경

### 🔄 다음 단계

1. **Posts Controller** 마이그레이션
2. **Categories Controller** 마이그레이션
3. **Tags Controller** 마이그레이션
4. **Comments Controller** 마이그레이션
5. **Admin Controllers** 마이그레이션

### 📊 진행률

- **완료**: 4/12 컨트롤러 (33%)
- **남은 작업**: 8개 컨트롤러
- **예상 완료**: 2025 1006

## 주의사항

1. **Path Parameters**: 경로 문자열에 `{paramName}` 형태로 정의하고 `request.params`에 Zod 스키마로 검증 규칙 지정
2. **Body Parameters**: POST/PUT 요청의 body는 `request.body.content['application/json'].schema`로 Zod 스키마 지정
3. **Query Parameters**: GET 요청의 query 파라미터는 `request.query.schema`로 Zod 스키마 지정
4. **스키마 재사용**: 기존 Zod 스키마를 최대한 재사용하여 중복 방지
5. **예시 일관성**: `CreateExample` 유틸리티를 사용하여 일관된 예시 데이터 제공
6. **에러 처리**: `createError` 함수를 사용하여 표준화된 에러 응답 생성

## 참고 자료

- [@asteasolutions/zod-to-openapi 공식 문서](https://github.com/asteasolutions/zod-to-openapi)
- [Zod 공식 문서](https://zod.dev/)
- [OpenAPI 3.0 스펙](https://swagger.io/specification/)
