# API 엔드포인트 React Query 커스텀 훅 구현 작업 계획서

## 작업 내용

API 리팩토링 작업 완료 후, 17개 컨트롤러의 각 엔드포인트에 대응하는 React Query 커스텀 훅을 UI 엔티티 폴더에 구현합니다. 기존 users 엔티티의 hooks 구조를 참고하여 일관된 패턴으로 모든 엔티티에 커스텀 훅을 구현합니다.

### 작업 목표

- **완전한 API-UI 동기화**: 모든 API 엔드포인트에 대응하는 커스텀 훅 구현
- **일관된 패턴 적용**: users 엔티티의 hooks 구조를 표준으로 하여 모든 엔티티에 적용
- **타입 안정성 보장**: API와 UI 간 완전한 타입 일치
- **개발자 경험 향상**: 직관적이고 재사용 가능한 커스텀 훅 제공

## 기존 구조 분석

### Users 엔티티 hooks 구조 (참고 모델)

```
apps/ui/app/_entities/users/
├── hooks/
│   ├── index.ts                    # 모든 훅 export
│   ├── use-get-user-profile.ts     # GET /users/profile
│   ├── use-get-user-subscribe.ts   # GET /users/subscribe
│   ├── use-create-user.ts          # POST /users
│   ├── use-update-user-profile.ts  # PUT /users/profile
│   ├── use-update-user-subscribe.ts # PUT /users/subscribe
│   └── use-delete-user-profile.ts  # DELETE /users/profile
├── users.keys.ts                   # React Query 키 정의
└── users.store.ts                  # 상태 관리 (현재 비어있음)
```

**실제 API 엔드포인트**:

- `GET /users/profile` - 현재 로그인한 사용자 프로필 조회
- `GET /users/subscribe` - 이메일 구독 설정 조회
- `POST /users` - 새 사용자 계정 생성
- `PUT /users/profile` - 프로필 정보 수정
- `PUT /users/subscribe` - 이메일 구독 설정 변경
- `DELETE /users/profile` - 내 프로필 삭제

### 공통 훅 구조

- **useGet**: GET 요청용 (조회)
- **usePost**: POST 요청용 (생성)
- **usePut**: PUT 요청용 (전체 수정)
- **usePatch**: PATCH 요청용 (부분 수정)
- **useDelete**: DELETE 요청용 (삭제)
- **useGetInfinite**: 무한 스크롤용 GET 요청

## 작업 순서

### 1단계: 기본 엔티티 (5개)

#### 1.1 Users 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/users/users.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/users/`
- **구현할 훅**:
  - `use-get-user-profile.ts` (GET /users/profile) - 없음 → `ResponseDto<SelectUserInfoType>`
  - `use-get-user-subscribe.ts` (GET /users/subscribe) - 없음 → `ResponseDto<SelectUserSbcrInfoType>`
  - `use-create-user.ts` (POST /users) - Body: `CreateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `use-update-user-profile.ts` (PUT /users/profile) - Body: `UpdateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `use-update-user-subscribe.ts` (PUT /users/subscribe) - Body: `UpdateSubscribeDto` → `ResponseDto<SelectUserSbcrInfoType>`
  - `use-delete-user-profile.ts` (DELETE /users/profile) - 없음 → `ResponseDto<boolean>`
  - `users.keys.ts`
  - `index.ts`

#### 1.2 Categories 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/categories/categories.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/categories/`
- **구현할 훅**:
  - `use-get-category-list.ts` (GET /categories/search) - Query: `SearchCategoryDto` → `ResponseDto<ListType<SelectCategoryListItemType>>`
  - `use-get-category-by-no.ts` (GET /categories/:ctgryNo) - Path: `{ ctgryNo: number }` → `ResponseDto<SelectCategoryType>`
  - `use-get-category-by-name.ts` (GET /categories/name/:name) - Path: `{ name: string }` → `ResponseDto<SelectCategoryType>`
  - `categories.keys.ts`
  - `index.ts`

#### 1.3 Comments 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/comments/comments.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/comments/`
- **구현할 훅**:
  - `use-get-comment-list.ts` (GET /comments/search) - Query: `SearchCommentDto` → `ResponseDto<ListType<SelectCommentListItemType>>`
  - `use-get-comment-by-no.ts` (GET /comments/:cmntNo) - Path: `{ cmntNo: number }` → `ResponseDto<SelectCommentType>`
  - `use-create-comment.ts` (POST /comments) - Body: `CreateCommentDto` → `ResponseDto<SelectCommentType>`
  - `use-update-comment.ts` (PUT /comments) - Body: `UpdateCommentDto` → `ResponseDto<SelectCommentType>`
  - `use-delete-comment.ts` (DELETE /comments) - Body: `DeleteCommentDto` → `ResponseDto<boolean>`
  - `comments.keys.ts`
  - `index.ts`

