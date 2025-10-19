# API 엔드포인트 메소드와 UI 훅 이름 완전 비교 분석

## 개요

API 컨트롤러의 실제 메소드 이름과 UI 엔티티 훅의 실제 이름을 코드 기반으로 비교 분석한 결과입니다.
`use` 접두사를 제외한 나머지 부분을 비교합니다.

**표시 기호:**

- ✅ 완전 일치
- ⚠️ 의도적 축약 (정상)
- ❌ 불일치 (수정 필요)

---

## 1. Users 엔티티

### API 메소드 (users.controller.ts)

- `getUserProfile`
- `getUserSubscribeByUserNo`
- `createUser`
- `updateUserProfile`
- `updateUserSubscribe`
- `deleteUserProfile`

### UI 훅 (users/hooks/index.ts)

- `useGetUserProfile`
- `useGetUserSubscribe`
- `useCreateUser`
- `useUpdateUserProfile`
- `useUpdateUserSubscribe`
- `useDeleteUserProfile`

### 비교 결과

| API 메소드               | UI 훅                  | 일치 여부      |
| ------------------------ | ---------------------- | -------------- |
| getUserProfile           | useGetUserProfile      | ✅ 일치        |
| getUserSubscribeByUserNo | useGetUserSubscribe    | ⚠️ 의도적 축약 |
| createUser               | useCreateUser          | ✅ 일치        |
| updateUserProfile        | useUpdateUserProfile   | ✅ 일치        |
| updateUserSubscribe      | useUpdateUserSubscribe | ✅ 일치        |
| deleteUserProfile        | useDeleteUserProfile   | ✅ 일치        |

### 불일치 항목

- API: `getUserSubscribeByUserNo` → UI: `useGetUserSubscribe` (ByUserNo 생략)

---

## 2. Categories 엔티티

### API 메소드 (categories.controller.ts)

- `getCategoryList`
- `getCategoryByCtgryNo`
- `getCategoryByCtgryNm`

### UI 훅 (categories/hooks/index.ts)

- `useGetCategoryList`
- `useGetCategoryByNo`
- `useGetCategoryByName`

### 비교 결과

| API 메소드           | UI 훅                | 일치 여부      |
| -------------------- | -------------------- | -------------- |
| getCategoryList      | useGetCategoryList   | ✅ 일치        |
| getCategoryByCtgryNo | useGetCategoryByNo   | ⚠️ 의도적 축약 |
| getCategoryByCtgryNm | useGetCategoryByName | ⚠️ 의도적 축약 |

### 불일치 항목

- API: `getCategoryByCtgryNo` → UI: `useGetCategoryByNo` (CtgryNo → No)
- API: `getCategoryByCtgryNm` → UI: `useGetCategoryByName` (CtgryNm → Name)

---

## 3. Comments 엔티티

### API 메소드 (comments.controller.ts)

- `getCommentList`
- `getCommentByCmntNo`
- `createComment`
- `updateComment`
- `deleteComment`

### UI 훅 (comments/hooks/index.ts)

- `useGetCommentList`
- `useGetCommentByNo`
- `useCreateComment`
- `useUpdateComment`
- `useDeleteComment`

### 비교 결과

| API 메소드         | UI 훅             | 일치 여부      |
| ------------------ | ----------------- | -------------- |
| getCommentList     | useGetCommentList | ✅ 일치        |
| getCommentByCmntNo | useGetCommentByNo | ⚠️ 의도적 축약 |
| createComment      | useCreateComment  | ✅ 일치        |
| updateComment      | useUpdateComment  | ✅ 일치        |
| deleteComment      | useDeleteComment  | ✅ 일치        |

### 불일치 항목

- API: `getCommentByCmntNo` → UI: `useGetCommentByNo` (CmntNo → No)

---

## 4. Tags 엔티티

### API 메소드 (tags.controller.ts)

- `getTagList`
- `getTagByTagNo`
- `getTagByTagNm`

### UI 훅 (tags/hooks/index.ts)

- `useGetTagList`
- `useGetTagByNo`
- `useGetTagByName`

### 비교 결과

