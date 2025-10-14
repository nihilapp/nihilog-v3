# 어드민 사이드바 메뉴 구성

## 대시보드

- 📊 대시보드
  - 전체 통계 요약 → `/admin/dashboard`
  - 최근 활동 현황 → `/admin/dashboard/activity`

## 콘텐츠 관리

- 📝 게시글 관리

  - 게시글 목록 → `/admin/dashboard/posts` (일괄 관리 포함)
  - 게시글 작성/수정 → `/admin/posts/edit?pstCd={id}` (새글: 빈값 또는 null, 수정: 실제 ID)

- 📂 카테고리 관리

  - 카테고리 목록 → `/admin/dashboard/categories` (일괄 관리 포함)
  - 카테고리 생성/수정 → `/admin/dashboard/categories/edit?ctgryNo={id}` (새카테고리: 빈값 또는 null, 수정: 실제 ID)

- 🏷️ 태그 관리

  - 태그 목록 → `/admin/dashboard/tags` (일괄 관리 포함)
  - 태그 생성/수정 → `/admin/dashboard/tags/edit?tagNo={id}` (새태그: 빈값 또는 null, 수정: 실제 ID)

- 💬 댓글 관리
  - 댓글 목록 → `/admin/dashboard/comments` (일괄 관리 포함)

## 사용자 관리

- 👥 사용자 관리
  - 사용자 목록 → `/admin/dashboard/users`
  - 사용자 생성/수정 → `/admin/dashboard/users/edit?userNo={id}` (새사용자: 빈값 또는 null, 수정: 실제 ID)

## 구독 관리

- 🔔 구독 관리
  - 사용자 구독 현황 → `/admin/dashboard/subscriptions/users`
  - 카테고리 구독 관리 → `/admin/dashboard/subscriptions/categories`
  - 태그 구독 관리 → `/admin/dashboard/subscriptions/tags`

## 분석 통계

- 📊 게시글 통계

  - 게시글 분석 개요 → `/admin/dashboard/analytics/posts`
  - 조회수 통계 → `/admin/dashboard/analytics/posts/views`
  - 북마크 통계 → `/admin/dashboard/analytics/posts/bookmarks`
  - 공유 통계 → `/admin/dashboard/analytics/posts/shares`
  - 인기 게시글 TOP N → `/admin/dashboard/analytics/posts/popular`

- 📈 카테고리 통계

  - 카테고리 분석 개요 → `/admin/dashboard/analytics/categories`
  - 인기도 지수 → `/admin/dashboard/analytics/categories/popularity`
  - 구독자 통계 → `/admin/dashboard/analytics/categories/subscribers`
  - 계층 분포 → `/admin/dashboard/analytics/categories/hierarchy`
  - 미사용 카테고리 → `/admin/dashboard/analytics/categories/unused`

- 🏷️ 태그 통계

  - 태그 분석 개요 → `/admin/dashboard/analytics/tags`
  - 사용량 통계 → `/admin/dashboard/analytics/tags/usage`
  - 효율성 분석 → `/admin/dashboard/analytics/tags/efficiency`
  - 생명주기 분석 → `/admin/dashboard/analytics/tags/lifecycle`
  - 정리 필요도 → `/admin/dashboard/analytics/tags/cleanup`

- 💬 댓글 통계

  - 댓글 분석 개요 → `/admin/dashboard/analytics/comments`
  - 승인율 통계 → `/admin/dashboard/analytics/comments/approval`
  - 스팸율 분석 → `/admin/dashboard/analytics/comments/spam`
  - 답글 비율 → `/admin/dashboard/analytics/comments/replies`
  - 평균 깊이 → `/admin/dashboard/analytics/comments/depth`

- 👥 사용자 통계

  - 사용자 분석 개요 → `/admin/dashboard/analytics/users`
  - 활성 사용자 분석 → `/admin/dashboard/analytics/users/active`
  - 기여도 TOP N → `/admin/dashboard/analytics/users/contribution`
  - 성장률/유지율 → `/admin/dashboard/analytics/users/growth`
  - 비활성 사용자 → `/admin/dashboard/analytics/users/inactive`

- 🔔 구독 통계
  - 구독 분석 개요 → `/admin/dashboard/analytics/subscriptions`

## 시스템 관리

- ⚙️ 시스템 설정
  - 프로필 관리 → `/admin/profile`
  - 권한 관리 → `/admin/permissions`
  - 시스템 로그 → `/admin/logs`

---

## 라우팅 구조 설명

### 폴더 구조와 URL 매핑

- `(admin)/admin/dashboard/*` → `/admin/dashboard/*` (실 기능 관리 페이지)
- `(admin)/admin/dashboard/analytics/*` → `/admin/dashboard/analytics/*` (통계 분석 페이지)
- `(admin-posts)/admin/posts/edit/*` → `/admin/posts/edit/*` (게시글 편집만 별도 레이아웃)

### 특별한 라우팅

- **게시글 편집**: `(admin-posts)` 그룹을 사용하여 별도 레이아웃 적용
- **실 기능과 통계 분리**:
  - 실 기능: `/admin/dashboard/` 하위 (목록, 생성, 수정, 일괄 관리)
  - 통계 분석: `/admin/dashboard/analytics/` 하위로 별도 그룹화
- **일괄 관리**: 각 목록 페이지에서 체크박스 선택 후 일괄 처리 기능 제공
- **편집 페이지**: 모든 편집 페이지는 쿼리 파라미터로 새글/수정 구분
  - 새글: `?pstCd=`, `?ctgryNo=`, `?tagNo=`, `?userNo=` (빈값 또는 null)
  - 수정: `?pstCd={id}`, `?ctgryNo={id}`, `?tagNo={id}`, `?userNo={id}` (실제 ID)
