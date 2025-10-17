# API 엔드포인트 리팩토링 작업 계획서

## 작업 내용

현재 API 문서에서 조회 기능을 하는 엔드포인트들이 POST 메소드를 사용하고 Body로 파라미터를 받고 있습니다. 이를 RESTful한 방식으로 변경하여 조회 기능은 GET 메소드를 사용하고, 파라미터는 Query로 전달하도록 수정합니다.

### 변경 이유

- **RESTful API 설계 원칙 준수**: 조회(Read) 작업은 GET 메소드를 사용해야 함
- **캐싱 최적화**: GET 요청은 브라우저와 프록시에서 캐싱 가능
- **URL 공유 가능**: Query 파라미터로 된 GET 요청은 URL로 직접 공유 가능
- **HTTP 표준 준수**: GET은 멱등성(idempotent)을 보장하며 부작용이 없음
- **개발자 경험 향상**: RESTful한 API는 더 직관적이고 예측 가능함

## 작업 방법

### 1. 컨트롤러 수정 (`apps/api/src/endpoints/`)

- POST 메소드를 GET으로 변경
- `@Body()` 데코레이터를 `@Query()` 데코레이터로 변경
- `AnalyzeStatDto`를 Query 파라미터로 받도록 수정
- `Search<Entity>Dto`를 Query 파라미터로 받도록 수정

### 2. OpenAPI 스키마 수정 (`apps/api/src/openapi/endpoints/`)

- 엔드포인트 정의에서 HTTP 메소드를 POST에서 GET으로 변경
- 요청 스키마를 Body에서 Query로 변경
- 파라미터 정의 업데이트

## 작업 순서

md 폴더의 파일 순서에 따라 진행:

### 1. api-admin-categories-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/categories/admin-categories.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-categories.endpoints.ts`
- **수정 엔드포인트**:
  - `adminGetAnalyzeCategoryData` (POST → GET)
  - `adminGetTopPopularCategoriesByIndex` (POST → GET)
  - `adminGetAverageBookmarkCountPerCategory` (POST → GET)
  - `adminGetAverageViewCountPerCategory` (POST → GET)
  - `adminGetCategorySubscriberGrowthRate` (POST → GET)
  - `adminGetCategoryList` (POST → GET)

### 2. api-admin-category-subscribe-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/subscribe/admin-category-subscribe.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-category-subscribe.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 3. api-admin-comments-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/comments/admin-comments.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-comments.endpoints.ts`
- **수정 엔드포인트**:
  - `adminGetAnalyzeCommentData` (POST → GET)
  - `adminGetTopPostsByCommentCount` (POST → GET)
  - `adminGetTopUsersByCommentCount` (POST → GET)
  - `adminGetAverageCommentCountPerPost` (POST → GET)
  - `adminGetCommentApprovalRate` (POST → GET)
  - `adminGetCommentSpamRate` (POST → GET)
  - `adminGetCommentReplyRatio` (POST → GET)
  - `adminGetCommentAverageDepth` (POST → GET)

### 4. api-admin-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/admin.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 5. api-admin-posts-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/posts/admin-posts.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-posts.endpoints.ts`
- **수정 엔드포인트**:
  - `adminGetAnalyzePostData` (POST → GET)
  - `adminGetPostShareStatsByPlatform` (POST → GET)
  - `adminGetAverageForPostView` (POST → GET)
  - `adminGetAverageBookmarkCountPerPost` (POST → GET)
  - `adminGetTopPopularPostsByViewCount` (POST → GET)
  - `adminGetTopPostsByCommentCount` (POST → GET)
  - `adminGetPostStatusRatio` (POST → GET)

### 6. api-admin-tag-subscribe-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/subscribe/admin-tag-subscribe.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-tag-subscribe.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 7. api-admin-tags-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/tags/admin-tags.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-tags.endpoints.ts`
- **수정 엔드포인트**:
  - `adminGetAnalyzeTagData` (POST → GET)
  - `adminGetTopUsedTagsByCount` (POST → GET)
  - `adminGetTagUsageTrend` (POST → GET)
  - `adminGetTagSubscriberGrowthRate` (POST → GET)
  - `adminGetTagAverageUsageFrequency` (POST → GET)
  - `adminGetTagMapping` (POST → GET)

### 8. api-admin-user-subscribe-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/subscribe/admin-user-subscribe.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-user-subscribe.endpoints.ts`
- **수정 엔드포인트**:
  - `adminGetAnalyzeSubscribeData` (POST → GET)
  - `adminGetTotalActiveNotificationUsers` (POST → GET)
  - `adminGetTotalInactiveNotificationUsers` (POST → GET)
  - `adminGetUserSubscribeList` (POST → GET)

### 9. api-admin-users-controller.md

- **대상 파일**: `apps/api/src/endpoints/admin/users/admin-users.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/admin-users.endpoints.ts`
- **수정 엔드포인트**:
  - `getAnalyzeUserData` (POST → GET)
  - `getActiveUserAnalysis` (POST → GET)
  - `getTopUsersByContribution` (POST → GET)
  - `getTopUsersByPostCount` (POST → GET)
  - `getTopUsersByCommentCount` (POST → GET)
  - `getUserGrowthRate` (POST → GET)
  - `getUserRetentionRate` (POST → GET)
  - `adminGetUserList` (POST → GET)

### 10. api-auth-controller.md

- **대상 파일**: `apps/api/src/endpoints/auth/auth.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/auth.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 11. api-categories-controller.md

- **대상 파일**: `apps/api/src/endpoints/categories/categories.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/categories.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 12. api-category-subscribe-controller.md