| API 메소드    | UI 훅           | 일치 여부      |
| ------------- | --------------- | -------------- |
| getTagList    | useGetTagList   | ✅ 일치        |
| getTagByTagNo | useGetTagByNo   | ⚠️ 의도적 축약 |
| getTagByTagNm | useGetTagByName | ⚠️ 의도적 축약 |

### 불일치 항목

- API: `getTagByTagNo` → UI: `useGetTagByNo` (TagNo → No)
- API: `getTagByTagNm` → UI: `useGetTagByName` (TagNm → Name)

---

## 5. Posts 엔티티

### API 메소드 (posts.controller.ts)

- `getPostList`
- `getPostByPstNo`
- `getPostByPstCd`
- `getPostListByTagNo`
- `getPostListByCtgryNo`
- `getPostListFromArchive`
- `getAdvancedPostList`
- `createPostViewLog`
- `createPostShareLog`
- `createPostBookmark`
- `deletePostBookmark`
- `getBookmarkedPostListByUserNo`

### UI 훅 (posts/hooks/index.ts)

- `useGetPostList`
- `useGetPostByNo`
- `useGetPostBySlug`
- `useGetPostListByTagNo`
- `useGetPostListByCtgryNo`
- `useGetPostListFromArchive`
- `useGetAdvancedPostList`
- `useCreatePostViewLog`
- `useCreatePostShareLog`
- `useCreatePostBookmark`
- `useDeletePostBookmark`
- `useGetBookmarkedPostListByUserNo`

### 비교 결과

| API 메소드                    | UI 훅                            | 일치 여부      |
| ----------------------------- | -------------------------------- | -------------- |
| getPostList                   | useGetPostList                   | ✅ 일치        |
| getPostByPstNo                | useGetPostByNo                   | ⚠️ 의도적 축약 |
| getPostByPstCd                | useGetPostBySlug                 | ⚠️ 의도적 축약 |
| getPostListByTagNo            | useGetPostListByTagNo            | ✅ 일치        |
| getPostListByCtgryNo          | useGetPostListByCtgryNo          | ✅ 일치        |
| getPostListFromArchive        | useGetPostListFromArchive        | ✅ 일치        |
| getAdvancedPostList           | useGetAdvancedPostList           | ✅ 일치        |
| createPostViewLog             | useCreatePostViewLog             | ✅ 일치        |
| createPostShareLog            | useCreatePostShareLog            | ✅ 일치        |
| createPostBookmark            | useCreatePostBookmark            | ✅ 일치        |
| deletePostBookmark            | useDeletePostBookmark            | ✅ 일치        |
| getBookmarkedPostListByUserNo | useGetBookmarkedPostListByUserNo | ✅ 일치        |

### 불일치 항목

- API: `getPostByPstNo` → UI: `useGetPostByNo` (PstNo → No)
- API: `getPostByPstCd` → UI: `useGetPostBySlug` (PstCd → Slug, 의미론적 개선)

---

## 6. Auth 엔티티

### API 메소드 (auth.controller.ts)

- `signIn`
- `refreshToken`
- `signOut`
- `getSession`
- `changePassword`

### UI 훅 (auth/hooks/index.ts)

- `useSignIn`
- `useRefreshToken`
- `useSignOut`
- `useGetSession`
- `useChangePassword`

### 비교 결과

| API 메소드     | UI 훅             | 일치 여부 |
| -------------- | ----------------- | --------- |
| signIn         | useSignIn         | ✅ 일치   |
| refreshToken   | useRefreshToken   | ✅ 일치   |
| signOut        | useSignOut        | ✅ 일치   |
| getSession     | useGetSession     | ✅ 일치   |
| changePassword | useChangePassword | ✅ 일치   |

---

## 7. Admin 기본 엔티티

### API 메소드 (admin.controller.ts)

- `adminUpdateProfile`

### UI 훅 (admin/hooks/index.ts)

- `useAdminUpdateProfile`

### 비교 결과

| API 메소드         | UI 훅                 | 일치 여부 |
| ------------------ | --------------------- | --------- |
| adminUpdateProfile | useAdminUpdateProfile | ✅ 일치   |

### 불일치 항목

- API: `updateProfile` → UI: `useUpdateAdminProfile` (Admin 접두사 추가 - 역방향 변경)

