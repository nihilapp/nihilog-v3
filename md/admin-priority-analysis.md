# 관리자 기능 우선순위 분석

## 요약

관리자 기능 기준으로 API 엔드포인트와 현재 구현 상태를 비교 분석한 결과, 가장 먼저 해결해야 할 항목들을 식별했습니다.

### 현재 상태 (최신 분석 기준)

- **API 구현률**: 100% (모든 컨트롤러 파일 존재 확인)
- **관리자 컴포넌트 구현률**: 약 65% (포스트, 카테고리, 태그 관리 완료, 사용자 관리 미구현)
- **관리자 페이지 구현률**: 약 85% (7개 페이지 중 2개 내용 미구현)
- **주요 발견사항**: API는 완전히 구현되어 있으나, 관리자 사용자 관리 UI가 전혀 구현되지 않음

## 가장 먼저 해결해야 할 항목

### 1순위: 관리자 대시보드 (admin-dashboard) - 우선순위: 매우 높음

**현재 상태**

- 페이지 라우트: `/admin/dashboard` 존재 ✅
- 컴포넌트: 내용이 비어있음 ❌
- API 엔드포인트: `PATCH /admin/profile`만 존재 (대시보드용 GET 엔드포인트 없음)

**필요한 작업**

- `admin/dashboard/AdminDashboard.tsx` 컴포넌트 구현
- 대시보드에 표시할 통계 데이터 수집 (각 통계 API 활용)
- 최근 활동, 요약 정보 표시

**왜 우선인가**

- 관리자 기능의 진입점
- 다른 관리 기능들의 홈 역할
- 현재 페이지는 있으나 내용이 비어있어 사용 불가

### 2순위: 관리자 사용자 관리 (admin-users) - 우선순위: 높음

**현재 상태**

- 컴포넌트: 전부 미구현 ❌
- 페이지: 라우트 없음 ❌
- API 엔드포인트: 매우 풍부함 ✅
  - 목록 조회: `GET /admin/users`
  - 상세 조회: `GET /admin/users/{usrNo}`, `GET /admin/users/name/:name`, `GET /admin/users/email/:email`
  - 생성: `POST /admin/users`, `POST /admin/users/admin`
  - 수정: `PATCH /admin/users/{usrNo}`, `PATCH /admin/users/multiple`
  - 삭제: `DELETE /admin/users/{usrNo}`, `DELETE /admin/users/multiple`
  - 통계: 10개 이상의 `GET /admin/users/analyze/*` 엔드포인트

**필요한 작업**

1. `admin/users/AdminUserList.tsx` - 사용자 목록 컴포넌트
2. `admin/users/AdminUserDetail.tsx` - 사용자 상세 컴포넌트
3. `admin/users/AdminUserForm.tsx` - 사용자 생성/수정 폼
4. `/admin/dashboard/users` 페이지 라우트 생성
5. `/admin/dashboard/users/[userNo]` 페이지 라우트 생성

**왜 우선인가**

- API가 완전히 구현되어 있음
- 사용자 관리는 관리자의 핵심 기능
- 다른 관리 기능(카테고리, 태그, 포스트)과 동일한 패턴으로 구현 가능

### 3순위: 관리자 카테고리 상세 페이지 내용 구현 - 우선순위: 중간

**현재 상태**

- 컴포넌트: `AdminCategoryDetail.tsx` 존재 ✅
- 페이지: `/admin/dashboard/categories/[categoryNo]` 라우트 존재 ✅
- 페이지 내용: 비어있음 ❌

**필요한 작업**

- 카테고리 상세 페이지에 `AdminCategoryDetail` 컴포넌트 연결

**왜 우선인가**

- 이미 컴포넌트와 라우트가 존재하므로 간단히 완성 가능
- 완성도 향상에 기여

## 우선순위별 작업 계획

### Phase 1: 즉시 구현 (1-2주)

1. **관리자 대시보드 구현**

   - `AdminDashboard.tsx` 컴포넌트 생성
   - 통계 요약 카드 구현 (포스트 수, 사용자 수, 댓글 수 등)
   - 최근 활동 표시
   - 각 관리 기능으로 이동하는 링크 제공

2. **관리자 사용자 관리 기본 기능**
   - `AdminUserList.tsx` 구현
   - `AdminUserDetail.tsx` 구현
   - `AdminUserForm.tsx` 구현 (생성/수정)
   - 페이지 라우트 생성

### Phase 2: 보완 작업 (2-3주)

3. **카테고리 상세 페이지 완성**

   - 페이지에 `AdminCategoryDetail` 컴포넌트 연결

4. **관리자 댓글 관리**

   - `AdminCommentList.tsx` 구현 (일반 댓글 API 활용)
   - 댓글 일괄 수정/삭제 기능

5. **통계 기능 구현**
   - 사용자 통계 컴포넌트
   - 포스트 통계 컴포넌트
   - 댓글 통계 컴포넌트

### Phase 3: 고급 기능 (나중에)

6. **구독 관리 기능**
   - 카테고리 구독 관리
   - 태그 구독 관리
   - 사용자 구독 관리

## API 엔드포인트 현황

### 완전히 구현된 API (파일 존재 확인 완료)

- ✅ `auth` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `users` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `categories` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `tags` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `posts` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `comments` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `category-subscribe` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `tag-subscribe` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `admin` - 컨트롤러, 서비스, OpenAPI 문서 존재
- ✅ `admin-users` - 모든 CRUD + 통계 엔드포인트 존재 (10개 이상의 통계 엔드포인트)
- ✅ `admin-posts` - 모든 CRUD + 통계 엔드포인트 존재
- ✅ `admin-categories` - 모든 CRUD + 통계 엔드포인트 존재
- ✅ `admin-tags` - 모든 CRUD + 통계 엔드포인트 존재
- ✅ `admin-comments` - 통계 + 일괄 수정/삭제 존재
- ✅ `admin-category-subscribe` - 일괄 생성/수정/삭제 존재
- ✅ `admin-tag-subscribe` - 일괄 생성/수정/삭제 존재
- ✅ `admin-user-subscribe` - 목록/상세/생성/수정/삭제 + 통계 존재

### 부분적으로 구현된 API

- ⚠️ `admin-comments` - 통계 + 일괄 수정/삭제만 존재, 목록/상세 조회는 일반 댓글 API 사용 필요
- ⚠️ `admin` - 프로필 업데이트만 존재, 대시보드용 GET 엔드포인트 없음 (각 통계 API를 개별 호출해야 함)

## 결론

**가장 먼저 해결해야 할 것: 관리자 대시보드**

이유:

1. 관리자 기능의 진입점이므로 가장 먼저 완성되어야 함
2. 현재 페이지는 있으나 내용이 비어있어 사용 불가
3. 다른 관리 기능들의 홈 역할을 하므로 우선 구현 필요

**다음으로 해결할 것: 관리자 사용자 관리**

이유:

1. API가 완전히 구현되어 있어 바로 개발 가능
2. 사용자 관리는 관리자의 핵심 기능
3. 다른 관리 기능(카테고리, 태그, 포스트)과 동일한 패턴으로 구현 가능하여 개발 속도 빠름