- **대상 파일**: `apps/api/src/endpoints/subscribe/category-subscribe.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/category-subscribe.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 13. api-comments-controller.md

- **대상 파일**: `apps/api/src/endpoints/comments/comments.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/comments.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 14. api-posts-controller.md

- **대상 파일**: `apps/api/src/endpoints/posts/posts.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/posts.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 15. api-tag-subscribe-controller.md

- **대상 파일**: `apps/api/src/endpoints/subscribe/tag-subscribe.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/tag-subscribe.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 16. api-tags-controller.md

- **대상 파일**: `apps/api/src/endpoints/tags/tags.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/tags.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

### 17. api-users-controller.md

- **대상 파일**: `apps/api/src/endpoints/users/users.controller.ts`
- **OpenAPI**: `apps/api/src/openapi/endpoints/users.endpoints.ts`
- **수정 엔드포인트**: 해당 파일에 조회 기능이 있는 경우 수정

## 주의사항

1. **기존 기능 유지**: 메소드 시그니처 변경 시 기존 로직이 정상 작동하는지 확인
2. **타입 안정성**: TypeScript 타입 정의가 올바르게 업데이트되었는지 확인
3. **테스트 코드**: 기존 테스트 코드가 새로운 API 구조에 맞게 수정되었는지 확인
4. **문서 동기화**: API 문서와 실제 코드가 일치하는지 확인
5. **클라이언트 코드**: 프론트엔드에서 API 호출하는 부분도 함께 수정 필요

## 작업 체크리스트

### 1. api-admin-categories-controller.md

- [x] `adminGetAnalyzeCategoryData` (POST → GET)
- [x] `adminGetTopPopularCategoriesByIndex` (POST → GET)
- [x] `adminGetAverageBookmarkCountPerCategory` (POST → GET)
- [x] `adminGetAverageViewCountPerCategory` (POST → GET)
- [x] `adminGetCategorySubscriberGrowthRate` (POST → GET)
- [x] `adminGetCategoryList` (POST → GET)

### 2. api-admin-category-subscribe-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (조회 기능 없음)

### 3. api-admin-comments-controller.md

- [x] `adminGetAnalyzeCommentData` (POST → GET)
- [x] `adminGetTopPostsByCommentCount` (POST → GET)
- [x] `adminGetTopUsersByCommentCount` (POST → GET)
- [x] `adminGetAverageCommentCountPerPost` (POST → GET)
- [x] `adminGetCommentApprovalRate` (POST → GET)
- [x] `adminGetCommentSpamRate` (POST → GET)
- [x] `adminGetCommentReplyRatio` (POST → GET)
- [x] `adminGetCommentAverageDepth` (POST → GET)

### 4. api-admin-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (조회 기능 없음)

### 5. api-admin-posts-controller.md

- [x] `adminGetAnalyzePostData` (POST → GET)
- [x] `adminGetPostShareStatsByPlatform` (POST → GET)
- [x] `adminGetAverageForPostView` (POST → GET)
- [x] `adminGetAverageBookmarkCountPerPost` (POST → GET)
- [x] `adminGetTopPopularPostsByViewCount` (POST → GET)
- [x] `adminGetTopPostsByCommentCount` (POST → GET)
- [x] `adminGetPostStatusRatio` (POST → GET)

### 6. api-admin-tag-subscribe-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (조회 기능 없음)

### 7. api-admin-tags-controller.md

- [x] `adminGetAnalyzeTagData` (POST → GET)
- [x] `adminGetTopUsedTagsByCount` (POST → GET)
- [x] `adminGetTagUsageTrend` (POST → GET)
- [x] `adminGetTagSubscriberGrowthRate` (POST → GET)
- [x] `adminGetTagAverageUsageFrequency` (POST → GET)
- [x] `adminGetTagMapping` (POST → GET)

### 8. api-admin-user-subscribe-controller.md

- [x] `adminGetAnalyzeSubscribeData` (POST → GET)
- [x] `adminGetTotalActiveNotificationUsers` (POST → GET)
- [x] `adminGetTotalInactiveNotificationUsers` (POST → GET)
- [x] `adminGetUserSubscribeList` (POST → GET)

### 9. api-admin-users-controller.md

- [x] `getAnalyzeUserData` (POST → GET)
- [x] `getActiveUserAnalysis` (POST → GET)
- [x] `getTopUsersByContribution` (POST → GET)
- [x] `getTopUsersByPostCount` (POST → GET)
- [x] `getTopUsersByCommentCount` (POST → GET)
- [x] `getUserGrowthRate` (POST → GET)
- [x] `getUserRetentionRate` (POST → GET)
- [x] `adminGetUserList` (POST → GET)

### 10. api-auth-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (조회 기능 없음)

### 11. api-categories-controller.md

- [x] `getCategoryList` (POST → GET)

### 12. api-category-subscribe-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (파일 없음)

### 13. api-comments-controller.md

- [x] `getCommentList` (POST → GET)

### 14. api-posts-controller.md

- [x] `getPostList` (POST → GET)

### 15. api-tag-subscribe-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (파일 없음)

### 16. api-tags-controller.md

- [x] `getTagList` (POST → GET)

### 17. api-users-controller.md

- [x] 해당 파일에 조회 기능이 있는 경우 수정 (조회 기능 없음)

## 완료 기준

- [x] 모든 조회 기능 엔드포인트가 GET 메소드 사용
- [x] 모든 파라미터가 Query로 전달
- [x] OpenAPI 스키마가 올바르게 업데이트됨
- [x] 타입 정의가 정확함
- [x] 기존 기능이 정상 작동함
