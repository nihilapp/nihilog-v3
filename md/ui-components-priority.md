# UI 컴포넌트 개발 우선순위

## 요약

이 문서는 API 엔드포인트를 기반으로 UI에 필요한 컴포넌트를 분석하고 우선순위를 정리한 것입니다. 총 17개의 API 엔드포인트 그룹에 대해 필요한 컴포넌트를 식별하고, 개발 우선순위를 제시합니다.

### 현재 개발 현황 (2024년 기준)

- **전체 진행률**: 약 40% (20/50 필수 컴포넌트)
- **관리자 기능**: 60% 완료 (포스트, 카테고리, 태그 관리 중심)
- **사용자 기능**: 0% 완료 (모든 사용자용 컴포넌트 및 페이지 미구현)
- **핵심 기능**: 0% 완료 (포스트 목록/상세, 댓글, 프로필 등 미구현)
- **페이지 구현률**: 관리자 페이지 7개 완료, 사용자 페이지 0개 완료

### 주요 발견사항

1. **관리자 기능 우선 개발**: 관리자용 포스트, 카테고리, 태그 관리 컴포넌트 및 페이지가 대부분 완료됨
2. **사용자 경험 기능 전무**: 블로그의 핵심 기능인 포스트 목록/상세, 댓글 시스템이 전혀 구현되지 않음 (페이지 라우트 자체가 없음)
3. **인증 기능 불완전**: 로그인, 구독 페이지는 있으나 비밀번호 변경, 로그아웃 등 추가 기능 없음
4. **구독 기능 미구현**: 카테고리/태그 구독 관련 컴포넌트 및 페이지 전무
5. **페이지-컴포넌트 불일치**: 일부 관리자 페이지는 라우트는 있으나 내용이 미구현 상태 (대시보드, 카테고리 상세)

## 현재 존재하는 페이지 및 컴포넌트

### 페이지 구조

#### 공통 페이지

- `/` - 홈 페이지 ✅ (`(common)/page.tsx`)

#### 인증 페이지

- `/auth/signin` - 로그인 페이지 ✅ (`(auth)/auth/signin/page.tsx`)
- `/auth/subscribe` - 구독 페이지 ✅ (`(auth)/auth/subscribe/page.tsx`)
- `/auth/admin/signup` - 관리자 회원가입 페이지 ✅ (`(auth)/auth/admin/signup/page.tsx`)

#### 관리자 페이지

- `/admin/dashboard` - 관리자 대시보드 ✅ (`(admin)/admin/dashboard/page.tsx` - 내용 미구현)
- `/admin/dashboard/posts` - 포스트 목록 ✅ (`(admin)/admin/dashboard/posts/page.tsx`)
- `/admin/dashboard/posts/[postNo]` - 포스트 상세 ✅ (`(admin)/admin/dashboard/posts/[postNo]/page.tsx`)
- `/admin/dashboard/categories` - 카테고리 목록 ✅ (`(admin)/admin/dashboard/categories/page.tsx`)
- `/admin/dashboard/categories/[categoryNo]` - 카테고리 상세 ✅ (`(admin)/admin/dashboard/categories/[categoryNo]/page.tsx` - 내용 미구현)
- `/admin/dashboard/tags` - 태그 목록 ✅ (`(admin)/admin/dashboard/tags/page.tsx`)
- `/admin/posts/editor` - 포스트 편집기 ✅ (`(admin-posts)/admin/posts/editor/page.tsx`)

#### 사용자 페이지

- `/posts` - 포스트 목록 ❌ (라우트 없음)
- `/posts/[slug]` - 포스트 상세 ❌ (라우트 없음)
- `/categories` - 카테고리 목록 ❌ (라우트 없음)
- `/categories/[id]` - 카테고리 상세 ❌ (라우트 없음)
- `/tags` - 태그 목록/클라우드 ❌ (라우트 없음)
- `/tags/[id]` - 태그 상세 ❌ (라우트 없음)
- `/profile` - 프로필 조회 ❌ (라우트 없음)
- `/profile/edit` - 프로필 수정 ❌ (라우트 없음)