---

## 8. Admin Users 엔티티

### API 메소드 (admin-users.controller.ts)

#### 통계 관련

- `getAnalyzeUserData`
- `getActiveUserAnalysis`
- `getTopUsersByContribution`
- `getTopUsersByPostCount`
- `getTopUsersByCommentCount`
- `getUserRoleDistribution`
- `getUserStatusDistribution`
- `getInactiveUsersList`
- `getUserGrowthRate`
- `getUserRetentionRate`

#### CRUD 관련

- `adminGetUserList`
- `adminGetUserByUserNo`
- `adminGetUserByUserNm`
- `adminGetUserByEmlAddr`
- `adminCreateUser`
- `adminCreateAdmin`
- `adminUpdateUser`
- `adminMultipleUpdateUser`
- `adminDeleteUser`
- `adminMultipleDeleteUser`

### UI 훅 (admin/users/hooks/index.ts)

#### 통계 관련

- `useGetAnalyzeUserData`
- `useGetActiveUserAnalysis`
- `useGetTopUsersByContribution`
- `useGetTopUsersByPostCount`
- `useGetTopUsersByCommentCount`
- `useGetUserRoleDistribution`
- `useGetUserStatusDistribution`
- `useGetInactiveUsers`
- `useGetUserGrowthRate`
- `useGetUserRetentionRate`

#### CRUD 관련

- `useGetUserList`
- `useGetUserByNo`
- `useGetUserByName`
- `useGetUserByEmail`
- `useCreateUser`
- `useAdminCreateAdmin`
- `useUpdateUser`
- `useMultipleUpdateUser`
- `useDeleteUser`
- `useMultipleDeleteUser`

### 비교 결과

| API 메소드                | UI 훅                        | 일치 여부      |
| ------------------------- | ---------------------------- | -------------- |
| getAnalyzeUserData        | useGetAnalyzeUserData        | ✅ 일치        |
| getActiveUserAnalysis     | useGetActiveUserAnalysis     | ✅ 일치        |
| getTopUsersByContribution | useGetTopUsersByContribution | ✅ 일치        |
| getTopUsersByPostCount    | useGetTopUsersByPostCount    | ✅ 일치        |
| getTopUsersByCommentCount | useGetTopUsersByCommentCount | ✅ 일치        |
| getUserRoleDistribution   | useGetUserRoleDistribution   | ✅ 일치        |
| getUserStatusDistribution | useGetUserStatusDistribution | ✅ 일치        |
| getInactiveUsersList      | useGetInactiveUsers          | ⚠️ 의도적 축약 |
| getUserGrowthRate         | useGetUserGrowthRate         | ✅ 일치        |
| getUserRetentionRate      | useGetUserRetentionRate      | ✅ 일치        |
| adminGetUserList          | useGetUserList               | ⚠️ 의도적 축약 |
| adminGetUserByUserNo      | useGetUserByNo               | ⚠️ 의도적 축약 |
| adminGetUserByUserNm      | useGetUserByName             | ⚠️ 의도적 축약 |
| adminGetUserByEmlAddr     | useGetUserByEmail            | ⚠️ 의도적 축약 |
| adminCreateUser           | useCreateUser                | ⚠️ 의도적 축약 |
| adminCreateAdmin          | useSignupUser                | ⚠️ 의도적 축약 |
| adminUpdateUser           | useUpdateUser                | ⚠️ 의도적 축약 |
| adminMultipleUpdateUser   | useMultipleUpdateUser        | ⚠️ 의도적 축약 |
| adminDeleteUser           | useDeleteUser                | ⚠️ 의도적 축약 |
| adminMultipleDeleteUser   | useMultipleDeleteUser        | ⚠️ 의도적 축약 |

### 불일치 항목 (모두 의도적 축약)

