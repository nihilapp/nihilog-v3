# API 엔드포인트 분석 보고서

작성일: 2025-11-01

## 📊 현재 존재하는 엔드포인트 분석

### 1. 인증 (auth)
- ✅ 로그인 (POST `/auth/signin`)
- ✅ 로그아웃 (POST `/auth/signout`)
- ✅ 토큰 갱신 (POST `/auth/refresh`)
- ✅ 세션 조회 (GET `/auth/session`)
- ✅ 비밀번호 변경 (PUT `/auth/password`)

### 2. 사용자 (users)
- ✅ 회원가입 (POST `/users`)
- ✅ 프로필 조회 (GET `/users/profile`)
- ✅ 프로필 수정 (PUT `/users/profile`)
- ✅ 프로필 삭제 (DELETE `/users/profile`)
- ✅ 구독 설정 조회/수정 (GET/PUT `/users/subscribe`)

### 3. 카테고리 (categories)
- ✅ 카테고리 목록 조회 (GET `/categories`)
- ✅ 카테고리 상세 조회 - 번호 (GET `/categories/:ctgryNo`)
- ✅ 카테고리 상세 조회 - 이름 (GET `/categories/name/:name`)

### 4. 태그 (tags)
- ✅ 태그 목록 조회 (GET `/tags`)
- ✅ 태그 상세 조회 - 번호 (GET `/tags/:tagNo`)
- ✅ 태그 상세 조회 - 이름 (GET `/tags/name/:name`)

### 5. 포스트 (posts)
- ✅ 포스트 목록 조회 (GET `/posts`)
  - **검색 기능 포함**: `srchKywd` (검색어), `srchType` (제목/요약), `tagNoList`, `ctgryNoList`, `orderBy` (LATEST/POPULAR/OLDEST)
- ✅ 포스트 상세 조회 - 번호 (GET `/posts/:pstNo`)
- ✅ 포스트 상세 조회 - 슬러그 (GET `/posts/slug/:pstCd`)
- ✅ 태그별 포스트 목록 (GET `/posts/tags/:tagNo`)
- ✅ 카테고리별 포스트 목록 (GET `/posts/categories/:ctgryNo`)
- ✅ 아카이브별 포스트 목록 (GET `/posts/archive/:date`)
- ✅ 조회 로그 기록 (POST `/posts/view-logs`)
- ✅ 공유 로그 기록 (POST `/posts/share-logs`)
- ✅ 북마크 생성/삭제/조회 (POST/DELETE/GET `/posts/bookmarks`)

### 6. 댓글 (comments)
- ✅ 댓글 목록 조회 (GET `/comments`)
- ✅ 댓글 상세 조회 (GET `/comments/:cmntNo`)
- ✅ 댓글 작성 (POST `/comments`)
- ✅ 댓글 수정 (PUT `/comments/:cmntNo`)
- ✅ 댓글 삭제 (DELETE `/comments/:cmntNo`)

### 7. 구독 관리 (category-subscribe, tag-subscribe)
- ✅ 구독 목록 조회/생성/수정/삭제
- ✅ 일괄 구독/구독 해제/수정

### 8. 관리자 기능 (admin-*)
- ✅ 사용자 관리 (admin-users) - 통계 포함
- ✅ 카테고리 관리 (admin-categories) - CRUD + 통계
- ✅ 태그 관리 (admin-tags) - CRUD + 통계
- ✅ 포스트 관리 (admin-posts) - CRUD + 분석/통계
- ✅ 댓글 관리 (admin-comments) - 승인/거부/스팸 처리 + 통계
- ✅ 구독 관리 (admin-*-subscribe)

---

## 🔍 기능상 필요하지만 누락된 엔드포인트

### 전제 조건
- **ADMIN (본인)**: 포스트 작성, 통계 확인, 모든 관리 기능
- **USER (구독자)**: 포스트 읽기, 댓글 작성, 북마크, 구독
- **통계**: 관리자용으로 이미 충분히 구현됨 ✅
- **인프라**: Redis 없음

---

## ✅ 이미 구현된 검색 기능

**`GET /posts` 엔드포인트**에서 다음 검색 옵션 사용 가능:

```typescript
{
  srchKywd: "검색어",           // 검색 키워드 (최대 100자)
  srchType: "pstTtl",           // 검색 타입: 'pstTtl'(제목) 또는 'pstSmry'(요약)
  tagNoList: [1, 2, 3],         // 태그 필터 (AND 조건)
  ctgryNoList: [1, 2],          // 카테고리 필터 (OR 조건)
  orderBy: "LATEST",            // 정렬: LATEST(최신순), POPULAR(인기순), OLDEST(오래된순)
  pstStts: "FINISHED",          // 포스트 상태 필터
  rlsYn: "Y",                   // 공개 여부
  archYn: "N",                  // 보관 여부
  delYn: "N",                   // 삭제 여부
  page: 1,                      // 페이지 번호
  strtRow: 0,                   // 시작 행
  endRow: 10                    // 끝 행
}
```