### 컴포넌트

### 인증 관련

- `auth/SignInForm.tsx` - 로그인 폼 ✅
- `auth/SubscribeForm.tsx` - 구독 폼 ✅
- `auth/AdminSignUpForm.tsx` - 관리자 회원가입 폼 ✅

### 관리자 관련

#### 포스트 관리

- `admin/posts/AdminPostList.tsx` - 관리자 포스트 목록 ✅
- `admin/posts/AdminPostDetail.tsx` - 관리자 포스트 상세 ✅
- `admin/posts/PostEditor.tsx` - 포스트 편집기 (생성/수정) ✅
- `admin/posts/PostEditorMain.tsx` - 포스트 편집기 메인 영역 ✅
- `admin/posts/PostEditorSidebar.tsx` - 포스트 편집기 사이드바 ✅
- `admin/posts/EditorForm.tsx` - 포스트 편집 폼 ✅
- `admin/posts/PostCategorySelect.tsx` - 포스트 카테고리 선택 ✅
- `admin/posts/PostStatusBadges.tsx` - 포스트 상태 배지 ✅
- `admin/posts/BlockNoteEditor.tsx` - 블록 노트 에디터 ✅
- `admin/posts/BlockNoteEditorDynamic.tsx` - 블록 노트 에디터 (동적) ✅

#### 카테고리 관리

- `admin/categories/AdminCategoryList.tsx` - 관리자 카테고리 목록 ✅
- `admin/categories/AdminCategoryDetail.tsx` - 관리자 카테고리 상세 ✅
- `admin/categories/NewCategoryForm.tsx` - 카테고리 생성 폼 ✅
- `admin/categories/UpdateCategoryForm.tsx` - 카테고리 수정 폼 ✅
- `admin/categories/AddChildCategoryForm.tsx` - 하위 카테고리 추가 폼 ✅
- `admin/categories/CategoryItem.tsx` - 카테고리 아이템 ✅
- `admin/categories/CategoryParentSelect.tsx` - 카테고리 부모 선택 ✅

#### 태그 관리

- `admin/tags/AdminTagList.tsx` - 관리자 태그 목록 ✅
- `admin/tags/NewTagForm.tsx` - 태그 생성 폼 ✅
- `admin/tags/UpdateTagForm.tsx` - 태그 수정 폼 ✅

### 공통 컴포넌트

- `common/AsyncBoundary.tsx` - 비동기 경계 처리 ✅
- `common/Done.tsx` - 완료 상태 표시 ✅
- `common/Loading.tsx` - 로딩 상태 표시 ✅
- `common/Logo.tsx` - 로고 컴포넌트 ✅
- `common/home/Home.tsx` - 홈 컴포넌트 ✅
- `common/not-found/NotFound.tsx` - 404 페이지 ✅
- `common/AlertModal.tsx` - 알림 모달 ✅
- `common/ConfirmModal.tsx` - 확인 모달 ✅
- `common/GlobalModals.tsx` - 전역 모달 관리 ✅

### UI 기본 컴포넌트

- `ui/box/*` - 박스 관련 컴포넌트들 ✅
- `ui/button/*` - 버튼 관련 컴포넌트들 ✅
- `ui/form/*` - 폼 관련 컴포넌트들 ✅
- `ui/frame/*` - 프레임 레이아웃 컴포넌트들 ✅
- `ui/input/*` - 입력 관련 컴포넌트들 ✅
- `ui/list/*` - 리스트 관련 컴포넌트들 ✅
- `ui/modal/*` - 모달 관련 컴포넌트들 ✅
- `ui/tab/*` - 탭 관련 컴포넌트들 ✅
- `ui/badge/*` - 배지 관련 컴포넌트들 ✅

## 개발 진행 현황

### 전체 통계

- **총 필수 컴포넌트**: 약 50개
- **완료된 컴포넌트**: 약 20개 (40%)
- **미완료 컴포넌트**: 약 30개 (60%)