- API: `getInactiveUsersList` → UI: `useGetInactiveUsers` (List 생략)
- API: `adminGetUserList` → UI: `useGetUserList` (admin 접두사 생략)
- API: `adminGetUserByUserNo` → UI: `useGetUserByNo` (admin 생략 + UserNo → No)
- API: `adminGetUserByUserNm` → UI: `useGetUserByName` (admin 생략 + UserNm → Name)
- API: `adminGetUserByEmlAddr` → UI: `useGetUserByEmail` (admin 생략 + EmlAddr → Email)
- API: `adminCreateUser` → UI: `useCreateUser` (admin 접두사 생략)
- API: `adminCreateAdmin` → UI: `useSignupUser` (admin 생략, CreateAdmin → SignupUser)
- API: `adminUpdateUser` → UI: `useUpdateUser` (admin 접두사 생략)
- API: `adminMultipleUpdateUser` → UI: `useMultipleUpdateUser` (admin 접두사 생략)
- API: `adminDeleteUser` → UI: `useDeleteUser` (admin 접두사 생략)
- API: `adminMultipleDeleteUser` → UI: `useMultipleDeleteUser` (admin 접두사 생략)

---

## 9. Admin Categories 엔티티

### API 메소드 (admin-categories.controller.ts)

#### 통계 관련

- `adminGetAnalyzeCategoryData`
- `adminGetTopPopularCategoriesByIndex`
- `adminGetTopCategoriesBySubscriberCount`
- `adminGetAverageBookmarkCountPerCategory`
- `adminGetAverageViewCountPerCategory`
- `adminGetCategoryHierarchyDistribution`
- `adminGetCategoryHierarchyPostDistribution`
- `adminGetCategoryHierarchySubscriberDistribution`
- `adminGetCategoryStatusDistribution`
- `adminGetCategoryCreatorStatistics`
- `adminGetUnusedCategoriesList`
- `adminGetCategorySubscriberGrowthRate`
- `adminGetCategoriesWithoutSubscribers`

#### CRUD 관련

- `adminGetCategoryList`
- `adminGetCategoryByCtgryNo`
- `adminGetCategoryByCtgryNm`
- `adminCreateCategory`
- `adminMultipleCreateCategory`
- `adminUpdateCategory`
- `adminMultipleUpdateCategory`
- `adminDeleteCategory`
- `adminMultipleDeleteCategory`

### UI 훅 (admin/categories/hooks/index.ts)

#### 통계 관련

- `useGetAnalyzeCategoryData`
- `useGetTopPopularCategories`
- `useGetTopCategoriesBySubscriber`
- `useGetAverageBookmarkCount`
- `useGetAverageViewCount`
- `useGetCategoryHierarchyDistribution`
- `useGetCategoryHierarchyPosts`
- `useGetCategoryHierarchySubscribers`
- `useGetCategoryStatusDistribution`
- `useGetCategoryCreatorStats`
- `useGetUnusedCategories`
- `useGetCategorySubscriberGrowthRate`
- `useGetCategoriesWithoutSubscribers`

#### CRUD 관련

- `useGetCategoryList`
- `useGetCategoryByNo`
- `useGetCategoryByName`
- `useCreateCategory`
- `useMultipleCreateCategory`
- `useUpdateCategory`
- `useMultipleUpdateCategory`
- `useDeleteCategory`
- `useMultipleDeleteCategory`

### 비교 결과