#### 1.4 Posts 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/posts/posts.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/posts/`
- **구현할 훅**:
  - `use-get-post-list.ts` (GET /posts/search) - Query: `SearchPostDto` → `ResponseDto<ListType<SelectPostListItemType>>`
  - `use-get-post-by-no.ts` (GET /posts/:pstNo) - Path: `{ pstNo: number }` → `ResponseDto<SelectPostType>`
  - `use-get-post-by-slug.ts` (GET /posts/slug/:pstCd) - Path: `{ pstCd: string }` → `ResponseDto<SelectPostType>`
  - `use-get-posts-by-tag.ts` (POST /posts/tag/:tagNo) - Path: `{ tagNo: number }` + Body: `SearchPostDto` → `ResponseDto<ListType<SelectPostListItemType>>`
  - `use-get-posts-by-category.ts` (POST /posts/category/:ctgryNo) - Path: `{ ctgryNo: number }` + Body: `SearchPostDto` → `ResponseDto<ListType<SelectPostListItemType>>`
  - `use-get-posts-by-archive.ts` (POST /posts/archive/:date) - Path: `{ date: string }` + Body: `SearchPostDto` → `ResponseDto<ListType<SelectPostListItemType>>`
  - `use-get-advanced-post-list.ts` (POST /posts/advanced-search) - Body: `SearchPostDto` → `ResponseDto<ListType<SelectPostListItemType>>`
  - `use-create-post-view-log.ts` (POST /posts/:pstNo/view) - Path: `{ pstNo: number }` → `ResponseDto<SelectPostViewLogType>`
  - `use-create-post-share-log.ts` (POST /posts/:pstNo/share) - Body: `CreatePostShareLogDto` → `ResponseDto<SelectPostShareLogType>`
  - `use-create-post-bookmark.ts` (POST /posts/:pstNo/bookmark) - Path: `{ pstNo: number }` + Body: `CreatePostBookmarkDto` → `ResponseDto<SelectPostBookmarkType>`
  - `use-delete-post-bookmark.ts` (DELETE /posts/:pstNo/bookmark) - Path: `{ pstNo: number }` + Body: `DeletePostBookmarkDto` → `ResponseDto<boolean>`
  - `use-get-bookmarked-posts.ts` (POST /posts/bookmarked) - Body: `SearchPostBookmarkDto` → `ResponseDto<ListType<SelectPostBookmarkListItemType>>`
  - `posts.keys.ts`
  - `index.ts`

#### 1.5 Tags 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/tags/tags.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/tags/`
- **구현할 훅**:
  - `use-get-tag-list.ts` (GET /tags/search) - Query: `SearchTagDto` → `ResponseDto<ListType<SelectTagInfoListItemType>>`
  - `use-get-tag-by-no.ts` (GET /tags/:tagNo) - Path: `{ tagNo: number }` → `ResponseDto<SelectTagInfoType>`
  - `use-get-tag-by-name.ts` (GET /tags/name/:name) - Path: `{ name: string }` → `ResponseDto<SelectTagInfoType>`
  - `tags.keys.ts`
  - `index.ts`

### 2단계: 인증 및 구독 엔티티 (3개)

#### 2.1 Auth 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/auth/auth.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/auth/`
- **구현할 훅**:
  - `use-signin.ts` (POST /auth/signin) - Body: `SignInDto` → `ResponseDto<SelectUserInfoType>`
  - `use-signout.ts` (POST /auth/signout) - 없음 → `ResponseDto<null>`
  - `use-refresh-token.ts` (POST /auth/refresh) - 없음 → `ResponseDto<SelectUserInfoType>`
  - `use-get-session.ts` (GET /auth/session) - 없음 → `ResponseDto<UserInfoDto>`
  - `use-change-password.ts` (POST /auth/change-password) - Body: `ChangePasswordDto` → `ResponseDto<SelectUserInfoType>`
  - `auth.keys.ts`
  - `index.ts`

#### 2.2 Category Subscribe 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/subscribe/category-subscribe/category-subscribe.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/category-subscribes/`
- **구현할 훅**:
  - `use-get-category-subscribe-list.ts` (POST /users/subscribes/categories/search) - Body: `SearchCategorySubscribeDto` → `ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>`
  - `use-get-category-subscribe-by-no.ts` (POST /users/subscribes/categories/:ctgryNo/search) - Path: `{ ctgryNo: number }` + Body: `SearchCategorySubscribeDto` → `ResponseDto<ListType<SelectCtgrySbcrMpngListItemType>>`
  - `use-create-category-subscribe.ts` (POST /users/subscribes/categories/:ctgryNo) - Path: `{ ctgryNo: number }` + Body: `CreateCategorySubscribeDto` → `ResponseDto<SelectCtgrySbcrMpngType>`
  - `use-multiple-create-category-subscribe.ts` (POST /users/subscribes/categories/multiple) - Body: `CreateCategorySubscribeDto` → `ResponseDto<MultipleResultType>`
  - `use-update-category-subscribe.ts` (PUT /users/subscribes/categories/:ctgrySbcrNo) - Path: `{ ctgrySbcrNo: number }` + Body: `UpdateCategorySubscribeDto` → `ResponseDto<SelectCtgrySbcrMpngType>`
  - `use-multiple-update-category-subscribe.ts` (PUT /users/subscribes/categories/multiple) - Body: `UpdateCategorySubscribeDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-category-subscribe.ts` (DELETE /users/subscribes/categories/:ctgrySbcrNo) - Path: `{ ctgrySbcrNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-category-subscribe.ts` (DELETE /users/subscribes/categories/multiple) - Body: `DeleteCategorySubscribeDto` → `ResponseDto<MultipleResultType>`
  - `category-subscribes.keys.ts`
  - `index.ts`