**스키마 파일**: `apps/api/src/endpoints/prisma/schemas/post.schema.ts` (line 263-323)

---

## 🔴 높은 우선순위 (핵심 기능)

### 1. 파일 업로드
```
POST /upload/images            // 포스트 본문 이미지 업로드
POST /upload/thumbnail         // 포스트 썸네일 업로드
POST /upload/profile           // 프로필 이미지 업로드 (ADMIN, USER 공통)
DELETE /upload/:fileId         // 파일 삭제
GET /upload/:fileId            // 파일 조회/다운로드
```

**필요 이유**:
- ADMIN: 포스트 작성 시 이미지 첨부 필수
- USER: 프로필 이미지 설정

**구현 방안**:
- Multer 또는 Fastify multipart 사용
- 파일 저장 위치: `/uploads` 디렉토리 또는 S3
- 파일명 암호화 (UUID)
- 이미지 크기 제한 및 타입 검증

---

## 🟡 중간 우선순위 (중요 기능)

### 3. 비밀번호 재설정 (구독자용)
```
POST /auth/password-reset-request   // 비밀번호 재설정 요청
POST /auth/password-reset-verify    // 재설정 토큰 검증
PUT /auth/password-reset-complete   // 새 비밀번호 설정
```

**필요 이유**: 구독자가 비밀번호를 잊어버린 경우 필수. ADMIN은 서버 직접 접근 가능하지만 USER는 불가능.

**구현 방안**:
- JWT 기반 재설정 토큰 생성 (만료시간 30분)
- 이메일로 재설정 링크 발송
- DB에 토큰 저장 및 검증

### 4. 알림 시스템
```
GET /notifications                  // 알림 목록 조회
GET /notifications/unread-count     // 읽지 않은 알림 개수
PUT /notifications/:id/read         // 알림 읽음 처리
DELETE /notifications/:id           // 알림 삭제
POST /notifications/read-all        // 모든 알림 읽음 처리
```

**알림 타입**:
- ADMIN용: 새 댓글, 새 구독자, 스팸 댓글 감지
- USER용: 댓글 답글, 구독한 카테고리/태그의 새 포스트

**필요 이유**: 블로그 활동에 대한 실시간 피드백. 특히 ADMIN은 댓글에 빠르게 응답 가능.

**구현 방안**:
- 새로운 Notification 테이블 필요
- 이메일 알림과 연동 (UserSbcrInfo 기반)
- WebSocket 또는 폴링 방식

### 5. 카테고리 계층 구조 API
```
GET /categories/:ctgryNo/children   // 하위 카테고리 조회
GET /categories/:ctgryNo/ancestors  // 상위 카테고리 경로 (breadcrumb)
GET /categories/tree                // 전체 카테고리 트리
```

**필요 이유**: DB 스키마에 이미 계층 구조(`upCtgryNo`)가 있지만 API가 없음. UI에서 카테고리 네비게이션 구현 시 필수.

**구현 방안**:
- 재귀 쿼리 사용 (Prisma에서는 수동 구현 필요)
- 카테고리 depth 제한 권장 (3-4 레벨)

### 6. 이메일 인증
```
POST /auth/email-verification-send  // 인증 이메일 발송
POST /auth/email-verification       // 이메일 인증 완료
POST /auth/email-check              // 이메일 중복 확인 (회원가입 전)
GET /auth/username-check/:username  // 사용자명 중복 확인
```

**필요 이유**:
- 스팸 계정 방지
- 비밀번호 재설정 시 본인 확인
- 구독 알림 이메일 발송 전 검증

**구현 방안**:
- UserInfo 테이블에 `emlVrfyYn` 컬럼 추가
- 인증 토큰 생성 및 이메일 발송
- Nodemailer 사용

---

## 🟢 낮은 우선순위 (부가 기능)

### 7. 포스트 본문 검색 확장
```
// SearchPostDto의 srchType 확장
srchType: "pstTtl" | "pstSmry" | "pstMtxt"  // pstMtxt 추가
```

**필요 이유**: 현재는 제목(`pstTtl`)과 요약(`pstSmry`)만 검색 가능. 본문(`pstMtxt`) 검색 추가 시 더 정확한 검색 가능.

**구현 방안**:
- `searchPostSchema`의 `srchType` enum에 `'pstMtxt'` 추가
- Service 레이어에서 본문 검색 로직 추가
- 성능 고려 (본문은 TEXT 타입이므로 인덱싱 어려움)

**우선순위 낮은 이유**: 제목/요약 검색만으로도 충분히 유용함