### 우선순위별 진행률

- **우선순위 매우 높음**: 0% (0/3)
- **우선순위 높음**: 0% (0/7)
- **우선순위 중간**: 0% (0/8)
- **우선순위 낮음**: 60% (12/20) - 관리자 컴포넌트 중심

### 주요 발견사항

1. **관리자 기능이 우선 개발됨**: 관리자용 포스트, 카테고리, 태그 관리 컴포넌트가 대부분 완료됨
2. **사용자용 컴포넌트 부재**: 포스트 목록/상세, 댓글, 프로필 등 사용자용 컴포넌트가 거의 없음
3. **인증 기능 불완전**: 로그인은 있으나 비밀번호 변경, 로그아웃 기능 없음
4. **구독 기능 미구현**: 카테고리/태그 구독 관련 컴포넌트 전무

## 필요한 컴포넌트 목록

### 1. 인증 (auth) - 우선순위: 높음

#### 필수 컴포넌트

- `auth/ChangePasswordForm.tsx` - 비밀번호 변경 폼 ❌

  - 엔드포인트: `PUT /auth/password`
  - 설명: 현재 로그인된 사용자의 비밀번호를 변경하는 폼
  - 상태: 미구현

- `auth/SignOutButton.tsx` - 로그아웃 버튼 ❌
  - 엔드포인트: `POST /auth/signout`
  - 설명: 로그아웃을 처리하는 버튼 컴포넌트
  - 상태: 미구현

#### 선택적 컴포넌트

- `auth/SessionInfo.tsx` - 세션 정보 표시 ❌
  - 엔드포인트: `GET /auth/session`
  - 설명: 현재 세션 정보를 표시하는 컴포넌트 (디버깅용)
  - 상태: 미구현

### 2. 사용자 (users) - 우선순위: 높음

#### 필수 컴포넌트

- `users/UserProfile.tsx` - 프로필 조회 ❌

  - 엔드포인트: `GET /users/profile`
  - 설명: 현재 로그인한 사용자의 프로필 정보를 표시
  - 상태: 미구현 (훅만 존재: `useGetUserProfile`)
  - 페이지: `/profile` 라우트 없음 (CommonLayout에 메뉴는 존재)

- `users/UserProfileEdit.tsx` - 프로필 수정 ❌

  - 엔드포인트: `PUT /users/profile`
  - 설명: 프로필 정보를 수정하는 폼
  - 상태: 미구현 (훅만 존재: `useUpdateUserProfile`)
  - 페이지: `/profile/edit` 라우트 없음

- `users/UserProfileDelete.tsx` - 프로필 삭제 ❌

  - 엔드포인트: `DELETE /users/profile`
  - 설명: 계정 삭제를 처리하는 컴포넌트
  - 상태: 미구현 (훅만 존재: `useDeleteUserProfile`)
  - 페이지: 프로필 페이지 내부 기능으로 구현 예정

- `users/UserSubscribeSettings.tsx` - 구독 설정 ❌
  - 엔드포인트: `GET /users/subscribe`, `PUT /users/subscribe`
  - 설명: 이메일 알림 및 구독 설정을 조회하고 변경하는 컴포넌트
  - 상태: 미구현
  - 페이지: 프로필 페이지 내부 기능으로 구현 예정

#### 선택적 컴포넌트

- `users/UserCreateForm.tsx` - 사용자 계정 생성 ❌
  - 엔드포인트: `POST /users`
  - 설명: 새로운 사용자 계정을 생성하는 폼 (회원가입)
  - 상태: 미구현

### 3. 카테고리 (categories) - 우선순위: 중간

#### 필수 컴포넌트

- `categories/CategoryList.tsx` - 카테고리 목록 ❌

  - 엔드포인트: `GET /categories`
  - 설명: 전체 카테고리 목록을 표시 (계층 구조, 포스트 수 포함)
  - 상태: 미구현
  - 페이지: `/categories` 라우트 없음