#### 2.3 Tag Subscribe 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/subscribe/tag-subscribe/tag-subscribe.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/tag-subscribes/`
- **구현할 훅**:
  - `use-get-tag-subscribe-list.ts` (POST /users/subscribes/tags/search) - Body: `SearchTagSubscribeDto` → `ResponseDto<ListType<SelectTagSbcrMpngListItemType>>`
  - `use-get-tag-subscribe-by-no.ts` (POST /users/subscribes/tags/:tagNo/search) - Path: `{ tagNo: number }` + Body: `SearchTagSubscribeDto` → `ResponseDto<ListType<SelectTagSbcrMpngListItemType>>`
  - `use-create-tag-subscribe.ts` (POST /users/subscribes/tags/:tagNo) - Path: `{ tagNo: number }` + Body: `CreateTagSubscribeDto` → `ResponseDto<SelectTagSbcrMpngType>`
  - `use-multiple-create-tag-subscribe.ts` (POST /users/subscribes/tags/multiple) - Body: `CreateTagSubscribeDto` → `ResponseDto<MultipleResultType>`
  - `use-update-tag-subscribe.ts` (PUT /users/subscribes/tags/:tagSbcrNo) - Path: `{ tagSbcrNo: number }` + Body: `UpdateTagSubscribeDto` → `ResponseDto<SelectTagSbcrMpngType>`
  - `use-multiple-update-tag-subscribe.ts` (PUT /users/subscribes/tags/multiple) - Body: `UpdateTagSubscribeDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-tag-subscribe.ts` (DELETE /users/subscribes/tags/:tagSbcrNo) - Path: `{ tagSbcrNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-tag-subscribe.ts` (DELETE /users/subscribes/tags/multiple) - Body: `DeleteTagSubscribeDto` → `ResponseDto<MultipleResultType>`
  - `tag-subscribes.keys.ts`
  - `index.ts`

### 3단계: 관리자 엔티티 (7개)

