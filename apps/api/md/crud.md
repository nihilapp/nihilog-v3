# CRUD 메소드 명명 규칙 및 정의

## 현재 구현 상태 (2025-10-04)

### 🏗️ 기술 스택 상태

#### ORM 전환 현황

- ✅ **Prisma 전환 완료**: User, UserSubscribe, CategorySubscribe, TagSubscribe, Post
- ❌ **미구현**: Category, Tag, Comment

### 🚧 미구현 기능

#### 기본 CRUD

- **Category**: 카테고리 CRUD (완전 미구현)
- **Tag**: 태그 CRUD (완전 미구현)
- **Comment**: 댓글 CRUD (완전 미구현)

#### 확장 기능

- **포스트 상호작용**: 북마크, 공유 추적 (완전 미구현)
- **검색 시스템**: 전문 검색, 자동완성, 인기 키워드 (완전 미구현)
- **RSS/피드**: RSS 생성, 사이트맵, Atom 피드 (완전 미구현)
- **통계/분석**: 포스트 분석, 방문자 통계, 성과 측정 (완전 미구현)
- **알림 시스템**: 이메일 발송, 웹훅 연동 (완전 미구현)
- **SEO 도구**: 메타 태그 관리, 구조화 데이터 (완전 미구현)
- **백업/관리**: 데이터 백업, 미디어 관리, 시스템 유지보수 (완전 미구현)
- **개발자 도구**: API 모니터링, 로그 관리 (완전 미구현)

### 🔄 부분 구현 기능

#### Post (게시글) - Prisma 사용 중

**구현 완료**:

- ✅ 게시글 목록 조회 (일반/태그별/카테고리별/아카이브)
- ✅ 게시글 상세 조회 (번호/슬러그)
- ✅ 고급 검색 (복합 필드, 날짜/조회수 범위 필터)

**미구현**:

- ❌ 관리자 CRUD (생성, 수정, 삭제)
- ❌ 사용자 상호작용 (북마크, 공유, 조회수 통계)
- ❌ 통계 및 관리 기능 (추천, 고정, 통계)

> **완료된 기능들은 [crud.complete.md](./crud.complete.md)에서 확인하세요.**

## 명명 규칙

### 기본 CRUD

- **다건 조회**: `get<Entity>List`
- **단건 조회**: `get<Entity>By<FindKey>`
- **신규 추가**: `create<Entity>`
- **다건 추가**: `multipleCreate<Entity>`
- **수정**: `update<Entity>`
- **다건 수정**: `multipleUpdate<Entity>`
- **삭제**: `delete<Entity>`
- **다건 삭제**: `multipleDelete<Entity>`

### 특수 기능 (별도 관리)

- **검색**: `search<Entity>`
- **통계**: `get<Entity>Statistics`
- **상호작용**: `<Action><Entity>` (like, bookmark, share, feature, pin 등)
- **피드**: `get<Entity>Feed`
- **아카이브**: `get<Entity>Archive`

## 주의사항

- 삭제(소프트 딜리트) 는 PK 로 삭제합니다.

## 1. User 엔티티 ✅ 완료

## 2. UserSubscribe 엔티티 ✅ 완료

## 3. CategorySubscribe 엔티티 ✅ 완료

## 4. TagSubscribe 엔티티 ✅ 완료

## 5. Post 엔티티

### 일반 사용자 기능

- [x] POST /posts/search **[USER]**
  - `getPostList`
  - body: SearchPostDto (searchData)
  - 기능: 게시글 목록 조회, 필터링, 검색, 페이징, 정렬 (모든 조회 기능 통합)
- [x] GET /posts/:pstNo **[USER]**
  - `getPostByPstNo`
  - params: pstNo: number
  - 기능: 특정 게시글 상세 조회, 조회수 증가, 댓글 수 포함, 이전/다음 글 링크, 관련 게시글 추천
- [x] GET /posts/slug/:pstCd **[USER]**
  - `getPostByPstCd`
  - params: pstCd: string
  - 기능: SEO 친화적 URL로 게시글 조회, 메타 태그 정보 포함, 소셜 미디어 공유 정보
- [x] GET /posts/tag/:tagNo **[USER]**
  - `getPostListByTagNo`
  - params: tagNo: number
  - body: SearchPostDto (searchData)
  - 기능: 특정 태그로 필터링된 게시글 목록, 태그별 게시글 수, 관련 태그 추천