- `categories/CategoryDetail.tsx` - 카테고리 상세 ❌
  - 엔드포인트: `GET /categories/{ctgryNo}`
  - 설명: 특정 카테고리의 상세 정보를 표시
  - 상태: 미구현
  - 페이지: `/categories/[id]` 라우트 없음

### 4. 태그 (tags) - 우선순위: 중간

#### 필수 컴포넌트

- `tags/TagList.tsx` - 태그 목록 ❌

  - 엔드포인트: `GET /tags`
  - 설명: 전체 태그 목록을 표시 (인기도순/알파벳순 정렬, 사용 횟수 포함)
  - 상태: 미구현
  - 페이지: `/tags` 라우트 없음 (CommonLayout에 메뉴는 존재)

- `tags/TagDetail.tsx` - 태그 상세 ❌

  - 엔드포인트: `GET /tags/{tagNo}`
  - 설명: 특정 태그의 상세 정보를 표시
  - 상태: 미구현
  - 페이지: `/tags/[id]` 라우트 없음

- `tags/TagCloud.tsx` - 태그 클라우드 ❌
  - 엔드포인트: `GET /tags`
  - 설명: 태그를 클라우드 형태로 시각화하는 컴포넌트
  - 상태: 미구현
  - 페이지: `/tags` 라우트 없음 (CommonLayout에 메뉴는 존재)

### 5. 포스트 (posts) - 우선순위: 매우 높음

#### 필수 컴포넌트

- `posts/PostList.tsx` - 포스트 목록 ❌

  - 엔드포인트: `GET /posts`, `GET /posts/categories/{ctgryNo}`, `GET /posts/tags/{tagNo}`, `GET /posts/archive/{date}`
  - 설명: 포스트 목록을 표시하는 컴포넌트 (필터링, 정렬, 페이지네이션 포함)
  - 상태: 미구현 (Home 컴포넌트에서 일부 사용하나 별도 컴포넌트 없음, 훅 존재: `useGetPostList`)
  - 페이지: `/posts` 라우트 없음

- `posts/PostDetail.tsx` - 포스트 상세 ❌

  - 엔드포인트: `GET /posts/{pstNo}`, `GET /posts/slug/{pstCd}`
  - 설명: 포스트의 상세 내용을 표시하는 컴포넌트
  - 상태: 미구현 (훅 존재: `useGetPostByNo`, `useGetPostBySlug`)
  - 페이지: `/posts/[slug]` 라우트 없음

- `posts/PostBookmark.tsx` - 포스트 북마크 ❌
  - 엔드포인트: `POST /posts/bookmarks`, `DELETE /posts/bookmarks`, `GET /posts/bookmarks`
  - 설명: 포스트 북마크를 추가/삭제/조회하는 컴포넌트
  - 상태: 미구현

#### 선택적 컴포넌트

- `posts/PostViewLog.tsx` - 조회 로그 ❌

  - 엔드포인트: `POST /posts/view-logs`
  - 설명: 포스트 조회 로그를 기록하는 컴포넌트 (내부적으로 사용)
  - 상태: 미구현

- `posts/PostShareLog.tsx` - 공유 로그 ❌
  - 엔드포인트: `POST /posts/share-logs`
  - 설명: 포스트 공유 로그를 기록하는 컴포넌트 (내부적으로 사용)
  - 상태: 미구현

### 6. 댓글 (comments) - 우선순위: 높음

#### 필수 컴포넌트

- `comments/CommentList.tsx` - 댓글 목록 ❌

  - 엔드포인트: `GET /comments`
  - 설명: 댓글 목록을 표시하는 컴포넌트 (계층 구조, 페이지네이션 포함)
  - 상태: 미구현

- `comments/CommentDetail.tsx` - 댓글 상세 ❌

  - 엔드포인트: `GET /comments/{cmntNo}`
  - 설명: 특정 댓글의 상세 정보를 표시
  - 상태: 미구현