### 8. 검색어 자동완성 (선택사항)
```
GET /search/suggestions        // 검색어 자동완성
GET /search/popular            // 인기 검색어
```

**필요 이유**: 사용자 편의성 향상

**구현 방안**:
- 별도 SearchLog 테이블 필요
- 최근 검색어 또는 태그명 기반 자동완성

### 9. 댓글 좋아요/반응
```
POST /comments/:cmntNo/likes        // 댓글 좋아요
DELETE /comments/:cmntNo/likes      // 댓글 좋아요 취소
GET /comments/:cmntNo/likes/count   // 댓글 좋아요 수
```

**필요 이유**: 포스트 좋아요는 불필요(조회수로 충분)하지만, 댓글 좋아요는 커뮤니티 활성화에 도움.

**구현 방안**:
- 새로운 CmntLikeMpng 테이블 필요
- 중복 좋아요 방지 (UNIQUE 제약)

### 10. SEO 및 피드
```
GET /sitemap.xml                    // 사이트맵
GET /rss                            // RSS 피드
GET /feed/atom                      // Atom 피드
```

**필요 이유**:
- 검색 엔진 노출
- RSS 구독자 확보
- 개인 블로그에 매우 중요

**구현 방안**:
- 동적 sitemap.xml 생성 (전체 포스트 목록)
- RSS 2.0 및 Atom 1.0 표준 준수
- 캐싱 전략 (1시간마다 재생성)

### 11. 포스트 임시저장
```
POST /admin/posts/drafts            // 임시저장 생성
GET /admin/posts/drafts             // 임시저장 목록
PUT /admin/posts/drafts/:draftId    // 임시저장 수정
DELETE /admin/posts/drafts/:draftId // 임시저장 삭제
POST /admin/posts/drafts/:draftId/publish // 임시저장 발행
```

**필요 이유**: 현재 `pstStts` (EMPTY, WRITING, FINISHED)가 있지만 별도 임시저장 기능이 명확하지 않음.

**구현 방안**:
- 기존 PstInfo 테이블 활용
- `pstStts = WRITING`을 임시저장으로 간주
- 또는 별도 Draft 테이블 생성

### 12. 댓글 중첩 답글 확장
```
GET /comments/:cmntNo/replies       // 특정 댓글의 답글 목록
GET /comments/:cmntNo/thread        // 댓글 스레드 전체 조회
```

**필요 이유**: DB에 `prntCmntNo`가 있어 중첩 댓글은 가능하지만, 스레드 조회 API가 없음.

**구현 방안**:
- 재귀 쿼리로 전체 스레드 조회
- depth 제한 (3-4 레벨)

### 13. 포스트 시리즈 관리
```
POST /admin/series                  // 시리즈 생성
GET /series                         // 시리즈 목록
GET /series/:seriesId/posts         // 시리즈의 포스트 목록
PUT /admin/series/:seriesId         // 시리즈 수정
DELETE /admin/series/:seriesId      // 시리즈 삭제
```

**필요 이유**: 연재 포스트를 묶어서 관리. 기술 블로그에 유용.

**구현 방안**:
- 새로운 SeriesInfo 테이블 필요
- PstInfo에 seriesNo 컬럼 추가
- 시리즈 순서 관리

### 14. 태그 클라우드 / 인기 태그
```
GET /tags/cloud                     // 태그 클라우드 (사용 빈도순)
GET /tags/trending                  // 최근 인기 태그
```

**필요 이유**: 구독자가 주요 주제를 한눈에 파악.

**구현 방안**:
- PstTagMpng 테이블에서 집계
- 태그별 포스트 수 COUNT
- 최근 30일 기준 필터링

---

## ⚪ 불필요한 기능 (제거)

### ❌ 사용자별 포스트 목록
- 포스트 작성자는 ADMIN 한 명뿐
- `GET /users/:userNo/posts` 불필요

### ❌ 사용자 프로필 공개
- 다른 사용자의 프로필을 볼 필요 없음
- `GET /users/:userNo/profile` 불필요

### ❌ 사용자용 통계
- 통계는 ADMIN용으로 충분
- `GET /posts/trending`, `GET /posts/recommended` 불필요

### ❌ 레디스 캐싱
- 인프라에 Redis 없음
- 캐싱 관련 제안 모두 제거

---

## 📋 최종 우선순위 요약

### ✅ 이미 구현됨
- **검색 기능** - 제목/요약 검색, 태그/카테고리 필터, 정렬, 페이지네이션 완료

### 🔴 높은 우선순위 (필수 기능)
1. ⭐⭐⭐ **파일 업로드** - 포스트 작성에 필수

### 🟡 중간 우선순위 (중요 기능)
2. ⭐⭐ **비밀번호 재설정** - 구독자 편의성
3. ⭐⭐ **알림 시스템** - 활동 피드백
4. ⭐⭐ **카테고리 계층 API** - 스키마는 있지만 API 없음
5. ⭐⭐ **이메일 인증** - 보안 및 스팸 방지

