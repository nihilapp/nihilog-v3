# API-UI 일관성 검증 작업 계획서

## 작업 내용

API 리팩토링 작업 완료 후, 백엔드 API와 프론트엔드 UI 간의 일관성을 검증하고 동기화합니다. 스키마, 타입, 엔드포인트 정의 등 모든 부분에서 API와 UI가 일치하도록 보장합니다.

### 변경 이유

- **타입 안정성 보장**: API와 UI 간 타입 불일치로 인한 런타임 에러 방지
- **개발 효율성 향상**: 일관된 인터페이스로 개발자 경험 개선
- **유지보수성 증대**: API 변경 시 UI도 자동으로 동기화되도록 보장
- **버그 예방**: 스키마 불일치로 인한 예상치 못한 동작 방지
- **코드 품질 향상**: 전체 시스템의 일관성과 신뢰성 확보

## 작업 방법

### 1. 스키마 파일 비교 (`schemas/`)

- **API**: `apps/api/src/endpoints/prisma/schemas/`
- **UI**: `apps/ui/app/_schemas/`
- **비교 항목**:
  - 필드명, 타입, 제약조건 일치 여부
  - UI 전용 필드(`passwordConfirm` 등) 식별 및 분리
  - 필수/선택 필드 일치 여부
  - 유효성 검사 규칙 일치 여부

### 2. 타입 파일 비교 (`types/`)

- **API**: `apps/api/src/endpoints/prisma/types/`
- **UI**: `apps/ui/app/_types/`
- **비교 항목**:
  - 타입 정의 완전 일치 여부
  - 인터페이스 구조 동일성
  - 제네릭 타입 일치 여부
  - 유니온 타입, 옵셔널 타입 일치 여부

### 3. 엔드포인트-커스텀 훅 비교

- **API**: `apps/api/src/endpoints/` 내 컨트롤러 메소드들
- **UI**: `apps/ui/app/_entities/` 내 커스텀 훅들
- **비교 항목**:
  - 요청 주소 (URL) 일치 여부
  - HTTP 메소드 일치 여부
  - 요청 데이터 타입 일치 여부
  - 파라미터 전달 방식 (Body vs Query) 일치 여부
  - 반환 데이터 타입 일치 여부
  - 에러 처리 방식 일치 여부

## 작업 순서

md 폴더의 api- 파일 순서에 따라 17개 엔티티를 점검:

### 1. api-admin-categories-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/category.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/category.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/category.types.ts`
- **UI 타입**: `apps/ui/app/_types/category.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/categories/admin-categories.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/categories/`
- **점검 엔드포인트**:
  - `adminGetAnalyzeCategoryData`
  - `adminGetTopPopularCategoriesByIndex`
  - `adminGetAverageBookmarkCountPerCategory`
  - `adminGetAverageViewCountPerCategory`
  - `adminGetCategorySubscriberGrowthRate`
  - `adminGetCategoryList`

### 2. api-admin-category-subscribe-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/category-subscribe.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/category-subscribe.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/category-subscribe.types.ts`
- **UI 타입**: `apps/ui/app/_types/category-subscribe.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/subscribe/admin-category-subscribe.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/category-subscribes/`

### 3. api-admin-comments-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/comment.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/comment.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/comment.types.ts`
- **UI 타입**: `apps/ui/app/_types/comment.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/comments/admin-comments.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/comments/`
- **점검 엔드포인트**:
  - `adminGetAnalyzeCommentData`
  - `adminGetTopPostsByCommentCount`
  - `adminGetTopUsersByCommentCount`
  - `adminGetAverageCommentCountPerPost`
  - `adminGetCommentApprovalRate`
  - `adminGetCommentSpamRate`
  - `adminGetCommentReplyRatio`
  - `adminGetCommentAverageDepth`

### 4. api-admin-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/admin.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/admin.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/admin.types.ts`
- **UI 타입**: `apps/ui/app/_types/admin.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/admin.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/admin/`

### 5. api-admin-posts-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/post.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/post.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/post.types.ts`
- **UI 타입**: `apps/ui/app/_types/post.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/posts/admin-posts.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/posts/`
- **점검 엔드포인트**:
  - `adminGetAnalyzePostData`
  - `adminGetPostShareStatsByPlatform`
  - `adminGetAverageForPostView`
  - `adminGetAverageBookmarkCountPerPost`
  - `adminGetTopPopularPostsByViewCount`
  - `adminGetTopPostsByCommentCount`
  - `adminGetPostStatusRatio`

### 6. api-admin-tag-subscribe-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/tag-subscribe.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/tag-subscribe.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/tag-subscribe.types.ts`
- **UI 타입**: `apps/ui/app/_types/tag-subscribe.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/subscribe/admin-tag-subscribe.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/tag-subscribes/`

### 7. api-admin-tags-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/tag.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/tag.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/tag.types.ts`
- **UI 타입**: `apps/ui/app/_types/tag.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/tags/admin-tags.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/tags/`
- **점검 엔드포인트**:
  - `adminGetAnalyzeTagData`
  - `adminGetTopUsedTagsByCount`
  - `adminGetTagUsageTrend`
  - `adminGetTagSubscriberGrowthRate`
  - `adminGetTagAverageUsageFrequency`
  - `adminGetTagMapping`