- `comments/CommentForm.tsx` - 댓글 작성/수정 폼 ❌

  - 엔드포인트: `POST /comments`, `PUT /comments/{cmntNo}`
  - 설명: 댓글을 작성하거나 수정하는 폼
  - 상태: 미구현

- `comments/CommentDeleteButton.tsx` - 댓글 삭제 버튼 ❌
  - 엔드포인트: `DELETE /comments/{cmntNo}`
  - 설명: 댓글을 삭제하는 버튼 컴포넌트
  - 상태: 미구현

### 7. 카테고리 구독 (category-subscribe) - 우선순위: 중간

#### 필수 컴포넌트

- `subscribe/category/CategorySubscribeList.tsx` - 카테고리 구독 목록 ❌

  - 엔드포인트: `GET /users/subscribes/categories`
  - 설명: 사용자가 구독한 카테고리 목록을 표시
  - 상태: 미구현

- `subscribe/category/CategorySubscribeForm.tsx` - 카테고리 구독 설정 폼 ❌

  - 엔드포인트: `POST /users/subscribes/categories/{ctgryNo}`, `PUT /users/subscribes/categories/{ctgrySbcrNo}`, `DELETE /users/subscribes/categories/{ctgrySbcrNo}`
  - 설명: 카테고리 구독을 설정/변경/해제하는 폼
  - 상태: 미구현

- `subscribe/category/CategorySubscribeButton.tsx` - 카테고리 구독 버튼 ❌
  - 엔드포인트: `POST /users/subscribes/categories/{ctgryNo}`, `DELETE /users/subscribes/categories/{ctgrySbcrNo}`
  - 설명: 카테고리 구독/해제를 빠르게 처리하는 버튼 컴포넌트
  - 상태: 미구현

### 8. 태그 구독 (tag-subscribe) - 우선순위: 중간

#### 필수 컴포넌트

- `subscribe/tag/TagSubscribeList.tsx` - 태그 구독 목록 ❌

  - 엔드포인트: `GET /users/subscribes/tags`
  - 설명: 사용자가 구독한 태그 목록을 표시
  - 상태: 미구현

- `subscribe/tag/TagSubscribeForm.tsx` - 태그 구독 설정 폼 ❌

  - 엔드포인트: `POST /users/subscribes/tags/{tagNo}`, `PUT /users/subscribes/tags/{tagSbcrNo}`, `DELETE /users/subscribes/tags/{tagSbcrNo}`
  - 설명: 태그 구독을 설정/변경/해제하는 폼
  - 상태: 미구현

- `subscribe/tag/TagSubscribeButton.tsx` - 태그 구독 버튼 ❌
  - 엔드포인트: `POST /users/subscribes/tags/{tagNo}`, `DELETE /users/subscribes/tags/{tagSbcrNo}`
  - 설명: 태그 구독/해제를 빠르게 처리하는 버튼 컴포넌트
  - 상태: 미구현

### 9. 관리자 대시보드 (admin) - 우선순위: 높음 ⚠️

#### 필수 컴포넌트

- `admin/dashboard/AdminDashboard.tsx` - 관리자 대시보드 ❌
  - 엔드포인트: `PATCH /admin/profile` (프로필 업데이트만 존재, 대시보드용 GET 엔드포인트 없음)
  - 설명: 관리자 대시보드 메인 페이지 (통계 요약, 최근 활동 등 표시)
  - 상태: 미구현 (페이지 라우트는 존재하나 내용이 비어있음)
  - 페이지: `/admin/dashboard` ✅ (내용 미구현)
  - **우선순위**: 높음 - 관리자 기능의 진입점이므로 가장 먼저 구현 필요

### 10. 관리자 사용자 (admin-users) - 우선순위: 높음 ⚠️

#### 필수 컴포넌트

- `admin/users/AdminUserList.tsx` - 관리자 사용자 목록 ❌

  - 엔드포인트: `GET /admin/users`
  - 설명: 관리자가 사용자 목록을 조회하고 관리하는 컴포넌트
  - 상태: 미구현
  - **우선순위**: 높음 - 사용자 관리의 기본 기능