#### 3.1 Admin 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/admin.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/`
- **구현할 훅**:
  - `use-update-admin-profile.ts` (PUT /admin/profile) - Body: `UpdateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `admin.keys.ts`
  - `index.ts`

#### 3.2 Admin Categories 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/categories/admin-categories.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/categories/`
- **구현할 훅**:
  - `use-get-analyze-category-data.ts` (GET /admin/categories/analyze/overview) - Query: `AnalyzeStatDto` → `ResponseDto<AnalyzeCategoryStatItemType[]>`
  - `use-get-top-popular-categories.ts` (GET /admin/categories/analyze/popular-index) - Query: `AnalyzeStatDto` → `ResponseDto<TopPopularCategoryItemType[]>`
  - `use-get-top-categories-by-subscriber.ts` (GET /admin/categories/analyze/top-subscribers) - Query: `AnalyzeStatDto` → `ResponseDto<TopCategoriesBySubscriberItemType[]>`
  - `use-get-average-bookmark-count.ts` (GET /admin/categories/analyze/average-bookmarks) - Query: `AnalyzeStatDto` → `ResponseDto<AverageBookmarkPerCategoryItemType[]>`
  - `use-get-average-view-count.ts` (GET /admin/categories/analyze/average-views) - Query: `AnalyzeStatDto` → `ResponseDto<AverageViewPerCategoryItemType[]>`
  - `use-get-category-hierarchy-distribution.ts` (GET /admin/categories/analyze/hierarchy-distribution) - 없음 → `ResponseDto<CategoryHierarchyDistributionItemType[]>`
  - `use-get-category-hierarchy-posts.ts` (GET /admin/categories/analyze/hierarchy-posts) - Query: `AnalyzeStatDto` → `ResponseDto<CategoryHierarchyPostDistributionItemType[]>`
  - `use-get-category-hierarchy-subscribers.ts` (GET /admin/categories/analyze/hierarchy-subscribers) - Query: `AnalyzeStatDto` → `ResponseDto<CategoryHierarchySubscriberDistributionItemType[]>`
  - `use-get-category-status-distribution.ts` (GET /admin/categories/analyze/status-distribution) - 없음 → `ResponseDto<CategoryStatusDistributionItemType[]>`
  - `use-get-category-creator-stats.ts` (GET /admin/categories/analyze/creator-stats) - 없음 → `ResponseDto<CategoryCreatorStatItemType[]>`
  - `use-get-unused-categories.ts` (GET /admin/categories/analyze/unused) - 없음 → `ResponseDto<UnusedCategoryItemType[]>`
  - `use-get-category-subscriber-growth-rate.ts` (GET /admin/categories/analyze/subscriber-growth) - Query: `AnalyzeStatDto` → `ResponseDto<CategorySubscriberGrowthRateItemType[]>`
  - `use-get-categories-without-subscribers.ts` (GET /admin/categories/analyze/no-subscribers) - 없음 → `ResponseDto<CategoriesWithoutSubscribersItemType[]>`
  - `use-get-category-list.ts` (GET /admin/categories/search) - Query: `SearchCategoryDto` → `ResponseDto<ListType<SelectCategoryListItemType>>`
  - `use-get-category-by-no.ts` (GET /admin/categories/:ctgryNo) - Path: `{ ctgryNo: number }` → `ResponseDto<SelectCategoryType>`
  - `use-get-category-by-name.ts` (GET /admin/categories/name/:name) - Path: `{ name: string }` → `ResponseDto<SelectCategoryType>`
  - `use-create-category.ts` (POST /admin/categories) - Body: `CreateCategoryDto` → `ResponseDto<SelectCategoryType>`
  - `use-multiple-create-category.ts` (POST /admin/categories/multiple) - Body: `CreateCategoryDto[]` → `ResponseDto<MultipleResultType>`
  - `use-update-category.ts` (PATCH /admin/categories/:ctgryNo) - Path: `{ ctgryNo: number }` + Body: `UpdateCategoryDto` → `ResponseDto<SelectCategoryType>`
  - `use-multiple-update-category.ts` (PATCH /admin/categories/multiple) - Body: `UpdateCategoryDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-category.ts` (DELETE /admin/categories/:ctgryNo) - Path: `{ ctgryNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-category.ts` (DELETE /admin/categories/multiple) - Body: `DeleteCategoryDto` → `ResponseDto<MultipleResultType>`
  - `admin-categories.keys.ts`
  - `index.ts`

#### 3.3 Admin Comments 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/comments/admin-comments.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/comments/`
- **구현할 훅**:
  - `use-get-analyze-comment-data.ts` (GET /admin/comments/analyze/overview) - Query: `AnalyzeStatDto` + Query: `pstNo?: number` → `ResponseDto<AnalyzeCommentStatItemType[]>`
  - `use-get-top-posts-by-comment.ts` (GET /admin/comments/analyze/top-posts) - Query: `AnalyzeStatDto` → `ResponseDto<TopPostsByCommentItemType[]>`
  - `use-get-top-users-by-comment.ts` (GET /admin/comments/analyze/top-users) - Query: `AnalyzeStatDto` → `ResponseDto<TopUsersByCommentItemType[]>`
  - `use-get-average-comment-count.ts` (GET /admin/comments/analyze/average-per-post) - Query: `AnalyzeStatDto` → `ResponseDto<AverageCommentPerPostItemType[]>`
  - `use-get-comment-status-distribution.ts` (GET /admin/comments/analyze/status-distribution) - 없음 → `ResponseDto<CommentStatusDistributionItemType[]>`
  - `use-get-comment-approval-rate.ts` (GET /admin/comments/analyze/approval-rate) - Query: `AnalyzeStatDto` → `ResponseDto<CommentApprovalRateItemType[]>`
  - `use-get-comment-spam-rate.ts` (GET /admin/comments/analyze/spam-rate) - Query: `AnalyzeStatDto` → `ResponseDto<CommentSpamRateItemType[]>`
  - `use-get-comment-reply-ratio.ts` (GET /admin/comments/analyze/reply-ratio) - Query: `AnalyzeStatDto` → `ResponseDto<CommentReplyRatioItemType[]>`
  - `use-get-comment-average-depth.ts` (GET /admin/comments/analyze/average-depth) - Query: `AnalyzeStatDto` → `ResponseDto<CommentAverageDepthItemType[]>`
  - `use-get-posts-without-comments.ts` (GET /admin/comments/analyze/posts-without-comments) - 없음 → `ResponseDto<PostsWithoutCommentsItemType[]>`
  - `use-multiple-update-comment.ts` (PUT /admin/comments/multiple) - Body: `UpdateCommentDto` → `ResponseDto<MultipleResultType>`
  - `use-multiple-delete-comment.ts` (DELETE /admin/comments/multiple) - Body: `DeleteCommentDto` → `ResponseDto<MultipleResultType>`
  - `admin-comments.keys.ts`
  - `index.ts`