### 🟢 낮은 우선순위 (부가 기능)
6. ⭐ 포스트 본문 검색 확장
7. ⭐ 검색어 자동완성
8. ⭐ 댓글 좋아요
9. ⭐ SEO 및 RSS 피드
10. ⭐ 포스트 임시저장 개선
11. ⭐ 댓글 스레드 API
12. ⭐ 포스트 시리즈 관리
13. ⭐ 태그 클라우드

---

## 💡 구현 추천 순서

### Phase 1: 핵심 기능 (1주)
1. **파일 업로드 시스템 구축**
   - Multer/Fastify multipart 설정
   - 이미지 업로드/삭제 엔드포인트
   - 파일명 암호화 및 저장
   - 이미지 최적화 (선택사항)

### Phase 2: 사용자 경험 개선 (2-3주)
2. **비밀번호 재설정**
   - JWT 토큰 기반 재설정 링크
   - 이메일 발송 (Nodemailer)

3. **이메일 인증**
   - 회원가입 시 인증 메일 발송
   - 인증 완료 처리

4. **카테고리 계층 API**
   - 재귀 쿼리 구현
   - Tree 구조 반환

### Phase 3: 커뮤니티 기능 (1-2주)
5. **알림 시스템**
   - Notification 테이블 생성
   - 알림 생성/조회/읽음 처리
   - 이메일 알림 연동

6. **댓글 좋아요**
   - CmntLikeMpng 테이블 생성
   - 좋아요/취소 기능

### Phase 4: SEO 및 고급 기능 (1주)
7. **RSS/Atom 피드**
   - RSS 2.0 생성
   - Atom 1.0 생성

8. **sitemap.xml**
   - 동적 사이트맵 생성

9. **포스트 시리즈**
   - SeriesInfo 테이블
   - 시리즈 관리 API

10. **포스트 본문 검색** (선택사항)
    - searchPostSchema에 pstMtxt 추가

---

## 📊 DB 스키마 추가 필요 사항

### 1. 알림 시스템
```prisma
model NotificationInfo {
  ntfNo       Int      @id @default(autoincrement())
  userNo      Int      // 알림 받는 사용자
  ntfType     String   // 알림 타입 (COMMENT, REPLY, NEW_POST, etc.)
  ntfCntnt    String   // 알림 내용
  ntfLink     String?  // 알림 클릭 시 이동 링크
  readYn      YnStatus @default(N)
  crtDt       String   @default(dbgenerated("..."))

  user        UserInfo @relation(fields: [userNo], references: [userNo])

  @@index([userNo, readYn])
  @@map("ntf_info")
}
```

### 2. 댓글 좋아요
```prisma
model CmntLikeMpng {
  cmntLikeNo  Int      @id @default(autoincrement())
  cmntNo      Int
  userNo      Int
  crtDt       String   @default(dbgenerated("..."))

  comment     CmntInfo @relation(fields: [cmntNo], references: [cmntNo])
  user        UserInfo @relation(fields: [userNo], references: [userNo])

  @@unique([cmntNo, userNo])
  @@map("cmnt_like_mpng")
}
```

### 3. 포스트 시리즈
```prisma
model SeriesInfo {
  seriesNo    Int      @id @default(autoincrement())
  seriesNm    String   @unique
  seriesExpln String?
  useYn       YnStatus @default(Y)
  delYn       YnStatus @default(N)
  crtNo       Int?
  crtDt       String   @default(dbgenerated("..."))

  posts       PstInfo[]

  @@map("series_info")
}

// PstInfo에 추가
model PstInfo {
  // ... 기존 필드
  seriesNo    Int?
  seriesOrd   Int?     // 시리즈 내 순서

  series      SeriesInfo? @relation(fields: [seriesNo], references: [seriesNo])
}
```

### 4. 이메일 인증 (기존 스키마 수정)
```prisma
model UserInfo {
  // ... 기존 필드
  emlVrfyYn   YnStatus @default(N) @map("eml_vrfy_yn")
  emlVrfyDt   String?  @map("eml_vrfy_dt")
}
```

---

## 🎯 다음 단계

1. **Phase 1 기능부터 시작 권장**
   - 파일 업로드 → 검색 기능 순으로 구현

2. **우선순위에 따라 점진적 확장**
   - 각 Phase 완료 후 다음 Phase로 진행

3. **테스트 및 문서화**
   - 각 엔드포인트마다 Swagger 문서 업데이트
   - 통합 테스트 작성

---

**작성자**: Claude Code
**분석 대상**: nihilog 블로그 API
**분석 기준**: 개인 블로그 (ADMIN 1명, USER 다수)