- `admin/users/AdminUserDetail.tsx` - 관리자 사용자 상세 ❌

  - 엔드포인트: `GET /admin/users/{usrNo}`, `GET /admin/users/name/:name`, `GET /admin/users/email/:email`
  - 설명: 특정 사용자의 상세 정보를 관리자가 조회하는 컴포넌트
  - 상태: 미구현
  - **우선순위**: 높음 - 사용자 관리의 기본 기능

- `admin/users/AdminUserForm.tsx` - 관리자 사용자 생성/수정 폼 ❌

  - 엔드포인트: `POST /admin/users`, `PATCH /admin/users/{usrNo}`, `PATCH /admin/users/multiple`
  - 설명: 관리자가 사용자를 생성하거나 수정하는 폼
  - 상태: 미구현
  - **우선순위**: 높음 - 사용자 관리의 기본 기능

- `admin/users/AdminUserStats.tsx` - 사용자 통계 ❌
  - 엔드포인트: `GET /admin/users/analyze/*` (10개 이상의 통계 엔드포인트 존재)
  - 설명: 사용자 관련 통계 데이터를 표시하는 컴포넌트
  - 상태: 미구현
  - **우선순위**: 중간 - 통계는 나중에 구현 가능

### 11. 관리자 카테고리 (admin-categories) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/categories/AdminCategoryList.tsx` - 관리자 카테고리 목록 ✅

  - 엔드포인트: `GET /admin/categories`
  - 설명: 관리자가 카테고리 목록을 조회하고 관리하는 컴포넌트
  - 상태: 완료
  - 페이지: `/admin/dashboard/categories` ✅

- `admin/categories/AdminCategoryDetail.tsx` - 관리자 카테고리 상세 ⚠️

  - 엔드포인트: `GET /admin/categories/{ctgryNo}`
  - 설명: 특정 카테고리의 상세 정보를 관리자가 조회하는 컴포넌트
  - 상태: 컴포넌트는 완료, 페이지 내용 미구현
  - 페이지: `/admin/dashboard/categories/[categoryNo]` ✅ (내용 미구현)

- `admin/categories/AdminCategoryForm.tsx` - 관리자 카테고리 생성/수정 폼 ✅

  - 엔드포인트: `POST /admin/categories`, `PUT /admin/categories/{ctgryNo}`
  - 설명: 관리자가 카테고리를 생성하거나 수정하는 폼
  - 상태: 완료 (NewCategoryForm, UpdateCategoryForm, AddChildCategoryForm로 구현됨)

- `admin/categories/AdminCategoryStats.tsx` - 카테고리 통계 ❌
  - 엔드포인트: `GET /admin/categories/analyze/*`
  - 설명: 카테고리 관련 통계 데이터를 표시하는 컴포넌트
  - 상태: 미구현

### 12. 관리자 태그 (admin-tags) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/tags/AdminTagList.tsx` - 관리자 태그 목록 ✅

  - 엔드포인트: `GET /admin/tags`
  - 설명: 관리자가 태그 목록을 조회하고 관리하는 컴포넌트
  - 상태: 완료

- `admin/tags/AdminTagDetail.tsx` - 관리자 태그 상세 ❌

  - 엔드포인트: `GET /admin/tags/{tagNo}`
  - 설명: 특정 태그의 상세 정보를 관리자가 조회하는 컴포넌트
  - 상태: 미구현

- `admin/tags/AdminTagForm.tsx` - 관리자 태그 생성/수정 폼 ✅

  - 엔드포인트: `POST /admin/tags`, `PUT /admin/tags/{tagNo}`
  - 설명: 관리자가 태그를 생성하거나 수정하는 폼
  - 상태: 완료 (NewTagForm, UpdateTagForm으로 구현됨)

- `admin/tags/AdminTagStats.tsx` - 태그 통계 ❌
  - 엔드포인트: `GET /admin/tags/analyze/*`
  - 설명: 태그 관련 통계 데이터를 표시하는 컴포넌트
  - 상태: 미구현

