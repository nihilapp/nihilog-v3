# 캐시 무효화 로직 분석 보고서

## 요약

\_entities 폴더 내의 66개 커스텀 훅에서 사용하는 `queryClient.invalidateQueries()` 로직을 분석한 결과, 대부분의 훅에서 `.all()` 패턴을 사용하여 전체 캐시를 무효화하고 있습니다. 이는 성능상 비효율적이며, 더 세밀한 캐시 관리가 필요합니다.

## 분석 결과

### 1. 전체 무효화 패턴 (`.all()` 사용)

#### 관리자 관련 훅

**게시글 관리**

- `use-admin-create-post.ts`: `adminPostsKeys.all().queryKey`
- `use-admin-update-post.ts`: `adminPostsKeys.postByNo(pstNo).queryKey` + `adminPostsKeys.all().queryKey`
- `use-admin-delete-post.ts`: `adminPostsKeys.all().queryKey`

**카테고리 관리**

- `use-admin-create-category.ts`: `adminCategoriesKeys.all().queryKey`
- `use-admin-update-category.ts`: `adminCategoriesKeys.categoryByNo(ctgryNo).queryKey` + `adminCategoriesKeys.all().queryKey`
- `use-admin-delete-category.ts`: `adminCategoriesKeys.all().queryKey`
- `use-admin-create-multiple-categories.ts`: `adminCategoriesKeys.all().queryKey`
- `use-admin-update-multiple-categories.ts`: `adminCategoriesKeys.all().queryKey`
- `use-admin-delete-multiple-categories.ts`: `adminCategoriesKeys.all().queryKey`

**태그 관리**

- `use-admin-create-tag.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-update-tag.ts`: `adminTagsKeys.tagByNo(tagNo).queryKey` + `adminTagsKeys.all().queryKey`
- `use-admin-delete-tag.ts`: `adminTagsKeys.tagByNo(tagNo).queryKey` + `adminTagsKeys.all().queryKey`
- `use-admin-create-multiple-tags.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-update-multiple-tags.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-delete-multiple-tags.ts`: `adminTagsKeys.all().queryKey`

**태그 매핑 관리**

- `use-admin-create-tag-mapping.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-delete-tag-mapping.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-create-multiple-tag-mappings.ts`: `adminTagsKeys.all().queryKey`
- `use-admin-delete-multiple-tag-mappings.ts`: `adminTagsKeys.all().queryKey`

**사용자 관리**

- `use-admin-create-user.ts`: `adminUsersKeys.all().queryKey`
- `use-admin-update-user.ts`: `adminUsersKeys.userByNo(userNo).queryKey` + `adminUsersKeys.all().queryKey`
- `use-admin-delete-user.ts`: `adminUsersKeys.userByNo(userNo).queryKey` + `adminUsersKeys.all().queryKey`
- `use-admin-update-multiple-users.ts`: `adminUsersKeys.all().queryKey`
- `use-admin-delete-multiple-users.ts`: `adminUsersKeys.all().queryKey`

**댓글 관리**

- `use-admin-update-multiple-comments.ts`: `adminCommentsKeys.all().queryKey`
- `use-admin-delete-multiple-comments.ts`: `adminCommentsKeys.all().queryKey`

**구독 관리**

- `use-admin-create-subscribe.ts`: `adminSubscribeKeys.all().queryKey`
- `use-admin-delete-subscribe.ts`: `adminSubscribeKeys.all().queryKey`

**태그 구독 관리**

- `use-admin-create-multiple-tag-subscribes.ts`: `adminTagSubscribeKeys.all().queryKey`
- `use-admin-update-multiple-tag-subscribes.ts`: `adminTagSubscribeKeys.all().queryKey`
- `use-admin-delete-multiple-tag-subscribes.ts`: `adminTagSubscribeKeys.all().queryKey`

**카테고리 구독 관리**

- `use-admin-create-multiple-category-subscribes.ts`: `adminCategorySubscribeKeys.all().queryKey`
- `use-admin-update-multiple-category-subscribes.ts`: `adminCategorySubscribeKeys.all().queryKey`
- `use-admin-delete-multiple-category-subscribes.ts`: `adminCategorySubscribeKeys.all().queryKey`

**관리자 프로필**

- `use-admin-update-profile.ts`: `adminKeys.all().queryKey`

#### 사용자 관련 훅

**프로필 관리**

- `use-update-profile.ts`: `authKeys.session().queryKey` + `usersKeys.profile().queryKey`
- `use-delete-profile.ts`: `authKeys.session().queryKey` + `usersKeys.all().queryKey`
- `use-create-user.ts`: `usersKeys.all().queryKey`

**구독 관리**

- `use-update-subscribe.ts`: `usersKeys.subscribe().queryKey`

#### 인증 관련 훅

- `use-refresh-token.ts`: `authKeys.session().queryKey`
- `use-change-password.ts`: `authKeys.session().queryKey` + `usersKeys.profile().queryKey`
- `use-withdraw.ts`: `authKeys.session().queryKey`
- `use-signout.ts`: `authKeys.session().queryKey`

#### 댓글 관련 훅

- `use-create-comment.ts`: 조건부 무효화 (postNo 있으면 특정 게시글 댓글 목록, 없으면 전체)
- `use-update-comment.ts`: 조건부 무효화 (commentNo, postNo에 따라)
- `use-delete-comment.ts`: 조건부 무효화 (commentNo, postNo에 따라)

#### 게시글 관련 훅