- [x] GET /posts/category/:ctgryNo **[USER]**
  - `getPostListByCtgryNo`
  - params: ctgryNo: number
  - body: SearchPostDto (searchData)
  - 기능: 특정 카테고리로 필터링된 게시글 목록, 카테고리별 게시글 수, 하위 카테고리 포함
- [x] GET /posts/archive/:date **[USER]**
  - `getPostListFromArchive`
  - params: date: string (yyyyMM)
  - body: SearchPostDto (searchData)
  - 기능: 특정 년월에 발행된 게시글 목록, 날짜별 게시글 수, 이전/다음 날짜 네비게이션

### 사용자 상호작용 기능

- [ ] GET /posts/:pstNo/views **[USER]**
  - `getPostViewStats`
  - params: pstNo: number
  - query: startDt: string, endDt: string
  - 기능: 게시글 조회수 통계 (일/주/월별)
- [ ] POST /posts/:pstNo/bookmark **[USER]**
  - `bookmarkPost`
  - params: pstNo: number
  - 기능: 게시글 북마크, 북마크 목록 관리, 북마크 통계
- [ ] GET /posts/bookmarked **[USER]**
  - `getPostList` (bookmarked=true)
  - query: page?, size?
  - 기능: 북마크한 게시글 목록, 북마크 날짜별 정렬
- [ ] POST /posts/:pstNo/share **[USER]**
  - `trackPostShare`
  - params: pstNo: number
  - body: { platform: string, url: string }
  - 기능: 포스트 공유 추적, 플랫폼별 공유 통계 (트위터, 페이스북, 링크드인 등)

### 관리자 기능 (작성자)

- [ ] POST /admin/posts **[ADMIN]**
  - `adminCreatePost`
  - body: CreatePostDto
  - 기능: 새 게시글 작성, 마크다운 처리, 태그 연결, 썸네일 생성, 발행 상태 설정, 임시저장, 자동저장
- [ ] PATCH /admin/posts/:pstNo **[ADMIN]**
  - `adminUpdatePost`
  - params: pstNo: number
  - body: UpdatePostDto
  - 기능: 게시글 수정, 발행/비공개 상태 변경, 태그 수정, 썸네일 업데이트, 수정 이력 관리
- [ ] PATCH /admin/posts/multiple **[ADMIN]**
  - `adminMultipleUpdatePost`
  - body: UpdatePostDto (pstNoList 포함)
  - 기능: 다수 게시글 일괄 수정, 카테고리 일괄 변경, 상태 일괄 변경, 일괄 발행
- [ ] DELETE /admin/posts/:pstNo **[ADMIN]**
  - `adminDeletePost`
  - params: pstNo: number
  - 기능: 게시글 삭제, 관련 댓글 처리, 태그 연결 해제, 이미지 파일 정리, 삭제 이력 관리
- [ ] DELETE /admin/posts/multiple **[ADMIN]**
  - `adminMultipleDeletePost`
  - body: DeletePostDto (pstNoList 포함)
  - 기능: 다수 게시글 일괄 삭제, 관련 데이터 정리, 일괄 삭제 확인
- [ ] POST /admin/posts/search **[ADMIN]**
  - `getPostList`
  - body: SearchPostDto (searchData)
  - 기능: 관리자용 게시글 목록, 모든 상태 조회, 작성자별/상태별 필터링, 통계 정보 (관리자 조회 기능 통합)
- [ ] GET /admin/posts/statistics **[ADMIN]**
  - `getPostStatistics`
  - query: period?, category?
  - 기능: 게시글 통계, 작성량/조회수 통계, 카테고리별 통계, 트렌드 분석
- [ ] POST /admin/posts/:pstNo/feature **[ADMIN]**
  - `featurePost`
  - params: pstNo: number
  - 기능: 게시글 추천 설정, 메인 노출, 우선순위 설정
- [ ] POST /admin/posts/:pstNo/pin **[ADMIN]**
  - `pinPost`
  - params: pstNo: number
  - 기능: 게시글 고정, 상단 노출, 중요도 설정

## 6. Category 엔티티

### 일반 사용자 기능

- [ ] GET /categories **[USER]**
  - `getCategoryList`
  - 기능: 전체 카테고리 목록 조회, 계층 구조 표시, 게시글 수 포함, 정렬순 적용