### 8. api-admin-user-subscribe-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/user-subscribe.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/user-subscribe.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/user-subscribe.types.ts`
- **UI 타입**: `apps/ui/app/_types/user-subscribe.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/subscribe/admin-user-subscribe.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/user-subscribes/`
- **점검 엔드포인트**:
  - `adminGetAnalyzeSubscribeData`
  - `adminGetTotalActiveNotificationUsers`
  - `adminGetTotalInactiveNotificationUsers`
  - `adminGetUserSubscribeList`

### 9. api-admin-users-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/user.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/user.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/user.types.ts`
- **UI 타입**: `apps/ui/app/_types/user.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/admin/users/admin-users.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/users/`
- **점검 엔드포인트**:
  - `getAnalyzeUserData`
  - `getActiveUserAnalysis`
  - `getTopUsersByContribution`
  - `getTopUsersByPostCount`
  - `getTopUsersByCommentCount`
  - `getUserGrowthRate`
  - `getUserRetentionRate`
  - `adminGetUserList`

### 10. api-auth-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/auth.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/auth.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/auth.types.ts`
- **UI 타입**: `apps/ui/app/_types/auth.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/auth/auth.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/auth/`

### 11. api-categories-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/category.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/category.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/category.types.ts`
- **UI 타입**: `apps/ui/app/_types/category.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/categories/categories.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/categories/`

### 12. api-category-subscribe-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/category-subscribe.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/category-subscribe.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/category-subscribe.types.ts`
- **UI 타입**: `apps/ui/app/_types/category-subscribe.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/subscribe/category-subscribe.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/category-subscribes/`

### 13. api-comments-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/comment.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/comment.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/comment.types.ts`
- **UI 타입**: `apps/ui/app/_types/comment.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/comments/comments.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/comments/`

### 14. api-posts-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/post.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/post.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/post.types.ts`
- **UI 타입**: `apps/ui/app/_types/post.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/posts/posts.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/posts/`

### 15. api-tag-subscribe-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/tag-subscribe.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/tag-subscribe.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/tag-subscribe.types.ts`
- **UI 타입**: `apps/ui/app/_types/tag-subscribe.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/subscribe/tag-subscribe.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/tag-subscribes/`

### 16. api-tags-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/tag.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/tag.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/tag.types.ts`
- **UI 타입**: `apps/ui/app/_types/tag.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/tags/tags.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/tags/`

### 17. api-users-controller.md

- **API 스키마**: `apps/api/src/endpoints/prisma/schemas/user.schema.ts`
- **UI 스키마**: `apps/ui/app/_schemas/user.schema.ts`
- **API 타입**: `apps/api/src/endpoints/prisma/types/user.types.ts`
- **UI 타입**: `apps/ui/app/_types/user.types.ts`
- **API 컨트롤러**: `apps/api/src/endpoints/users/users.controller.ts`
- **UI 커스텀 훅**: `apps/ui/app/_entities/users/`

## 상세 검증 항목

### 스키마 비교 체크리스트

- [ ] 필드명 일치 여부
- [ ] 데이터 타입 일치 여부 (string, number, boolean, array 등)
- [ ] 필수/선택 필드 일치 여부 (required, optional)
- [ ] 유효성 검사 규칙 일치 여부 (min, max, pattern, format 등)
- [ ] UI 전용 필드 식별 및 분리 (`passwordConfirm` 등)
- [ ] 중첩 객체 구조 일치 여부
- [ ] 배열 타입 정의 일치 여부

### 타입 비교 체크리스트

- [ ] 인터페이스/타입 정의 완전 일치
- [ ] 제네릭 타입 매개변수 일치
- [ ] 유니온 타입 정의 일치
- [ ] 옵셔널 프로퍼티 일치
- [ ] 인덱스 시그니처 일치
- [ ] 상속/확장 관계 일치

### 엔드포인트-훅 비교 체크리스트

- [ ] 요청 URL 경로 일치
- [ ] HTTP 메소드 일치 (GET, POST, PUT, DELETE, PATCH)
- [ ] 요청 파라미터 타입 일치
- [ ] 파라미터 전달 방식 일치 (Body vs Query vs Path)
- [ ] 응답 데이터 타입 일치
- [ ] 에러 응답 타입 일치
- [ ] 인증/권한 요구사항 일치
- [ ] 요청 헤더 설정 일치

## 주의사항

1. **UI 전용 필드 처리**: `passwordConfirm` 같은 UI 전용 필드는 API 스키마에 포함하지 않음
2. **타입 안정성**: TypeScript 컴파일 에러가 발생하지 않도록 주의
3. **기존 기능 유지**: 변경 시 기존 동작이 깨지지 않도록 확인
4. **점진적 적용**: 한 번에 모든 것을 변경하지 말고 단계적으로 적용
5. **테스트 검증**: 변경 후 실제 API 호출이 정상 작동하는지 확인

## 완료 기준

- [ ] 모든 엔티티의 스키마가 API-UI 간 일치
- [ ] 모든 타입 정의가 API-UI 간 일치
- [ ] 모든 엔드포인트-훅 쌍이 완전히 동기화됨
- [ ] TypeScript 컴파일 에러 없음
- [ ] 실제 API 호출 테스트 통과
- [ ] UI 전용 필드가 적절히 분리됨
- [ ] 문서와 코드가 일치함