#### 3.4 Admin Posts 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/posts/admin-posts.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/posts/`
- **구현할 훅**:
  - `use-get-analyze-post-data.ts` (GET /admin/posts/analyze/overview) - Query: `AnalyzeStatDto` → `ResponseDto<AnalyzePostItemType[]>`
  - `use-get-post-share-stats.ts` (GET /admin/posts/analyze/shares) - Query: `AnalyzeStatDto` → `ResponseDto<SharePlatformStatItemType[]>`
  - `use-get-average-post-view.ts` (GET /admin/posts/analyze/average-views) - Query: `AnalyzeStatDto` → `ResponseDto<AverageViewStatItemType[]>`
  - `use-get-average-bookmark-count.ts` (GET /admin/posts/analyze/average-bookmarks) - Query: `AnalyzeStatDto` → `ResponseDto<AverageBookmarkStatItemType[]>`
  - `use-get-top-popular-posts.ts` (GET /admin/posts/analyze/top-popular) - Query: `AnalyzeStatDto` → `ResponseDto<TopPopularPostItemType[]>`
  - `use-get-top-posts-by-comment.ts` (GET /admin/posts/analyze/top-comments) - Query: `AnalyzeStatDto` → `ResponseDto<TopCommentPostItemType[]>`
  - `use-get-post-status-ratio.ts` (GET /admin/posts/analyze/status-ratio) - Query: `AnalyzeStatDto` → `ResponseDto<PostStatusRatioItemType[]>`
  - `use-create-post.ts` (POST /admin/posts) - Body: `CreatePostDto` → `ResponseDto<SelectPostType>`
  - `use-update-post.ts` (PUT /admin/posts/:pstNo) - Path: `{ pstNo: number }` + Body: `UpdatePostDto` → `ResponseDto<SelectPostType>`
  - `use-multiple-update-post.ts` (PUT /admin/posts/multiple) - Body: `UpdatePostDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-post.ts` (DELETE /admin/posts/:pstNo) - Path: `{ pstNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-post.ts` (DELETE /admin/posts/multiple) - Body: `DeletePostDto` → `ResponseDto<MultipleResultType>`
  - `admin-posts.keys.ts`
  - `index.ts`

#### 3.5 Admin Tags 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/tags/admin-tags.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/tags/`
- **구현할 훅**:
  - `use-get-analyze-tag-data.ts` (GET /admin/tags/analyze/overview) - Query: `AnalyzeStatDto` + Query: `tagNo?: number` → `ResponseDto<AnalyzeTagStatItemType[]>`
  - `use-get-top-used-tags.ts` (GET /admin/tags/analyze/top-used) - Query: `AnalyzeStatDto` → `ResponseDto<TopUsedTagItemType[]>`
  - `use-get-tag-usage-trend.ts` (GET /admin/tags/analyze/usage-trend) - Query: `AnalyzeStatDto` → `ResponseDto<TagUsageTrendItemType[]>`
  - `use-get-unused-tags.ts` (GET /admin/tags/analyze/unused) - 없음 → `ResponseDto<UnusedTagItemType[]>`
  - `use-get-top-tags-by-subscriber.ts` (GET /admin/tags/analyze/top-subscribers) - Query: `limit: number` → `ResponseDto<TopTagsBySubscriberItemType[]>`
  - `use-get-tag-subscriber-growth.ts` (GET /admin/tags/analyze/subscriber-growth) - Query: `AnalyzeStatDto` → `ResponseDto<TagSubscriberGrowthRateItemType[]>`
  - `use-get-tags-without-subscribers.ts` (GET /admin/tags/analyze/no-subscribers) - 없음 → `ResponseDto<TagWithoutSubscribersItemType[]>`
  - `use-get-tag-usage-efficiency.ts` (GET /admin/tags/analyze/efficiency) - 없음 → `ResponseDto<TagUsageEfficiencyItemType[]>`
  - `use-get-tag-average-usage-frequency.ts` (GET /admin/tags/analyze/frequency) - Query: `AnalyzeStatDto` → `ResponseDto<TagAverageUsageFrequencyItemType[]>`
  - `use-get-tag-lifecycle-analysis.ts` (GET /admin/tags/analyze/lifecycle) - 없음 → `ResponseDto<TagLifecycleItemType[]>`
  - `use-get-tag-status-distribution.ts` (GET /admin/tags/analyze/status-distribution) - 없음 → `ResponseDto<TagStatusDistributionItemType[]>`
  - `use-get-tag-creator-stats.ts` (GET /admin/tags/analyze/creator-stats) - 없음 → `ResponseDto<TagCreatorStatItemType[]>`
  - `use-get-tag-cleanup-recommendations.ts` (GET /admin/tags/analyze/cleanup) - 없음 → `ResponseDto<TagCleanupRecommendationItemType[]>`
  - `use-create-tag.ts` (POST /admin/tags) - Body: `CreateTagDto` → `ResponseDto<SelectTagInfoType>`
  - `use-multiple-create-tag.ts` (POST /admin/tags/multiple) - Body: `CreateTagDto[]` → `ResponseDto<MultipleResultType>`
  - `use-update-tag.ts` (PUT /admin/tags) - Body: `UpdateTagDto` → `ResponseDto<SelectTagInfoType>`
  - `use-multiple-update-tag.ts` (PUT /admin/tags/multiple) - Body: `UpdateTagDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-tag.ts` (DELETE /admin/tags) - Body: `DeleteTagDto` → `ResponseDto<boolean>`
  - `use-multiple-delete-tag.ts` (DELETE /admin/tags/multiple) - Body: `DeleteTagDto` → `ResponseDto<MultipleResultType>`
  - `use-get-tag-mapping.ts` (GET /admin/tags/mapping/search) - Query: `SearchPstTagMpngDto` → `ResponseDto<ListType<SelectPstTagMpngListItemType>>`
  - `use-get-tag-mapping-by-tag-no.ts` (GET /admin/tags/mapping/:pstNo/:tagNo) - Path: `{ pstNo: number, tagNo: number }` → `ResponseDto<SelectPstTagMpngType>`
  - `use-add-tag-mapping.ts` (POST /admin/tags/mapping) - Body: `CreatePstTagMpngDto` → `ResponseDto<SelectPstTagMpngType>`
  - `use-multiple-add-tag-mapping.ts` (POST /admin/tags/mapping/multiple) - Body: `CreatePstTagMpngDto[]` → `ResponseDto<MultipleResultType>`
  - `use-delete-tag-mapping.ts` (DELETE /admin/tags/mapping) - Body: `DeletePstTagMpngDto` → `ResponseDto<boolean>`
  - `use-multiple-delete-tag-mapping.ts` (DELETE /admin/tags/mapping/multiple) - Body: `DeletePstTagMpngDto` → `ResponseDto<MultipleResultType>`
  - `admin-tags.keys.ts`
  - `index.ts`