- [ ] GET /categories/:ctgryNo **[USER]**
  - `getCategoryByCtgryNo`
  - params: ctgryNo: number
  - 기능: 특정 카테고리 상세 정보 조회, 하위 카테고리 포함, 게시글 목록
- [ ] GET /categories/name/:name **[USER]**
  - `getCategoryByCtgryNm`
  - params: name: string
  - 기능: 카테고리명으로 검색, 유사 이름 카테고리 제안

### 관리자 기능

- [ ] POST /admin/categories **[ADMIN]**
  - `adminCreateCategory`
  - body: CreateCategoryDto
  - 기능: 새 카테고리 생성, 부모 카테고리 설정, 정렬 순서 지정, URL 슬러그 생성
- [ ] POST /admin/categories/multiple **[ADMIN]**
  - `adminMultipleCreateCategory`
  - body: CreateCategoryDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 생성, 계층 구조 일괄 설정
- [ ] PATCH /admin/categories/:ctgryNo **[ADMIN]**
  - `adminUpdateCategory`
  - params: ctgryNo: number
  - body: UpdateCategoryDto
  - 기능: 카테고리 정보 수정, 부모 변경, 정렬 순서 변경, 활성/비활성 상태 변경
- [ ] PATCH /admin/categories/multiple **[ADMIN]**
  - `adminMultipleUpdateCategory`
  - body: UpdateCategoryDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 수정, 정렬 순서 일괄 변경, 상태 일괄 변경
- [ ] DELETE /admin/categories/:ctgryNo **[ADMIN]**
  - `adminDeleteCategory`
  - params: ctgryNo: number
  - 기능: 카테고리 삭제, 하위 카테고리 처리, 관련 게시글 미분류 처리
- [ ] DELETE /admin/categories/multiple **[ADMIN]**
  - `adminMultipleDeleteCategory`
  - body: UpdateCategorySubscribeDto (ctgryNoList 포함)
  - 기능: 다수 카테고리 일괄 삭제, 관련 데이터 정리

## 7. Tag 엔티티

### 일반 사용자 기능

- [ ] GET /tags **[USER]**
  - `getTagList`
  - 기능: 전체 태그 목록 조회, 인기도순/알파벳순 정렬, 사용 횟수 포함
- [ ] GET /tags/:tagNo **[USER]**
  - `getTagByTagNo`
  - params: tagNo: number
  - 기능: 특정 태그 상세 정보 조회, 태그된 게시글 목록, 관련 태그 추천
- [ ] GET /tags/name/:name **[USER]**
  - `getTagByTagNm`
  - params: name: string
  - 기능: 태그명으로 검색, 자동완성 기능, 유사 태그 제안

### 관리자 기능

- [ ] POST /admin/tags **[ADMIN]**
  - `adminCreateTag`
  - body: CreateTagDto
  - 기능: 새 태그 생성, 태그명 중복 검증, URL 슬러그 생성, 색상 설정
- [ ] POST /admin/tags/multiple **[ADMIN]**
  - `adminMultipleCreateTag`
  - body: CreateTagDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 생성, 게시글에서 태그 추출 시 사용
- [ ] PATCH /admin/tags/:tagNo **[ADMIN]**
  - `adminUpdateTag`
  - params: tagNo: number
  - body: UpdateTagDto
  - 기능: 태그 정보 수정, 태그명 변경, 색상 변경, 활성/비활성 상태 변경
- [ ] PATCH /admin/tags/multiple **[ADMIN]**
  - `adminMultipleUpdateTag`
  - body: UpdateTagDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 수정, 태그 분류 일괄 변경, 상태 일괄 변경
- [ ] DELETE /admin/tags/:tagNo **[ADMIN]**
  - `adminDeleteTag`
  - params: tagNo: number
  - 기능: 태그 삭제, 게시글에서 태그 연결 해제, 구독 정보 정리
- [ ] DELETE /admin/tags/multiple **[ADMIN]**
  - `adminMultipleDeleteTag`
  - body: UpdateTagSubscribeDto (tagNoList 포함)
  - 기능: 다수 태그 일괄 삭제, 관련 연결 정보 정리

## 8. Comment 엔티티

### 일반 사용자 기능

- [ ] GET /comments **[USER]**
  - `getCommentList`
  - query: pstNo?, page?, size?
  - 기능: 댓글 목록 조회, 게시글별 필터링, 계층형 댓글 구조, 승인된 댓글만 조회
