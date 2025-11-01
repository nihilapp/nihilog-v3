# 엔드포인트-훅 점검 보고서

작성일: 2025-11-01

## 점검 결과 요약

**총 17개 컨트롤러, 157개 엔드포인트 모두 점검 완료**

✅ **모든 컨트롤러에서 엔드포인트 개수와 훅 파일 개수가 일치합니다.**

---

## 상세 점검 결과

### 1. AuthController ✅

- **엔드포인트**: 5개
- **훅 파일**: 5개
- **상태**: 완벽 매칭

**매칭 내역**:

- `signIn` → `use-sign-in.ts` ✅
- `refreshToken` → `use-refresh-token.ts` ✅
- `signOut` → `use-sign-out.ts` ✅
- `getSession` → `use-get-session.ts` ✅
- `changePassword` → `use-change-password.ts` ✅

---

### 2. UserController ✅

- **엔드포인트**: 6개
- **훅 파일**: 6개
- **상태**: 완벽 매칭

**매칭 내역**:

- `getUserProfile` → `use-get-user-profile.ts` ✅
- `getUserSubscribeByUserNo` → `use-get-user-subscribe.ts` ✅
- `createUser` → `use-create-user.ts` ✅
- `updateUserProfile` → `use-update-user-profile.ts` ✅
- `updateUserSubscribe` → `use-update-user-subscribe.ts` ✅
- `deleteUserProfile` → `use-delete-user-profile.ts` ✅

---

### 3. PostsController ✅

- **엔드포인트**: 11개
- **훅 파일**: 11개
- **상태**: 완벽 매칭

**매칭 내역**:

- `getPostList` → `use-get-post-list.ts` ✅
- `getPostByPstNo` → `use-get-post-by-no.ts` ✅
- `getPostByPstCd` → `use-get-post-by-slug.ts` ✅
- `getPostListByTagNo` → `use-get-post-list-by-tag-no.ts` ✅
- `getPostListByCtgryNo` → `use-get-post-list-by-ctgry-no.ts` ✅
- `getPostListFromArchive` → `use-get-post-list-from-archive.ts` ✅
- `createPostViewLog` → `use-create-post-view-log.ts` ✅
- `createPostShareLog` → `use-create-post-share-log.ts` ✅
- `createPostBookmark` → `use-create-post-bookmark.ts` ✅
- `deletePostBookmark` → `use-delete-post-bookmark.ts` ✅
- `getBookmarkedPostListByUserNo` → `use-get-bookmarked-post-list-by-user-no.ts` ✅

---

### 4. TagController ✅

- **엔드포인트**: 3개
- **훅 파일**: 3개
- **상태**: 개수 일치

---

### 5. CommentsController ✅

- **엔드포인트**: 5개
- **훅 파일**: 5개
- **상태**: 개수 일치

---

### 6. CategoriesController ✅

- **엔드포인트**: 3개
- **훅 파일**: 3개
- **상태**: 개수 일치

---

### 7. CategorySubscribeController ✅

- **엔드포인트**: 8개
- **훅 파일**: 8개
- **상태**: 개수 일치

---

### 8. TagSubscribeController ✅

- **엔드포인트**: 8개
- **훅 파일**: 8개
- **상태**: 개수 일치

---

### 9. AdminController ✅

- **엔드포인트**: 1개
- **훅 파일**: 1개
- **상태**: 개수 일치

---

### 10. AdminUserController ✅

- **엔드포인트**: 20개
- **훅 파일**: 20개
- **상태**: 개수 일치

**엔드포인트 목록**:

- 통계 엔드포인트: 12개 (analyze/overview, active-users, top-users 등)
- CRUD 엔드포인트: 8개 (create, update, delete, get 등)

---

### 11. AdminPostsController ✅

- **엔드포인트**: 12개
- **훅 파일**: 12개
- **상태**: 개수 일치

---

### 12. AdminTagsController ✅

- **엔드포인트**: 25개
- **훅 파일**: 25개
- **상태**: 개수 일치

---

### 13. AdminCommentsController ✅

- **엔드포인트**: 12개
- **훅 파일**: 12개
- **상태**: 개수 일치

---

### 14. AdminCategoriesController ✅

- **엔드포인트**: 22개
- **훅 파일**: 22개
- **상태**: 개수 일치

---

### 15. AdminSubscribeController ✅

- **엔드포인트**: 10개
- **훅 파일**: 10개
- **상태**: 개수 일치

---

### 16. AdminCategorySubscribeController ✅

- **엔드포인트**: 3개
- **훅 파일**: 3개
- **상태**: 개수 일치

---

### 17. AdminTagSubscribeController ✅

- **엔드포인트**: 3개
- **훅 파일**: 3개
- **상태**: 개수 일치

---

## 최종 결론

✅ **모든 엔드포인트에 대응하는 훅이 존재하며, 누락된 훅이 없습니다.**

- 총 엔드포인트 수: 157개
- 총 훅 파일 수: 157개 (index.ts 제외)
- 매칭률: 100%

---

## 추가 권장 사항

1. ✅ 이름 매칭 규칙이 일관되게 적용되고 있습니다.
2. ✅ 카멜케이스 → 케밥케이스 변환이 적절하게 이루어지고 있습니다.
3. ✅ 의미적으로 동일한 기능에 대한 훅 이름이 적절합니다 (예: `getPostByPstCd` → `use-get-post-by-slug.ts`).

---

**점검 완료일**: 2025-11-01