#### 3.6 Admin Users 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/users/admin-users.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/users/`
- **구현할 훅**:
  - `use-get-analyze-user-data.ts` (GET /admin/users/analyze/overview) - Query: `AnalyzeStatDto` → `ResponseDto<AnalyzeUserStatItemType[]>`
  - `use-get-active-user-analysis.ts` (GET /admin/users/analyze/active-users) - Query: `AnalyzeStatDto` → `ResponseDto<ActiveUserAnalysisItemType[]>`
  - `use-get-top-users-by-contribution.ts` (GET /admin/users/analyze/top-contribution) - Query: `AnalyzeStatDto` → `ResponseDto<TopUsersByContributionItemType[]>`
  - `use-get-top-users-by-post-count.ts` (GET /admin/users/analyze/top-post-count) - Query: `AnalyzeStatDto` → `ResponseDto<TopUsersByPostCountItemType[]>`
  - `use-get-top-users-by-comment-count.ts` (GET /admin/users/analyze/top-comment-count) - Query: `AnalyzeStatDto` → `ResponseDto<TopUsersByCommentCountItemType[]>`
  - `use-get-user-role-distribution.ts` (GET /admin/users/analyze/role-distribution) - Query: `AnalyzeStatDto` → `ResponseDto<UserRoleDistributionItemType[]>`
  - `use-get-user-status-distribution.ts` (GET /admin/users/analyze/status-distribution) - Query: `AnalyzeStatDto` → `ResponseDto<UserStatusDistributionItemType[]>`
  - `use-get-inactive-users.ts` (GET /admin/users/analyze/inactive-users) - Query: `AnalyzeStatDto` → `ResponseDto<InactiveUsersListItemType[]>`
  - `use-get-user-growth-rate.ts` (GET /admin/users/analyze/growth-rate) - Query: `AnalyzeStatDto` → `ResponseDto<UserGrowthRateItemType[]>`
  - `use-get-user-retention-rate.ts` (GET /admin/users/analyze/retention-rate) - Query: `AnalyzeStatDto` → `ResponseDto<UserRetentionRateItemType[]>`
  - `use-get-user-list.ts` (GET /admin/users/search) - Query: `SearchUserDto` → `ResponseDto<ListType<SelectUserInfoListItemType>>`
  - `use-get-user-by-no.ts` (GET /admin/users/:userNo) - Path: `{ userNo: number }` → `ResponseDto<SelectUserInfoType>`
  - `use-get-user-by-name.ts` (GET /admin/users/name/:name) - Path: `{ name: string }` → `ResponseDto<SelectUserInfoType>`
  - `use-get-user-by-email.ts` (GET /admin/users/email/:email) - Path: `{ email: string }` → `ResponseDto<SelectUserInfoType>`
  - `use-create-user.ts` (POST /admin/users) - Body: `CreateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `use-signup-user.ts` (POST /admin/users/signup) - Body: `CreateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `use-update-user.ts` (PUT /admin/users/:userNo) - Path: `{ userNo: number }` + Body: `UpdateUserDto` → `ResponseDto<SelectUserInfoType>`
  - `use-multiple-update-user.ts` (PUT /admin/users/multiple) - Body: `UpdateUserDto` → `ResponseDto<MultipleResultType>`
  - `use-delete-user.ts` (DELETE /admin/users/:userNo) - Path: `{ userNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-user.ts` (DELETE /admin/users/multiple) - Body: `DeleteMultipleUsersDto` → `ResponseDto<MultipleResultType>`
  - `admin-users.keys.ts`
  - `index.ts`