### 13. 관리자 포스트 (admin-posts) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/posts/AdminPostForm.tsx` - 관리자 포스트 생성/수정 폼 ✅

  - 엔드포인트: `POST /admin/posts`, `PUT /admin/posts/{pstNo}`
  - 설명: 관리자가 포스트를 생성하거나 수정하는 폼
  - 상태: 완료 (PostEditor, EditorForm으로 구현됨)

- `admin/posts/AdminPostStats.tsx` - 포스트 통계 ❌
  - 엔드포인트: `GET /admin/posts/analyze/*`
  - 설명: 포스트 관련 통계 데이터를 표시하는 컴포넌트
  - 상태: 미구현

### 14. 관리자 댓글 (admin-comments) - 우선순위: 중간 ⚠️

#### 필수 컴포넌트

- `admin/comments/AdminCommentList.tsx` - 관리자 댓글 목록 ❌

  - 엔드포인트: `GET /admin/comments` (API에 목록 조회 엔드포인트 없음 - 일반 댓글 API 사용 필요)
  - 설명: 관리자가 댓글 목록을 조회하고 관리하는 컴포넌트
  - 상태: 미구현
  - **참고**: API에 관리자용 댓글 목록 조회 엔드포인트가 없음. 일반 `GET /comments` 엔드포인트 사용 필요

- `admin/comments/AdminCommentDetail.tsx` - 관리자 댓글 상세 ❌

  - 엔드포인트: `GET /admin/comments/{cmntNo}` (API에 상세 조회 엔드포인트 없음 - 일반 댓글 API 사용 필요)
  - 설명: 특정 댓글의 상세 정보를 관리자가 조회하는 컴포넌트
  - 상태: 미구현
  - **참고**: API에 관리자용 댓글 상세 조회 엔드포인트가 없음. 일반 `GET /comments/{cmntNo}` 엔드포인트 사용 필요

- `admin/comments/AdminCommentStats.tsx` - 댓글 통계 ❌
  - 엔드포인트: `GET /admin/comments/analyze/*` (10개 이상의 통계 엔드포인트 존재)
  - 설명: 댓글 관련 통계 데이터를 표시하는 컴포넌트
  - 상태: 미구현
  - **우선순위**: 중간 - 통계는 나중에 구현 가능

### 15. 관리자 카테고리 구독 (admin-category-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/category/AdminCategorySubscribeList.tsx` - 관리자 카테고리 구독 목록 ❌
  - 엔드포인트: `GET /admin/subscribes/categories`
  - 설명: 관리자가 카테고리 구독 목록을 조회하고 관리하는 컴포넌트
  - 상태: 미구현

### 16. 관리자 태그 구독 (admin-tag-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/tag/AdminTagSubscribeList.tsx` - 관리자 태그 구독 목록 ❌
  - 엔드포인트: `GET /admin/subscribes/tags`
  - 설명: 관리자가 태그 구독 목록을 조회하고 관리하는 컴포넌트
  - 상태: 미구현

### 17. 관리자 사용자 구독 (admin-user-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/user/AdminUserSubscribeList.tsx` - 관리자 사용자 구독 목록 ❌
  - 엔드포인트: `GET /admin/subscribes/users`
  - 설명: 관리자가 사용자 구독 목록을 조회하고 관리하는 컴포넌트
  - 상태: 미구현

## 우선순위 기준

### 우선순위: 매우 높음

- 블로그의 핵심 기능으로 사용자가 가장 많이 접근하는 컴포넌트
- 포스트 관련 컴포넌트 (목록, 상세, 북마크)

### 우선순위: 높음

- 사용자 인증 및 프로필 관리
- 댓글 기능 (커뮤니케이션의 핵심)
- 사용자 프로필 및 설정

### 우선순위: 중간

- 카테고리 및 태그 탐색 기능
- 구독 기능 (사용자 경험 향상)
- 관리자 대시보드

### 우선순위: 낮음

- 관리자 전용 기능들
- 통계 및 분석 기능
- 관리자용 CRUD 기능