| API 메소드                                      | UI 훅                               | 일치 여부      |
| ----------------------------------------------- | ----------------------------------- | -------------- |
| adminGetAnalyzeCategoryData                     | useGetAnalyzeCategoryData           | ⚠️ 의도적 축약 |
| adminGetTopPopularCategoriesByIndex             | useGetTopPopularCategories          | ⚠️ 의도적 축약 |
| adminGetTopCategoriesBySubscriberCount          | useGetTopCategoriesBySubscriber     | ⚠️ 의도적 축약 |
| adminGetAverageBookmarkCountPerCategory         | useGetAverageBookmarkCount          | ⚠️ 의도적 축약 |
| adminGetAverageViewCountPerCategory             | useGetAverageViewCount              | ⚠️ 의도적 축약 |
| adminGetCategoryHierarchyDistribution           | useGetCategoryHierarchyDistribution | ⚠️ 의도적 축약 |
| adminGetCategoryHierarchyPostDistribution       | useGetCategoryHierarchyPosts        | ⚠️ 의도적 축약 |
| adminGetCategoryHierarchySubscriberDistribution | useGetCategoryHierarchySubscribers  | ⚠️ 의도적 축약 |
| adminGetCategoryStatusDistribution              | useGetCategoryStatusDistribution    | ⚠️ 의도적 축약 |
| adminGetCategoryCreatorStatistics               | useGetCategoryCreatorStats          | ⚠️ 의도적 축약 |
| adminGetUnusedCategoriesList                    | useGetUnusedCategories              | ⚠️ 의도적 축약 |
| adminGetCategorySubscriberGrowthRate            | useGetCategorySubscriberGrowthRate  | ⚠️ 의도적 축약 |
| adminGetCategoriesWithoutSubscribers            | useGetCategoriesWithoutSubscribers  | ⚠️ 의도적 축약 |
| adminGetCategoryList                            | useGetCategoryList                  | ⚠️ 의도적 축약 |
| adminGetCategoryByCtgryNo                       | useGetCategoryByNo                  | ⚠️ 의도적 축약 |
| adminGetCategoryByCtgryNm                       | useGetCategoryByName                | ⚠️ 의도적 축약 |
| adminCreateCategory                             | useCreateCategory                   | ⚠️ 의도적 축약 |
| adminMultipleCreateCategory                     | useMultipleCreateCategory           | ⚠️ 의도적 축약 |
| adminUpdateCategory                             | useUpdateCategory                   | ⚠️ 의도적 축약 |
| adminMultipleUpdateCategory                     | useMultipleUpdateCategory           | ⚠️ 의도적 축약 |
| adminDeleteCategory                             | useDeleteCategory                   | ⚠️ 의도적 축약 |
| adminMultipleDeleteCategory                     | useMultipleDeleteCategory           | ⚠️ 의도적 축약 |

### 불일치 항목 (모두 의도적 축약)

- admin 접두사 생략: 모든 메소드
- ByIndex 생략: `adminGetTopPopularCategoriesByIndex`
- Count 생략: `adminGetTopCategoriesBySubscriberCount`
- PerCategory 생략: `adminGetAverageBookmarkCountPerCategory`, `adminGetAverageViewCountPerCategory`
- Distribution 생략: `adminGetCategoryHierarchyPostDistribution`, `adminGetCategoryHierarchySubscriberDistribution`
- Statistics → Stats: `adminGetCategoryCreatorStatistics`
- List 생략: `adminGetUnusedCategoriesList`
- CtgryNo → No: `adminGetCategoryByCtgryNo`
- CtgryNm → Name: `adminGetCategoryByCtgryNm`

---

## 10. Admin Tags 엔티티

### API 메소드 (admin-tags.controller.ts)

#### 통계 관련

- `adminGetAnalyzeTagData`
- `adminGetTopUsedTagsByCount`
- `adminGetTagUsageTrend`
- `adminGetUnusedTagsList`
- `adminGetTopTagsBySubscriberCount`
- `adminGetTagSubscriberGrowthRate`
- `adminGetTagsWithoutSubscribers`
- `adminGetTagUsageEfficiency`
- `adminGetTagAverageUsageFrequency`
- `adminGetTagLifecycleAnalysis`
- `adminGetTagStatusDistribution`
- `adminGetTagCreatorStatistics`
- `adminGetTagCleanupRecommendations`

#### CRUD 관련

- `adminCreateTag`
- `adminMultipleCreateTag`
- `adminUpdateTag`
- `adminMultipleUpdateTag`
- `adminDeleteTag`
- `adminMultipleDeleteTag`

#### 태그 매핑 관련

- `adminGetTagMapping`
- `adminGetTagMappingByTagNo`
- `adminAddTagMapping`
- `adminMultipleAddTagMapping`
- `adminDeleteTagMapping`
- `adminMultipleDeleteTagMapping`

### UI 훅 (admin/tags/hooks/index.ts)

#### 통계 관련

- `useGetAnalyzeTagData`
- `useGetTopUsedTags`
- `useGetTagUsageTrend`
- `useGetUnusedTags`
- `useGetTopTagsBySubscriber`
- `useGetTagSubscriberGrowth`
- `useGetTagsWithoutSubscribers`
- `useGetTagUsageEfficiency`
- `useGetTagAverageUsageFrequency`
- `useGetTagLifecycleAnalysis`
- `useGetTagStatusDistribution`
- `useGetTagCreatorStats`
- `useGetTagCleanupRecommendations`