#### 3.7 Admin Subscribe 엔티티

- **API 컨트롤러**: `apps/api/src/endpoints/admin/subscribe/admin-user-subscribe.controller.ts`
- **UI 엔티티**: `apps/ui/app/_entities/admin/subscribe/`
- **구현할 훅**:
  - `use-get-analyze-subscribe-data.ts` (GET /admin/subscribes/analyze/overview) - Query: `AnalyzeStatDto` → `ResponseDto<AnalyzeSubscribeStatItemType[]>`
  - `use-get-subscribe-notification-distribution.ts` (GET /admin/subscribes/analyze/notification-distribution) - 없음 → `ResponseDto<SubscribeNotificationDistributionItemType[]>`
  - `use-get-total-active-notification-users.ts` (GET /admin/subscribes/analyze/active-users) - Query: `AnalyzeStatDto` → `ResponseDto<TotalActiveNotificationUsersItemType[]>`
  - `use-get-total-inactive-notification-users.ts` (GET /admin/subscribes/analyze/inactive-users) - Query: `AnalyzeStatDto` → `ResponseDto<TotalInactiveNotificationUsersItemType[]>`
  - `use-get-user-subscribe-list.ts` (GET /admin/subscribes/search) - Query: `SearchSubscribeDto` → `ResponseDto<ListDto<UserSubscribeDto>>`
  - `use-get-user-subscribe-by-no.ts` (GET /admin/subscribes/:userNo) - Path: `{ userNo: number }` → `ResponseDto<UserSubscribeDto>`
  - `use-create-user-subscribe.ts` (POST /admin/subscribes) - Body: `CreateSubscribeDto` → `ResponseDto<UserSubscribeDto>`
  - `use-multiple-update-user-subscribe.ts` (PUT /admin/subscribes/multiple) - Body: `UpdateSubscribeDto` → `ResponseDto<any>`
  - `use-delete-user-subscribe.ts` (DELETE /admin/subscribes/:sbcrNo) - Path: `{ sbcrNo: number }` → `ResponseDto<boolean>`
  - `use-multiple-delete-user-subscribe.ts` (DELETE /admin/subscribes/multiple) - Body: `DeleteSubscribeDto` → `ResponseDto<MultipleResultType>`
  - `admin-subscribe.keys.ts`
  - `index.ts`

## 구현 패턴

### 1. 파일 구조

```
apps/ui/app/_entities/{entity}/
├── hooks/
│   ├── index.ts                    # 모든 훅 export
│   ├── use-{action}-{entity}.ts    # 개별 훅 파일들
│   └── ...
├── {entity}.keys.ts                # React Query 키 정의
└── {entity}.store.ts               # 상태 관리 (필요시)
```

### 2. 훅 네이밍 규칙

- **GET**: `use-get-{entity}-{action}.ts`
- **POST**: `use-create-{entity}.ts` 또는 `use-{action}-{entity}.ts`
- **PUT**: `use-update-{entity}.ts`
- **PATCH**: `use-patch-{entity}.ts`
- **DELETE**: `use-delete-{entity}.ts`

### 3. 훅 구현 템플릿

#### GET 훅 템플릿

```typescript
import { toast } from "sonner";

import type { QueryOptionType } from "@/_entities/common/common.types";
import { useGet } from "@/_entities/common/hooks";
import { getToastStyle } from "@/_libs";
import type { ResponseType } from "@/_types";

interface UseGetEntityOptions extends QueryOptionType<ResponseType> {}

/**
 * @description 엔티티 데이터를 조회하는 커스텀 훅
 * @param {UseGetEntityOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetEntity(options: UseGetEntityOptions = {}) {
  const query = useGet<ResponseType>({
    url: ["entity", "action"],
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle("error"),
      });
    },
    ...options,
  });

  return query;
}
```

#### POST 훅 템플릿

