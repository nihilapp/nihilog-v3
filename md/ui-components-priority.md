# UI 컴포넌트 개발 우선순위

## 요약

이 문서는 API 엔드포인트를 기반으로 UI에 필요한 컴포넌트를 분석하고 우선순위를 정리한 것입니다. 총 17개의 API 엔드포인트 그룹에 대해 필요한 컴포넌트를 식별하고, 개발 우선순위를 제시합니다.

## 현재 존재하는 컴포넌트

### 인증 관련

- `SignInForm.tsx` - 로그인 폼
- `SubscribeForm.tsx` - 구독 폼

### 관리자 관련

- `admin/posts/AdminPostList.tsx` - 관리자 포스트 목록
- `admin/posts/AdminPostDetail.tsx` - 관리자 포스트 상세

### 공통 컴포넌트

- `common/AsyncBoundary.tsx` - 비동기 경계 처리
- `common/Done.tsx` - 완료 상태 표시
- `common/Loading.tsx` - 로딩 상태 표시
- `common/Logo.tsx` - 로고 컴포넌트
- `common/home/Home.tsx` - 홈 컴포넌트
- `common/not-found/NotFound.tsx` - 404 페이지

### UI 기본 컴포넌트

- `ui/box/*` - 박스 관련 컴포넌트들
- `ui/button/*` - 버튼 관련 컴포넌트들
- `ui/form/*` - 폼 관련 컴포넌트들
- `ui/frame/*` - 프레임 레이아웃 컴포넌트들
- `ui/input/*` - 입력 관련 컴포넌트들
- `ui/list/*` - 리스트 관련 컴포넌트들

## 필요한 컴포넌트 목록

### 1. 인증 (auth) - 우선순위: 높음

#### 필수 컴포넌트

- `auth/ChangePasswordForm.tsx` - 비밀번호 변경 폼

  - 엔드포인트: `PUT /auth/password`
  - 설명: 현재 로그인된 사용자의 비밀번호를 변경하는 폼

- `auth/SignOutButton.tsx` - 로그아웃 버튼
  - 엔드포인트: `POST /auth/signout`
  - 설명: 로그아웃을 처리하는 버튼 컴포넌트

#### 선택적 컴포넌트

- `auth/SessionInfo.tsx` - 세션 정보 표시
  - 엔드포인트: `GET /auth/session`
  - 설명: 현재 세션 정보를 표시하는 컴포넌트 (디버깅용)

### 2. 사용자 (users) - 우선순위: 높음

#### 필수 컴포넌트

- `users/UserProfile.tsx` - 프로필 조회

  - 엔드포인트: `GET /users/profile`
  - 설명: 현재 로그인한 사용자의 프로필 정보를 표시

- `users/UserProfileEdit.tsx` - 프로필 수정

  - 엔드포인트: `PUT /users/profile`
  - 설명: 프로필 정보를 수정하는 폼

- `users/UserProfileDelete.tsx` - 프로필 삭제

  - 엔드포인트: `DELETE /users/profile`
  - 설명: 계정 삭제를 처리하는 컴포넌트

- `users/UserSubscribeSettings.tsx` - 구독 설정
  - 엔드포인트: `GET /users/subscribe`, `PUT /users/subscribe`
  - 설명: 이메일 알림 및 구독 설정을 조회하고 변경하는 컴포넌트

#### 선택적 컴포넌트

- `users/UserCreateForm.tsx` - 사용자 계정 생성
  - 엔드포인트: `POST /users`
  - 설명: 새로운 사용자 계정을 생성하는 폼 (회원가입)

### 3. 카테고리 (categories) - 우선순위: 중간

#### 필수 컴포넌트

- `categories/CategoryList.tsx` - 카테고리 목록

  - 엔드포인트: `GET /categories`
  - 설명: 전체 카테고리 목록을 표시 (계층 구조, 포스트 수 포함)

- `categories/CategoryDetail.tsx` - 카테고리 상세
  - 엔드포인트: `GET /categories/{ctgryNo}`
  - 설명: 특정 카테고리의 상세 정보를 표시