- [ ] GET /comments/:cmntNo **[USER]**
  - `getCommentByCommentNo`
  - params: cmntNo: number
  - 기능: 특정 댓글 상세 조회, 대댓글 포함, 작성자 정보
- [ ] POST /comments **[USER]**
  - `createComment`
  - body: CreateCommentDto
  - 기능: 새 댓글 작성, 대댓글 작성, 스팸 필터링, 승인 대기 상태 설정
- [ ] PATCH /comments/:cmntNo **[USER]**
  - `updateComment`
  - params: cmntNo: number
  - body: UpdateCommentDto
  - 기능: 댓글 수정(본인), 신고 처리
- [ ] DELETE /comments/:cmntNo **[USER]**
  - `deleteComment`
  - params: cmntNo: number
  - 기능: 댓글 삭제(본인), 대댓글 처리, 삭제 표시 또는 완전 삭제

### 관리자 기능

- [ ] PATCH /admin/comments/:cmntNo **[ADMIN]**
  - `adminUpdateComment`
  - params: cmntNo: number
  - body: UpdateCommentDto
  - 기능: 댓글 승인/거부 상태 변경(관리자), 신고 처리
- [ ] PATCH /admin/comments/multiple **[ADMIN]**
  - `adminMultipleUpdateComment`
  - body: UpdateCommentDto (cmntNoList 포함)
  - 기능: 다수 댓글 일괄 수정, 상태 일괄 변경, 스팸 일괄 처리
- [ ] DELETE /admin/comments/:cmntNo **[ADMIN]**
  - `adminDeleteComment`
  - params: cmntNo: number
  - 기능: 댓글 삭제(관리자), 대댓글 처리, 삭제 표시 또는 완전 삭제
- [ ] DELETE /admin/comments/multiple **[ADMIN]**
  - `adminMultipleDeleteComment`
  - body: UpdateCommentDto (cmntNoList 포함)
  - 기능: 다수 댓글 일괄 삭제, 스팸 댓글 일괄 정리

---

## 9. 검색 및 필터링 확장 기능

### 고급 검색 기능

- [ ] POST /search/posts **[USER]**

  - `searchPostsAdvanced`
  - body: AdvancedSearchDto
  - 기능: 제목, 본문, 태그 통합 전문 검색, 검색 하이라이팅, 필터링 조합

- [ ] GET /search/autocomplete **[USER]**

  - `getSearchSuggestions`
  - query: term: string
  - 기능: 입력한 글자 기반 검색어 자동완성, 인기 키워드 우선 표시

- [ ] GET /search/popular **[USER]**
  - `getPopularSearchTerms`
  - query: period?
  - 기능: 실시간/주간/월간 인기 검색 키워드 통계

### 관리자 검색 관리

- [ ] GET /admin/search/history **[ADMIN]**
  - `getSearchHistory`
  - query: period?, page?, size?
  - 기능: 사용자 검색 히스토리 분석, 검색 패턴 통계

## 10. RSS 피드 및 사이트맵

### 공개 피드

- [ ] GET /feeds/rss **[PUBLIC]**

  - `generateRSSFeed`
  - query: limit?
  - 기능: 전체 포스트 RSS 2.0 피드 생성, 자동 업데이트

- [ ] GET /feeds/rss/category/:ctgryNo **[PUBLIC]**

  - `generateCategoryRSSFeed`
  - params: ctgryNo: number
  - query: limit?
  - 기능: 특정 카테고리 RSS 피드

- [ ] GET /feeds/rss/tag/:tagNo **[PUBLIC]**

  - `generateTagRSSFeed`
  - params: tagNo: number
  - query: limit?
  - 기능: 특정 태그 RSS 피드

- [ ] GET /sitemap.xml **[PUBLIC]**

  - `generateSitemap`
  - 기능: SEO용 XML 사이트맵 자동 생성, 포스트/카테고리/태그 포함

- [ ] GET /feeds/atom **[PUBLIC]**
  - `generateAtomFeed`
  - 기능: Atom 1.0 형식 피드 (RSS 대안)

## 11. 통계 및 분석 대시보드

### 포스트 분석

- [ ] GET /admin/analytics/posts **[ADMIN]**

  - `getPostAnalytics`
  - query: period?, category?, tag?
  - 기능: 포스트별 조회수, 댓글, 공유 통계 종합