```typescript
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { MutationOptionsType } from "@/_entities/common/common.types";
import { usePost } from "@/_entities/common/hooks";
import { entityKeys } from "@/_entities/entity/entity.keys";
import { getToastStyle } from "@/_libs";
import type { CreateEntityType } from "@/_schemas";
import type { ResponseType } from "@/_types";

interface UseCreateEntityOptions
  extends MutationOptionsType<ResponseType, CreateEntityType> {}

/**
 * @description 새 엔티티를 생성하는 커스텀 훅
 * @param {UseCreateEntityOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useCreateEntity(options: UseCreateEntityOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<ResponseType, CreateEntityType>({
    url: ["entity"],
    callback() {
      toast.success("엔티티가 생성되었습니다.", {
        style: getToastStyle("success"),
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: entityKeys._def,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle("error"),
      });
    },
    ...options,
  });

  return mutation;
}
```

### 4. Keys 파일 템플릿

```typescript
import { createQueryKeys } from "@lukemorales/query-key-factory";

/**
 * 엔티티 관련 쿼리 키 정의
 */
export const entityKeys = createQueryKeys("entity", {
  // ===== GET Queries =====
  list: (searchData?: SearchEntityType) => ["entity", "search", searchData], // 엔티티 목록 조회
  byNo: (entityNo: number) => ["entity", "by-no", entityNo], // 엔티티 번호로 조회
  byName: (name: string) => ["entity", "by-name", name], // 엔티티명으로 조회

  // ===== POST Mutations =====
  create: () => ["entity", "create"], // 엔티티 생성

  // ===== PUT Mutations =====
  update: () => ["entity", "update"], // 엔티티 수정

  // ===== DELETE Mutations =====
  delete: () => ["entity", "delete"], // 엔티티 삭제
});
```

## 작업 체크리스트

### 1단계: 기본 엔티티 (5개)

- [x] Users 엔티티 hooks 구현 (6개 훅)
- [x] Categories 엔티티 hooks 구현 (3개 훅)
- [ ] Comments 엔티티 hooks 구현 (5개 훅)
- [ ] Posts 엔티티 hooks 구현 (12개 훅)
- [x] Tags 엔티티 hooks 구현 (3개 훅)

### 2단계: 인증 및 구독 엔티티 (3개)

- [ ] Auth 엔티티 hooks 구현 (5개 훅)
- [ ] Category Subscribe 엔티티 hooks 구현 (8개 훅)
- [ ] Tag Subscribe 엔티티 hooks 구현 (8개 훅)

### 3단계: 관리자 엔티티 (7개)

- [ ] Admin 엔티티 hooks 구현 (1개 훅)
- [ ] Admin Categories 엔티티 hooks 구현 (22개 훅)
- [ ] Admin Comments 엔티티 hooks 구현 (12개 훅)
- [ ] Admin Posts 엔티티 hooks 구현 (12개 훅)
- [ ] Admin Tags 엔티티 hooks 구현 (25개 훅)
- [ ] Admin Users 엔티티 hooks 구현 (20개 훅)
- [ ] Admin Subscribe 엔티티 hooks 구현 (10개 훅)

## 주의사항

1. **타입 일치**: API DTO와 UI 타입이 완전히 일치하는지 확인
2. **URL 경로**: API 엔드포인트 URL과 훅의 url 배열이 정확히 일치하는지 확인
3. **HTTP 메소드**: 각 훅이 올바른 HTTP 메소드를 사용하는지 확인
4. **에러 처리**: 일관된 에러 처리 및 토스트 메시지 적용
5. **캐싱 전략**: 적절한 staleTime과 gcTime 설정
6. **쿼리 무효화**: 데이터 변경 시 관련 쿼리들이 올바르게 무효화되는지 확인

## 완료 기준

- [ ] 모든 17개 컨트롤러의 엔드포인트에 대응하는 커스텀 훅 구현
- [ ] 총 108개 커스텀 훅 구현 완료 (1단계: 29개, 2단계: 21개, 3단계: 58개)
- [ ] 일관된 네이밍 규칙과 구조 적용
- [ ] 타입 안정성 보장 (TypeScript 컴파일 에러 없음)
- [ ] 에러 처리 및 사용자 피드백 구현
- [ ] React Query 키 관리 체계 구축
- [ ] 실제 API 호출 테스트 통과
- [ ] 기존 users 엔티티와 동일한 품질 수준 달성

## 훅 개수 요약

### 1단계: 기본 엔티티 (29개 훅)

- Users: 6개 훅
- Categories: 3개 훅
- Comments: 5개 훅
- Posts: 12개 훅
- Tags: 3개 훅

### 2단계: 인증 및 구독 엔티티 (21개 훅)

- Auth: 5개 훅
- Category Subscribe: 8개 훅
- Tag Subscribe: 8개 훅

### 3단계: 관리자 엔티티 (58개 훅)

- Admin: 1개 훅
- Admin Categories: 22개 훅
- Admin Comments: 12개 훅
- Admin Posts: 12개 훅
- Admin Tags: 25개 훅
- Admin Users: 20개 훅
- Admin Subscribe: 10개 훅

**총 108개 커스텀 훅 구현 예정**