## 개발 단계별 제안

### 1단계: 핵심 기능 (우선순위 매우 높음 + 높음) - 진행률: 0%

1. 포스트 목록 및 상세 페이지 ❌
   - 컴포넌트: 미구현
   - 페이지: `/posts`, `/posts/[slug]` 라우트 없음
   - 훅: `useGetPostList`, `useGetPostByNo`, `useGetPostBySlug` 존재
2. 댓글 시스템 ❌
   - 컴포넌트: 전부 미구현
   - 페이지: 라우트 없음
3. 사용자 프로필 관리 ❌
   - 컴포넌트: 전부 미구현
   - 페이지: `/profile` 라우트 없음 (CommonLayout에 메뉴는 존재)
   - 훅: `useGetUserProfile`, `useUpdateUserProfile`, `useDeleteUserProfile` 존재
4. 인증 관련 추가 기능 (비밀번호 변경, 로그아웃) ❌
   - 컴포넌트: 미구현
   - 페이지: 라우트 없음

**현재 상태**: 모든 핵심 기능이 미구현 상태. 훅은 일부 존재하나 UI 컴포넌트 및 페이지 라우트가 없음.

### 2단계: 탐색 및 구독 기능 (우선순위 중간) - 진행률: 0%

1. 카테고리 및 태그 목록/상세 ❌
   - 컴포넌트: 전부 미구현
   - 페이지: `/categories`, `/categories/[id]`, `/tags`, `/tags/[id]` 라우트 없음
   - 참고: CommonLayout에 `/tags` 메뉴는 존재하나 실제 라우트 없음
2. 태그 클라우드 ❌
   - 컴포넌트: 미구현
   - 페이지: `/tags` 라우트 없음
3. 카테고리/태그 구독 기능 ❌
   - 컴포넌트: 전부 미구현
   - 페이지: 라우트 없음
4. 포스트 북마크 ❌
   - 컴포넌트: 미구현
   - 페이지: 라우트 없음

**현재 상태**: 모든 탐색 및 구독 기능이 미구현 상태. 페이지 라우트도 전부 없음.

### 3단계: 관리자 기능 (우선순위 낮음) - 진행률: 60%

1. 관리자 대시보드 ⚠️
   - 컴포넌트: 미구현
   - 페이지: `/admin/dashboard` 라우트 존재하나 내용 비어있음
2. 관리자 포스트 관리 ✅ (List, Detail, Editor 완료)
   - 컴포넌트: 완료
   - 페이지: `/admin/dashboard/posts`, `/admin/dashboard/posts/[postNo]`, `/admin/posts/editor` 완료
3. 관리자 사용자/카테고리/태그 관리 ✅ (카테고리, 태그 완료, 사용자 미구현)
   - 카테고리: 컴포넌트 완료, 페이지 `/admin/dashboard/categories` 완료, 상세 페이지 내용 미구현
   - 태그: 컴포넌트 완료, 페이지 `/admin/dashboard/tags` 완료
   - 사용자: 전부 미구현
4. 통계 및 분석 기능 ❌
   - 컴포넌트: 전부 미구현
   - 페이지: 라우트 없음

**현재 상태**: 관리자 포스트, 카테고리, 태그 관리 기능이 대부분 완료됨. 통계 기능은 미구현. 일부 페이지는 라우트만 있고 내용이 비어있음.

## 추가 고려사항

### 공통 컴포넌트

- 페이지네이션 컴포넌트
- 검색 및 필터 컴포넌트
- 정렬 컴포넌트
- 모달/다이얼로그 컴포넌트
- 토스트/알림 컴포넌트

### 성능 최적화

- 무한 스크롤 또는 가상 스크롤
- 이미지 지연 로딩
- 데이터 캐싱 전략

### 접근성

- 키보드 네비게이션
- 스크린 리더 지원
- ARIA 레이블

### 반응형 디자인

- 모바일 최적화
- 태블릿 레이아웃
- 데스크톱 레이아웃