### 4. 태그 (tags) - 우선순위: 중간

#### 필수 컴포넌트

- `tags/TagList.tsx` - 태그 목록

  - 엔드포인트: `GET /tags`
  - 설명: 전체 태그 목록을 표시 (인기도순/알파벳순 정렬, 사용 횟수 포함)

- `tags/TagDetail.tsx` - 태그 상세

  - 엔드포인트: `GET /tags/{tagNo}`
  - 설명: 특정 태그의 상세 정보를 표시

- `tags/TagCloud.tsx` - 태그 클라우드
  - 엔드포인트: `GET /tags`
  - 설명: 태그를 클라우드 형태로 시각화하는 컴포넌트

### 5. 포스트 (posts) - 우선순위: 매우 높음

#### 필수 컴포넌트

- `posts/PostList.tsx` - 포스트 목록

  - 엔드포인트: `GET /posts`, `GET /posts/categories/{ctgryNo}`, `GET /posts/tags/{tagNo}`, `GET /posts/archive/{date}`
  - 설명: 포스트 목록을 표시하는 컴포넌트 (필터링, 정렬, 페이지네이션 포함)

- `posts/PostDetail.tsx` - 포스트 상세

  - 엔드포인트: `GET /posts/{pstNo}`, `GET /posts/slug/{pstCd}`
  - 설명: 포스트의 상세 내용을 표시하는 컴포넌트

- `posts/PostBookmark.tsx` - 포스트 북마크
  - 엔드포인트: `POST /posts/bookmarks`, `DELETE /posts/bookmarks/{pstBkmkNo}`, `GET /posts/bookmarks`
  - 설명: 포스트 북마크를 추가/삭제/조회하는 컴포넌트

#### 선택적 컴포넌트

- `posts/PostViewLog.tsx` - 조회 로그

  - 엔드포인트: `POST /posts/view-logs`
  - 설명: 포스트 조회 로그를 기록하는 컴포넌트 (내부적으로 사용)

- `posts/PostShareLog.tsx` - 공유 로그
  - 엔드포인트: `POST /posts/share-logs`
  - 설명: 포스트 공유 로그를 기록하는 컴포넌트 (내부적으로 사용)

### 6. 댓글 (comments) - 우선순위: 높음

#### 필수 컴포넌트

- `comments/CommentList.tsx` - 댓글 목록

  - 엔드포인트: `GET /comments`
  - 설명: 댓글 목록을 표시하는 컴포넌트 (계층 구조, 페이지네이션 포함)

- `comments/CommentDetail.tsx` - 댓글 상세

  - 엔드포인트: `GET /comments/{cmntNo}`
  - 설명: 특정 댓글의 상세 정보를 표시

- `comments/CommentForm.tsx` - 댓글 작성/수정 폼

  - 엔드포인트: `POST /comments`, `PUT /comments/{cmntNo}`
  - 설명: 댓글을 작성하거나 수정하는 폼

- `comments/CommentDeleteButton.tsx` - 댓글 삭제 버튼
  - 엔드포인트: `DELETE /comments/{cmntNo}`
  - 설명: 댓글을 삭제하는 버튼 컴포넌트

### 7. 카테고리 구독 (category-subscribe) - 우선순위: 중간

#### 필수 컴포넌트

- `subscribe/category/CategorySubscribeList.tsx` - 카테고리 구독 목록

  - 엔드포인트: `GET /users/subscribes/categories`
  - 설명: 사용자가 구독한 카테고리 목록을 표시

- `subscribe/category/CategorySubscribeForm.tsx` - 카테고리 구독 설정 폼

  - 엔드포인트: `POST /users/subscribes/categories/{ctgryNo}`, `PUT /users/subscribes/categories/{ctgrySbcrNo}`, `DELETE /users/subscribes/categories/{ctgrySbcrNo}`
  - 설명: 카테고리 구독을 설정/변경/해제하는 폼