- [ ] GET /admin/analytics/popular **[ADMIN]**
  - `getPopularContent`
  - query: period?, type?, limit?
  - 기능: 실시간 인기 글, 트렌딩 태그, 핫 카테고리 분석

### 방문자 분석

- [ ] GET /admin/analytics/visitors **[ADMIN]**

  - `getVisitorAnalytics`
  - query: period?
  - 기능: 방문자 수, 유입 경로, 시간대별 패턴, 지역별 분포

- [ ] GET /admin/analytics/traffic **[ADMIN]**
  - `getTrafficAnalytics`
  - query: period?
  - 기능: 페이지뷰, 세션 시간, 이탈률, 재방문율

### 콘텐츠 성과

- [ ] GET /admin/analytics/engagement **[ADMIN]**
  - `getEngagementMetrics`
  - query: period?
  - 기능: 댓글율, 공유율, 구독 전환율

## 12. 알림 및 구독 시스템

### 이메일 알림

- [ ] POST /admin/notifications/email **[ADMIN]**

  - `sendEmailNotification`
  - body: EmailNotificationDto
  - 기능: 새 글 발행 시 구독자들에게 이메일 일괄 발송

- [ ] GET /admin/notifications/email/status **[ADMIN]**
  - `getEmailNotificationStatus`
  - query: notificationId: string
  - 기능: 이메일 발송 상태 및 통계 조회

### 웹훅 연동

- [ ] POST /admin/webhooks **[ADMIN]**

  - `createWebhook`
  - body: CreateWebhookDto
  - 기능: 웹훅 URL 등록 (슬랙, 디스코드, 자체 서비스)

- [ ] PUT /admin/webhooks/:webhookId **[ADMIN]**

  - `updateWebhook`
  - params: webhookId: string
  - body: UpdateWebhookDto
  - 기능: 웹훅 설정 수정, 활성/비활성화

- [ ] POST /admin/webhooks/test **[ADMIN]**
  - `testWebhook`
  - body: TestWebhookDto
  - 기능: 웹훅 연결 테스트

## 13. SEO 최적화 도구

### 메타 태그 관리

- [ ] PUT /admin/posts/:pstNo/seo **[ADMIN]**

  - `updatePostSEO`
  - params: pstNo: number
  - body: PostSEODto
  - 기능: 포스트별 메타 디스크립션, 키워드, OG 태그 관리

- [ ] GET /posts/:pstNo/structured-data **[PUBLIC]**
  - `getStructuredData`
  - params: pstNo: number
  - 기능: JSON-LD 형태의 구조화된 데이터 (Article 스키마)

### SEO 분석

- [ ] GET /admin/seo/analysis **[ADMIN]**
  - `getSEOAnalysis`
  - 기능: 사이트 전체 SEO 상태 분석, 개선 제안

## 14. 백업 및 데이터 관리

### 콘텐츠 백업

- [ ] GET /admin/backup/posts **[ADMIN]**

  - `exportPosts`
  - query: format?, category?, period?
  - 기능: 포스트 백업 (Markdown, JSON, HTML 형식)

- [ ] POST /admin/backup/import **[ADMIN]**
  - `importPosts`
  - body: ImportDataDto
  - 기능: 다른 플랫폼에서 포스트 가져오기 (Medium, WordPress 등)

### 미디어 관리

- [ ] POST /admin/media/optimize **[ADMIN]**

  - `optimizeImages`
  - body: OptimizeImageDto
  - 기능: 업로드된 이미지 일괄 최적화, 리사이징, WebP 변환

- [ ] GET /admin/media/storage **[ADMIN]**
  - `getStorageStats`
  - 기능: 스토리지 사용량, 파일 통계, 용량 분석

### 시스템 유지보수

- [ ] POST /admin/maintenance/cleanup **[ADMIN]**
  - `performCleanup`
  - body: CleanupOptionsDto
  - 기능: 미사용 파일 정리, 캐시 클리어, 로그 정리

## 15. 개발자 도구

### API 모니터링

- [ ] GET /admin/api/usage **[ADMIN]**
  - `getAPIUsageStats`
  - query: period?
  - 기능: API 호출 통계, 엔드포인트별 사용량, 응답 시간

### 로그 관리

- [ ] GET /admin/logs/errors **[ADMIN]**
  - `getErrorLogs`
  - query: period?, level?, page?
  - 기능: 에러 로그 조회, 빈도별 분석, 알림 설정