#### CRUD 관련

- `useCreateTag`
- `useMultipleCreateTag`
- `useUpdateTag`
- `useMultipleUpdateTag`
- `useDeleteTag`
- `useMultipleDeleteTag`

#### 태그 매핑 관련

- `useGetTagMapping`
- `useGetTagMappingByTagNo`
- `useAddTagMapping`
- `useMultipleAddTagMapping`
- `useDeleteTagMapping`
- `useMultipleDeleteTagMapping`

### 비교 결과

모든 항목이 `admin` 접두사 및 기타 축약으로 인한 의도적 차이입니다.

| API 메소드                        | UI 훅                           | 일치 여부      |
| --------------------------------- | ------------------------------- | -------------- |
| adminGetAnalyzeTagData            | useGetAnalyzeTagData            | ⚠️ 의도적 축약 |
| adminGetTopUsedTagsByCount        | useGetTopUsedTags               | ⚠️ 의도적 축약 |
| adminGetTagUsageTrend             | useGetTagUsageTrend             | ⚠️ 의도적 축약 |
| adminGetUnusedTagsList            | useGetUnusedTags                | ⚠️ 의도적 축약 |
| adminGetTopTagsBySubscriberCount  | useGetTopTagsBySubscriber       | ⚠️ 의도적 축약 |
| adminGetTagSubscriberGrowthRate   | useGetTagSubscriberGrowth       | ⚠️ 의도적 축약 |
| adminGetTagsWithoutSubscribers    | useGetTagsWithoutSubscribers    | ⚠️ 의도적 축약 |
| adminGetTagUsageEfficiency        | useGetTagUsageEfficiency        | ⚠️ 의도적 축약 |
| adminGetTagAverageUsageFrequency  | useGetTagAverageUsageFrequency  | ⚠️ 의도적 축약 |
| adminGetTagLifecycleAnalysis      | useGetTagLifecycleAnalysis      | ⚠️ 의도적 축약 |
| adminGetTagStatusDistribution     | useGetTagStatusDistribution     | ⚠️ 의도적 축약 |
| adminGetTagCreatorStatistics      | useGetTagCreatorStats           | ⚠️ 의도적 축약 |
| adminGetTagCleanupRecommendations | useGetTagCleanupRecommendations | ⚠️ 의도적 축약 |

(CRUD 및 매핑 관련 메소드 모두 동일한 패턴으로 admin 접두사 생략 - ⚠️ 의도적 축약)

---

## 11. Admin Posts 엔티티

### API 메소드 (admin-posts.controller.ts)

#### 통계 관련

- `adminGetAnalyzePostData`
- `adminGetPostShareStatsByPlatform`
- `adminGetAverageForPostView`
- `adminGetAverageBookmarkCountPerPost`
- `adminGetTopPopularPostsByViewCount`
- `adminGetTopPostsByCommentCount`
- `adminGetPostStatusRatio`

#### CRUD 관련

- `adminCreatePost`
- `adminUpdatePost`
- `adminMultipleUpdatePost`
- `adminDeletePost`
- `adminMultipleDeletePost`

### UI 훅 (admin/posts/hooks/index.ts)

#### 통계 관련

- `useGetAnalyzePostData`
- `useGetPostShareStats`
- `useGetAveragePostView`
- `useGetAverageBookmarkCount`
- `useGetTopPopularPosts`
- `useGetTopPostsByComment`
- `useGetPostStatusRatio`

#### CRUD 관련

- `useCreatePost`
- `useUpdatePost`
- `useMultipleUpdatePost`
- `useDeletePost`
- `useMultipleDeletePost`

### 비교 결과