- `subscribe/category/CategorySubscribeButton.tsx` - 카테고리 구독 버튼
  - 엔드포인트: `POST /users/subscribes/categories/{ctgryNo}`, `DELETE /users/subscribes/categories/{ctgrySbcrNo}`
  - 설명: 카테고리 구독/해제를 빠르게 처리하는 버튼 컴포넌트

### 8. 태그 구독 (tag-subscribe) - 우선순위: 중간

#### 필수 컴포넌트

- `subscribe/tag/TagSubscribeList.tsx` - 태그 구독 목록

  - 엔드포인트: `GET /users/subscribes/tags`
  - 설명: 사용자가 구독한 태그 목록을 표시

- `subscribe/tag/TagSubscribeForm.tsx` - 태그 구독 설정 폼

  - 엔드포인트: `POST /users/subscribes/tags/{tagNo}`, `PUT /users/subscribes/tags/{tagSbcrNo}`, `DELETE /users/subscribes/tags/{tagSbcrNo}`
  - 설명: 태그 구독을 설정/변경/해제하는 폼

- `subscribe/tag/TagSubscribeButton.tsx` - 태그 구독 버튼
  - 엔드포인트: `POST /users/subscribes/tags/{tagNo}`, `DELETE /users/subscribes/tags/{tagSbcrNo}`
  - 설명: 태그 구독/해제를 빠르게 처리하는 버튼 컴포넌트

### 9. 관리자 대시보드 (admin) - 우선순위: 중간

#### 필수 컴포넌트

- `admin/dashboard/AdminDashboard.tsx` - 관리자 대시보드
  - 엔드포인트: `GET /admin` (가정)
  - 설명: 관리자 대시보드 메인 페이지

### 10. 관리자 사용자 (admin-users) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/users/AdminUserList.tsx` - 관리자 사용자 목록

  - 엔드포인트: `GET /admin/users`
  - 설명: 관리자가 사용자 목록을 조회하고 관리하는 컴포넌트

- `admin/users/AdminUserDetail.tsx` - 관리자 사용자 상세

  - 엔드포인트: `GET /admin/users/{usrNo}`
  - 설명: 특정 사용자의 상세 정보를 관리자가 조회하는 컴포넌트

- `admin/users/AdminUserForm.tsx` - 관리자 사용자 생성/수정 폼

  - 엔드포인트: `POST /admin/users`, `PUT /admin/users/{usrNo}`
  - 설명: 관리자가 사용자를 생성하거나 수정하는 폼

- `admin/users/AdminUserStats.tsx` - 사용자 통계
  - 엔드포인트: `GET /admin/users/analyze/*`
  - 설명: 사용자 관련 통계 데이터를 표시하는 컴포넌트

### 11. 관리자 카테고리 (admin-categories) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/categories/AdminCategoryList.tsx` - 관리자 카테고리 목록

  - 엔드포인트: `GET /admin/categories`
  - 설명: 관리자가 카테고리 목록을 조회하고 관리하는 컴포넌트

- `admin/categories/AdminCategoryDetail.tsx` - 관리자 카테고리 상세

  - 엔드포인트: `GET /admin/categories/{ctgryNo}`
  - 설명: 특정 카테고리의 상세 정보를 관리자가 조회하는 컴포넌트

- `admin/categories/AdminCategoryForm.tsx` - 관리자 카테고리 생성/수정 폼

  - 엔드포인트: `POST /admin/categories`, `PUT /admin/categories/{ctgryNo}`
  - 설명: 관리자가 카테고리를 생성하거나 수정하는 폼

- `admin/categories/AdminCategoryStats.tsx` - 카테고리 통계
  - 엔드포인트: `GET /admin/categories/analyze/*`
  - 설명: 카테고리 관련 통계 데이터를 표시하는 컴포넌트

### 12. 관리자 태그 (admin-tags) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/tags/AdminTagList.tsx` - 관리자 태그 목록

  - 엔드포인트: `GET /admin/tags`
  - 설명: 관리자가 태그 목록을 조회하고 관리하는 컴포넌트

