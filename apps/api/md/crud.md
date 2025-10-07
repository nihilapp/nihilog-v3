# CRUD 메소드 명명 규칙 및 정의

## 현재 구현 상태 (2025-10-07)

### 🏗️ 기술 스택 상태

#### ORM 전환 현황

- ✅ **Prisma 전환 완료**: User, UserSubscribe, CategorySubscribe, TagSubscribe, Post, Tag, Category, Comment

### 🚧 미구현 기능

#### 기본 CRUD

- **Category**: 카테고리 CRUD (✅ 완료)
- **Comment**: 댓글 CRUD (✅ 완료)
- **Tag**: 관리자용 태그 CRUD (✅ 완료)

#### 확장 기능

- **포스트 상호작용**: 북마크, 공유 추적 (✅ 완료)
- **검색 시스템**: 전문 검색, 자동완성, 인기 키워드 (완전 미구현)
- **RSS/피드**: RSS 생성, 사이트맵, Atom 피드 (완전 미구현)
- **통계/분석**: 포스트 분석, 방문자 통계, 성과 측정 (완전 미구현)
- **알림 시스템**: 이메일 발송, 웹훅 연동 (완전 미구현)
- **SEO 도구**: 메타 태그 관리, 구조화 데이터 (완전 미구현)
- **백업/관리**: 데이터 백업, 미디어 관리, 시스템 유지보수 (완전 미구현)
- **개발자 도구**: API 모니터링, 로그 관리 (완전 미구현)

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

## 아키텍처 패턴

### 통합 컨트롤러 패턴 (2025-10-07 도입)

일반 사용자와 관리자 기능이 유사한 경우, 별도 컨트롤러를 두지 않고 통합합니다:

- **적용 대상**: Comment 엔티티 (향후 다른 엔티티로 확대 예정)
- **권한 제어**: Service 레이어에서 userNo 비교 및 역할 체크
- **일괄 처리**: 관리자 전용 기능은 `/admin/<entity>/multiple` 엔드포인트로 분리
- **장점**: 코드 중복 제거, 일관된 API 구조, 유지보수 용이

### 분리 컨트롤러 패턴 (기존)

관리자 전용 기능이 많거나 로직이 크게 다른 경우 분리합니다:

- **적용 대상**: User, Post, Category, Tag, Subscribe 엔티티
- **구조**: `/admin/<entity>` 경로에 AdminAuthGuard 적용
- **특징**: 명확한 권한 분리, 관리자 전용 복잡한 로직 처리

## 주의사항

- 삭제(소프트 딜리트) 는 PK 로 삭제합니다.
- 통합 컨트롤러 사용 시 Service 레이어에서 반드시 권한 검증을 수행합니다.

## 1. Category 엔티티

> **✅ 완료**: 일반 사용자용 카테고리 조회 기능 및 관리자용 카테고리 CRUD 기능이 모두 구현되었습니다.
> **📋 상세 내용**: [crud.complete.md](./crud.complete.md)의 "8. Category 엔티티" 및 "9. Admin Category 엔티티" 섹션을 참조하세요.

## 2. Tag 엔티티

> **✅ 완료**: 일반 사용자용 태그 조회 기능 및 관리자용 태그 CRUD 기능이 모두 구현되었습니다.
> **📋 상세 내용**: [crud.complete.md](./crud.complete.md)의 "6. Tag 엔티티" 및 "7. Admin Tag 엔티티" 섹션을 참조하세요.

## 3. Comment 엔티티

> **✅ 완료**: 댓글 CRUD 기능이 모두 구현되었습니다. (2025-10-07)
> **📋 상세 내용**: [crud.complete.md](./crud.complete.md)의 "10. Comment 엔티티" 섹션을 참조하세요.
>
> **🔄 아키텍처 변경**: 일반 사용자와 관리자가 동일한 엔드포인트를 공유합니다.
> - 권한은 Guard 및 Service 레이어에서 제어
> - 관리자는 모든 댓글 수정/삭제 가능, 일반 사용자는 본인 댓글만 가능
> - 일괄 처리 기능은 관리자 전용 엔드포인트로 분리

---

## 4. 검색 및 필터링 확장 기능

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

## 5. RSS 피드 및 사이트맵

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

## 6. 통계 및 분석 대시보드

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

## 7. 알림 및 구독 시스템

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

## 8. SEO 최적화 도구

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

## 9. 백업 및 데이터 관리

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

## 10. 개발자 도구

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