- `use-create-share-log.ts`: 조건부 무효화 (postNo 있으면 특정 게시글, 없으면 전체)
- `use-create-view-log.ts`: 조건부 무효화 (postNo 있으면 특정 게시글, 없으면 전체)
- `use-create-bookmark.ts`: 조건부 무효화 (postNo 있으면 특정 게시글 + 북마크 목록, 없으면 전체)
- `use-delete-bookmark.ts`: 조건부 무효화 (postNo 있으면 특정 게시글 + 북마크 목록, 없으면 전체)

#### 구독 관련 훅

**태그 구독**

- `use-create-tag-subscribe.ts`: `tagSubscribeKeys.tagSubscribeList({}).queryKey` + `tagSubscribeKeys.tagSubscribeByNo(tagNo, {}).queryKey`
- `use-delete-tag-subscribe.ts`: `tagSubscribeKeys.tagSubscribeList({}).queryKey` + 조건부 `tagSubscribeKeys.tagSubscribeByNo(tagNo, {}).queryKey`
- `use-update-tag-subscribe.ts`: `tagSubscribeKeys.all().queryKey`
- `use-create-multiple-tag-subscribes.ts`: `tagSubscribeKeys.all().queryKey`
- `use-update-multiple-tag-subscribes.ts`: `tagSubscribeKeys.all().queryKey`
- `use-delete-multiple-tag-subscribes.ts`: `tagSubscribeKeys.all().queryKey`

**카테고리 구독**

- `use-create-category-subscribe.ts`: `categorySubscribeKeys.categorySubscribeList({}).queryKey` + `categorySubscribeKeys.categorySubscribeByNo(ctgryNo, {}).queryKey`
- `use-delete-category-subscribe.ts`: `categorySubscribeKeys.categorySubscribeList({}).queryKey` + 조건부 `categorySubscribeKeys.categorySubscribeByNo(ctgryNo, {}).queryKey`
- `use-update-category-subscribe.ts`: `categorySubscribeKeys.all().queryKey`
- `use-create-multiple-category-subscribes.ts`: `categorySubscribeKeys.all().queryKey`
- `use-update-multiple-category-subscribes.ts`: `categorySubscribeKeys.all().queryKey`
- `use-delete-multiple-category-subscribes.ts`: `categorySubscribeKeys.all().queryKey`

### 2. 기본 API 훅 (Common)

**공통 패턴**

- `use-post.ts`: `queryKey` (전달받은 키)
- `use-put.ts`: `queryKey` (전달받은 키)
- `use-patch.ts`: `queryKey` (전달받은 키)
- `use-delete.ts`: `queryKey` (전달받은 키)

## 패턴 분류

### 1. 전체 무효화 패턴 (`.all()` 사용) - 47개 훅

- **문제점**: 성능상 비효율적, 불필요한 네트워크 요청 발생
- **개선 필요**: 특정 리소스만 무효화하도록 최적화

### 2. 특정 키 무효화 패턴 - 8개 훅

- **장점**: 효율적인 캐시 관리
- **예시**: `use-update-profile.ts`, `use-refresh-token.ts`

### 3. 복합 무효화 패턴 - 6개 훅

- **특징**: 여러 관련 키를 동시에 무효화
- **예시**: `use-admin-update-post.ts`, `use-change-password.ts`

### 4. 조건부 무효화 패턴 - 5개 훅

- **장점**: 상황에 따른 최적화된 무효화
- **예시**: `use-create-comment.ts`, `use-delete-bookmark.ts`

## 개선 권장사항

### 1. 우선순위 높음

**관리자 훅 최적화**

- 단일 리소스 생성/수정/삭제 시 `.all()` 대신 특정 리소스 키만 무효화
- 예: `use-admin-create-post.ts` → 생성된 게시글만 무효화

**다중 작업 훅 최적화**

- 다중 생성/수정/삭제 시 영향받는 리소스만 무효화
- 예: `use-admin-create-multiple-categories.ts` → 생성된 카테고리들만 무효화

### 2. 우선순위 중간

**구독 관련 훅 최적화**

- 태그/카테고리 구독 시 관련 목록만 무효화
- 예: `use-create-tag-subscribe.ts`는 이미 최적화됨

**게시글 관련 훅 최적화**

- 북마크, 조회수, 공유수 변경 시 해당 게시글만 무효화
- 예: `use-create-bookmark.ts`는 이미 조건부 무효화 적용됨

### 3. 우선순위 낮음

**기본 API 훅 개선**

- `use-post.ts`, `use-put.ts` 등에서 더 세밀한 무효화 옵션 제공
- 현재는 전달받은 키를 그대로 사용하므로 상위 훅에서 제어

## 결론

현재 프로젝트의 캐시 무효화 로직은 대부분 `.all()` 패턴을 사용하여 전체 캐시를 무효화하고 있습니다. 이는 개발 편의성은 높지만 성능상 비효율적입니다.

**개선 효과**:

- 불필요한 네트워크 요청 감소
- 사용자 경험 향상 (더 빠른 UI 업데이트)
- 서버 부하 감소

**권장 접근법**:

1. 단일 리소스 작업 시 해당 리소스만 무효화
2. 다중 리소스 작업 시 영향받는 리소스들만 무효화
3. 조건부 무효화 패턴을 더 적극적으로 활용
4. 관련성이 높은 리소스들만 함께 무효화

이러한 개선을 통해 더 효율적이고 사용자 친화적인 캐시 관리가 가능할 것입니다.