- `admin/tags/AdminTagDetail.tsx` - 관리자 태그 상세

  - 엔드포인트: `GET /admin/tags/{tagNo}`
  - 설명: 특정 태그의 상세 정보를 관리자가 조회하는 컴포넌트

- `admin/tags/AdminTagForm.tsx` - 관리자 태그 생성/수정 폼

  - 엔드포인트: `POST /admin/tags`, `PUT /admin/tags/{tagNo}`
  - 설명: 관리자가 태그를 생성하거나 수정하는 폼

- `admin/tags/AdminTagStats.tsx` - 태그 통계
  - 엔드포인트: `GET /admin/tags/analyze/*`
  - 설명: 태그 관련 통계 데이터를 표시하는 컴포넌트

### 13. 관리자 포스트 (admin-posts) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/posts/AdminPostForm.tsx` - 관리자 포스트 생성/수정 폼

  - 엔드포인트: `POST /admin/posts`, `PUT /admin/posts/{pstNo}`
  - 설명: 관리자가 포스트를 생성하거나 수정하는 폼 (이미 List, Detail 존재)

- `admin/posts/AdminPostStats.tsx` - 포스트 통계
  - 엔드포인트: `GET /admin/posts/analyze/*`
  - 설명: 포스트 관련 통계 데이터를 표시하는 컴포넌트

### 14. 관리자 댓글 (admin-comments) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/comments/AdminCommentList.tsx` - 관리자 댓글 목록

  - 엔드포인트: `GET /admin/comments`
  - 설명: 관리자가 댓글 목록을 조회하고 관리하는 컴포넌트

- `admin/comments/AdminCommentDetail.tsx` - 관리자 댓글 상세

  - 엔드포인트: `GET /admin/comments/{cmntNo}`
  - 설명: 특정 댓글의 상세 정보를 관리자가 조회하는 컴포넌트

- `admin/comments/AdminCommentStats.tsx` - 댓글 통계
  - 엔드포인트: `GET /admin/comments/analyze/*` (가정)
  - 설명: 댓글 관련 통계 데이터를 표시하는 컴포넌트

### 15. 관리자 카테고리 구독 (admin-category-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/category/AdminCategorySubscribeList.tsx` - 관리자 카테고리 구독 목록
  - 엔드포인트: `GET /admin/subscribes/categories`
  - 설명: 관리자가 카테고리 구독 목록을 조회하고 관리하는 컴포넌트

### 16. 관리자 태그 구독 (admin-tag-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/tag/AdminTagSubscribeList.tsx` - 관리자 태그 구독 목록
  - 엔드포인트: `GET /admin/subscribes/tags`
  - 설명: 관리자가 태그 구독 목록을 조회하고 관리하는 컴포넌트

### 17. 관리자 사용자 구독 (admin-user-subscribe) - 우선순위: 낮음

#### 필수 컴포넌트

- `admin/subscribe/user/AdminUserSubscribeList.tsx` - 관리자 사용자 구독 목록
  - 엔드포인트: `GET /admin/subscribes/users`
  - 설명: 관리자가 사용자 구독 목록을 조회하고 관리하는 컴포넌트

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

### 1단계: 핵심 기능 (우선순위 매우 높음 + 높음)

1. 포스트 목록 및 상세 페이지
2. 댓글 시스템
3. 사용자 프로필 관리
4. 인증 관련 추가 기능 (비밀번호 변경, 로그아웃)

### 2단계: 탐색 및 구독 기능 (우선순위 중간)

1. 카테고리 및 태그 목록/상세
2. 태그 클라우드
3. 카테고리/태그 구독 기능
4. 포스트 북마크

### 3단계: 관리자 기능 (우선순위 낮음)

1. 관리자 대시보드
2. 관리자 포스트 관리 (이미 부분적으로 존재)
3. 관리자 사용자/카테고리/태그 관리
4. 통계 및 분석 기능

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