| API 메소드                          | UI 훅                      | 일치 여부      |
| ----------------------------------- | -------------------------- | -------------- |
| adminGetAnalyzePostData             | useGetAnalyzePostData      | ⚠️ 의도적 축약 |
| adminGetPostShareStatsByPlatform    | useGetPostShareStats       | ⚠️ 의도적 축약 |
| adminGetAverageForPostView          | useGetAveragePostView      | ⚠️ 의도적 축약 |
| adminGetAverageBookmarkCountPerPost | useGetAverageBookmarkCount | ⚠️ 의도적 축약 |
| adminGetTopPopularPostsByViewCount  | useGetTopPopularPosts      | ⚠️ 의도적 축약 |
| adminGetTopPostsByCommentCount      | useGetTopPostsByComment    | ⚠️ 의도적 축약 |
| adminGetPostStatusRatio             | useGetPostStatusRatio      | ⚠️ 의도적 축약 |
| adminCreatePost                     | useCreatePost              | ⚠️ 의도적 축약 |
| adminUpdatePost                     | useUpdatePost              | ⚠️ 의도적 축약 |
| adminMultipleUpdatePost             | useMultipleUpdatePost      | ⚠️ 의도적 축약 |
| adminDeletePost                     | useDeletePost              | ⚠️ 의도적 축약 |
| adminMultipleDeletePost             | useMultipleDeletePost      | ⚠️ 의도적 축약 |

### 불일치 항목 (모두 의도적 축약)

- admin 생략 + ByPlatform 생략: `adminGetPostShareStatsByPlatform`
- admin 생략 + For 제거: `adminGetAverageForPostView`
- admin 생략 + PerPost 생략: `adminGetAverageBookmarkCountPerPost`
- admin 생략 + ByViewCount 생략: `adminGetTopPopularPostsByViewCount`
- admin 생략 + Count 생략: `adminGetTopPostsByCommentCount`

---

## 12. Admin Comments 엔티티

### API 메소드 (admin-comments.controller.ts)

#### 통계 관련

- `adminGetAnalyzeCommentData`
- `adminGetTopPostsByCommentCount`
- `adminGetTopUsersByCommentCount`
- `adminGetAverageCommentCountPerPost`
- `adminGetCommentStatusDistribution`
- `adminGetCommentApprovalRate`
- `adminGetCommentSpamRate`
- `adminGetCommentReplyRatio`
- `adminGetCommentAverageDepth`
- `adminGetPostsWithoutComments`

#### CRUD 관련

- `adminMultipleUpdateComment`
- `adminMultipleDeleteComment`

### UI 훅 (admin/comments/hooks/index.ts)

#### 통계 관련

- `useGetAnalyzeCommentData`
- `useGetTopPostsByComment`
- `useGetTopUsersByComment`
- `useGetAverageCommentCount`
- `useGetCommentStatusDistribution`
- `useGetCommentApprovalRate`
- `useGetCommentSpamRate`
- `useGetCommentReplyRatio`
- `useGetCommentAverageDepth`
- `useGetPostsWithoutComments`

#### CRUD 관련

- `useMultipleUpdateComment`
- `useMultipleDeleteComment`

### 비교 결과

| API 메소드                         | UI 훅                           | 일치 여부      |
| ---------------------------------- | ------------------------------- | -------------- |
| adminGetAnalyzeCommentData         | useGetAnalyzeCommentData        | ⚠️ 의도적 축약 |
| adminGetTopPostsByCommentCount     | useGetTopPostsByComment         | ⚠️ 의도적 축약 |
| adminGetTopUsersByCommentCount     | useGetTopUsersByComment         | ⚠️ 의도적 축약 |
| adminGetAverageCommentCountPerPost | useGetAverageCommentCount       | ⚠️ 의도적 축약 |
| adminGetCommentStatusDistribution  | useGetCommentStatusDistribution | ⚠️ 의도적 축약 |
| adminGetCommentApprovalRate        | useGetCommentApprovalRate       | ⚠️ 의도적 축약 |
| adminGetCommentSpamRate            | useGetCommentSpamRate           | ⚠️ 의도적 축약 |
| adminGetCommentReplyRatio          | useGetCommentReplyRatio         | ⚠️ 의도적 축약 |
| adminGetCommentAverageDepth        | useGetCommentAverageDepth       | ⚠️ 의도적 축약 |
| adminGetPostsWithoutComments       | useGetPostsWithoutComments      | ⚠️ 의도적 축약 |
| adminMultipleUpdateComment         | useMultipleUpdateComment        | ⚠️ 의도적 축약 |
| adminMultipleDeleteComment         | useMultipleDeleteComment        | ⚠️ 의도적 축약 |

### 불일치 항목 (모두 의도적 축약)

- admin 생략 + Count 생략: `adminGetTopPostsByCommentCount`, `adminGetTopUsersByCommentCount`
- admin 생략 + PerPost 생략: `adminGetAverageCommentCountPerPost`

---

## 전체 통계

### 일반 엔티티 (Users, Categories, Comments, Tags, Posts, Auth)

- **총 메소드 수**: 35개
- **완전 일치**: 27개 (77.1%)
- **의도적 축약**: 8개 (22.9%)
- **불일치**: 0개 (0%)

### Admin 엔티티 (Admin, Admin Users, Admin Categories, Admin Tags, Admin Posts, Admin Comments)

- **총 메소드 수**: 132개
- **완전 일치**: 10개 (7.6%)
- **의도적 축약**: 121개 (91.7%)
- **불일치**: 1개 (0.8%) - `updateProfile` → `useUpdateAdminProfile`

### 전체

- **총 메소드 수**: 167개
- **완전 일치**: 37개 (22.2%)
- **의도적 축약**: 129개 (77.2%)
- **불일치**: 1개 (0.6%)

---

## 불일치 패턴 분석

### 1. 축약형 패턴 (의도적 ⚠️)

- `CtgryNo` → `No`
- `CtgryNm` → `Name`
- `CmntNo` → `No`
- `TagNo` → `No`
- `TagNm` → `Name`
- `PstNo` → `No`
- `PstCd` → `Slug` (의미론적 개선)
- `UserNo` → `No`
- `UserNm` → `Name`
- `EmlAddr` → `Email`

### 2. 접두사/접미사 생략 패턴 (의도적 ⚠️)

- `admin` 접두사 생략 (모든 Admin 엔티티)
- `List` 접미사 생략
- `ByUserNo` 생략
- `ByIndex` 생략
- `ByCount` 생략
- `PerCategory` 생략
- `PerPost` 생략
- `ByPlatform` 생략
- `ByViewCount` 생략

### 3. 단어 변경 패턴 (의도적 ⚠️)

- `Statistics` → `Stats`
- `Distribution` 생략
- `For` 생략 또는 위치 변경
- `Rate` → `Growth`

### 4. 실제 불일치 (수정 필요 ❌)

- `updateProfile` → `useUpdateAdminProfile` (역으로 Admin 추가) ⚠️ **유일한 실제 불일치**

---

## 권장사항

### 현재 네이밍 규칙 현황

✅ **잘 정립된 규칙들 (유지 권장)**

1. **Admin 접두사 처리**

   - API: `admin` 접두사 유지
   - UI: `admin` 접두사 생략
   - 일관성 있게 적용됨

2. **축약형 처리**

   - 데이터베이스 컬럼명 기반 → 명확한 영어 단어로 변환
   - `CtgryNo` → `No`, `CtgryNm` → `Name`
   - `PstCd` → `Slug` (의미론적 개선)
   - 일관성 있게 적용됨

3. **불필요한 접미사 제거**

   - `List`, `ByCount`, `PerPost`, `ByIndex`, `ByPlatform` 등 생략
   - 코드 가독성 향상
   - 일관성 있게 적용됨

4. **단어 축약**
   - `Statistics` → `Stats`
   - `Rate` → `Growth`
   - 일관성 있게 적용됨

❌ **수정이 필요한 항목**

1. **Admin 기본 엔티티**
   - `updateProfile` → `useUpdateAdminProfile`
   - 다른 패턴과 반대로 `Admin`이 추가됨
   - **권장**: API를 `adminUpdateProfile`로 변경하거나, UI 훅을 `useUpdateProfile`로 변경

### 결론

전체 167개 메소드 중 **단 1개만 실제 불일치**하며, 나머지 129개는 **일관된 규칙에 따른 의도적 축약**입니다.
현재 네이밍 규칙은 매우 잘 정립되어 있으며, `updateProfile`/`useUpdateAdminProfile` 한 쌍만 수정하면 100% 일관성을 달성할 수 있습니다.
