# 📊 블로그 통계 기능 현황 체크리스트

> **문서 목적**: data-analyze.md 기반 통계 기능 구현 현황을 체크리스트 형태로 관리
> **최종 업데이트**: 2025년 10월 09일
> **전체 진행률**: 9/60 (15.0%)

---

## 🧱 1. 포스트(Post) 통계

### 기본 통계

- [x] 조회 수 (`PstViewLog.viewDt`) - `getAnalyzePostData()` 구현됨
- [x] 공유 수 (`PstShrnLog.shrnDt`) - `getAnalyzePostData()` 구현됨
- [x] 게시글 발행 수 (`PstInfo.publ_dt` 기준) - `getAnalyzePostData()` 구현됨
- [x] 게시글 수정 수 (`PstInfo.updt_dt` 기준) - `getAnalyzePostData()` 구현됨
- [x] 게시글 삭제 수 (`PstInfo.del_dt`, `del_yn`) - `getAnalyzePostData()` 구현됨
- [x] 북마크 수 (`PstBkmrkMpng.crt_dt`) - `getAnalyzePostData()` 구현됨
- [x] 댓글 수 (`CmntInfo.crt_dt`) - `getAnalyzePostData()` 구현됨

### 파생 지표

- [x] 플랫폼별 공유 수 - `getPostShareStatsByPlatform()` 구현됨
- [x] 평균 조회수 / 게시글 - `getAverageForPostView()` 구현됨
- [ ] 게시글당 평균 북마크 수
- [ ] 인기 게시글 TOP N (조회수 기준)
- [ ] 댓글 많은 게시글 TOP N
- [ ] 게시글 상태 비율 (EMPTY / WRITING / FINISHED)

**포스트 통계 진행률**: 9/12 (75.0%)

---

## 🏷 2. 태그(Tag) 통계

### 기본 통계

- [ ] 태그 사용 횟수 (`PstTagMpng`)
- [ ] 게시글당 평균 태그 수
- [ ] 태그별 구독자 수 (`TagSbcrMpng`)
- [ ] 활성 태그 수 (`useYn`, `delYn`)
- [ ] 태그별 게시글 발행 추이 (`PstInfo.crtDt` 기준)

### 파생 지표

- [ ] 가장 많이 사용된 태그 TOP N
- [ ] 태그별 게시글 평균 조회수
- [ ] 태그별 구독자 성장률

**태그 통계 진행률**: 0/8 (0%)

---

## 📂 3. 카테고리(Category) 통계

### 기본 통계

- [ ] 게시글 수 (`PstInfo.ctgryNo` 기준)
- [ ] 카테고리별 조회수 합계 (`pstView`)
- [ ] 카테고리별 북마크 수 (`PstBkmrkMpng`)
- [ ] 카테고리별 공유 수 (`PstShrnLog`)
- [ ] 카테고리별 구독자 수 (`CtgrySbcrMpng`)
- [ ] 활성 / 비활성 비율 (`useYn`, `delYn`)

### 파생 지표

- [ ] 카테고리별 인기 지수 (조회 + 북마크 + 공유 가중치 합산)
- [ ] 평균 북마크 수 / 카테고리
- [ ] 구독자 많은 카테고리 TOP N

**카테고리 통계 진행률**: 0/9 (0%)

---

## 👥 4. 사용자(구독자) 통계

### 기본 통계

- [ ] 가입 수 (`crtDt`)
- [ ] 최근 로그인 사용자 수 (`lastLgnDt`)
- [ ] 작성한 게시글 수 (`PstInfo.userNo`)
- [ ] 작성한 댓글 수 (`CmntInfo.crtNo`)
- [ ] 북마크한 게시글 수 (`PstBkmrkMpng.userNo`)
- [ ] 구독한 태그 / 카테고리 수 (`TagSbcrMpng`, `CtgrySbcrMpng`)

### 파생 지표

- [ ] 활성 사용자 비율 (최근 7일 / 30일)
- [ ] 사용자 기여도 점수 (게시글 + 댓글 + 공유)
- [ ] 구독자 성장률 (신규 가입 추이)

**사용자 통계 진행률**: 0/9 (0%)

---

## 📈 5. 공통 분석 축

### 시간 단위별 통계

- [ ] 일간(day) - 게시글 발행 추이, 조회수 증감
- [ ] 주간(week) - 주간 활동량, 인기 태그/카테고리
- [ ] 월간(month) - 성장 추이, 누적 비교

### 복합 그래프 구성

- [ ] 카테고리별 (카테고리 축) → 발행 수 + 북마크 수 (값 축 2개)
- [ ] 태그별 (태그 축) → 게시글 수 + 구독자 수
- [ ] 사용자별 (사용자 축) → 게시글 수 + 댓글 수

**공통 분석 축 진행률**: 0/6 (0%)

---

## 🔧 6. 구독 관련 통계

### 구독 통계

- [ ] 전체 구독자 수
- [ ] 카테고리별 구독자 수
- [ ] 태그별 구독자 수
- [ ] 구독 설정별 통계 (이메일 알림, 새 게시글 알림, 댓글 답글 알림)
- [ ] 구독자 성장률 추이

**구독 통계 진행률**: 0/5 (0%)

---

## 💬 7. 댓글 통계

### 댓글 통계

- [ ] 댓글 작성 수 (`CmntInfo.crtDt`)
- [ ] 댓글 상태별 통계 (PENDING, APPROVED, REJECTED, SPAM)
- [ ] 게시글별 댓글 수
- [ ] 사용자별 댓글 작성 수

**댓글 통계 진행률**: 0/4 (0%)

---

## 📊 전체 진행 현황

| 카테고리      | 구현됨 | 전체   | 진행률    |
| ------------- | ------ | ------ | --------- |
| 포스트 통계   | 9      | 12     | 75.0%     |
| 태그 통계     | 0      | 8      | 0%        |
| 카테고리 통계 | 0      | 9      | 0%        |
| 사용자 통계   | 0      | 9      | 0%        |
| 공통 분석 축  | 0      | 6      | 0%        |
| 구독 통계     | 0      | 5      | 0%        |
| 댓글 통계     | 0      | 4      | 0%        |
| **총합**      | **9**  | **60** | **15.0%** |

---

## 🎯 구현된 기능 상세

### ✅ 완전 구현된 기능 (3개)

#### 1. 종합 게시글 분석 통계

- **파일**: `PostRepository.ts`
- **메서드**:
  - `getAnalyzePostData(viewStatData, pstNo)` - 전체/특정 게시글 분석
- **기능**: 7개 축 데이터를 단일 쿼리로 통합 분석
- **데이터 소스**:
  - `PstInfo` (발행/수정/삭제)
  - `PstViewLog` (조회)
  - `PstBkmrkMpng` (북마크)
  - `PstShrnLog` (공유)
  - `CmntInfo` (댓글)
- **구현 방식**: 서브쿼리 기반 조건부 집계
- **특징**:
  - 전체 게시글 vs 특정 게시글 분석 지원
  - 시간 단위별 분석 (일간/주간/월간/년간)
  - 단일 쿼리로 성능 최적화

#### 2. 플랫폼별 공유 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getPostShareStatsByPlatform(analyzeStatData, pstNo?)`
- **기능**: 게시글의 플랫폼별 공유 통계
- **데이터 소스**: `PstShrnLog` 테이블
- **구현 방식**: `shrn_site`별 집계
- **특징**:
  - 전체 게시글 vs 특정 게시글 분석 지원
  - 플랫폼별 세분화된 통계

#### 3. 게시글별 평균 조회수 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getAverageForPostView(analyzeStatData)`
- **기능**: 시간대별 게시글 평균 조회수 조회
- **데이터 소스**: `PstViewLog` 테이블
- **구현 방식**: 시간대별 게시글별 조회수 집계 후 평균 계산
- **특징**:
  - 시간대별 세분화된 평균 조회수
  - 서브쿼리와 LEFT JOIN을 활용한 효율적인 집계
  - `createDateSeries` 유틸리티 활용

---

## 🚀 다음 구현 우선순위

### 1단계: 기본 통계 완성 (우선순위 높음)

- [x] ~~게시글 발행 수 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~댓글 작성 수 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~조회수/북마크/공유 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~플랫폼별 공유 통계~~ ✅ `getPostShareStatsByPlatform()`로 구현 완료
- [x] ~~평균 조회수 통계~~ ✅ `getAverageForPostView()`로 구현 완료
- [ ] 사용자 가입 수 통계
- [ ] 태그 사용 횟수 통계

### 2단계: 파생 지표 구현 (우선순위 중간)

- [ ] 인기 게시글 TOP N
- [ ] 가장 많이 사용된 태그 TOP N
- [ ] 활성 사용자 비율

### 3단계: 고급 분석 (우선순위 낮음)

- [ ] 시간 단위별 통계 (일간/주간/월간)
- [ ] 복합 그래프 구성 데이터
- [ ] 성장률 분석

---

## 📝 구현 가이드라인

### Repository 메서드 명명 규칙

- `get{Entity}Stats()` - 기본 통계 조회
- `get{Entity}StatsBy{Category}()` - 카테고리별 통계
- `get{Entity}TopN()` - TOP N 조회
- `get{Entity}GrowthRate()` - 성장률 조회

### 반환 타입 규칙

- 기본 통계: `RepoResponseType<StatItemType[]>`
- TOP N: `RepoResponseType<TopNItemType[]>`
- 성장률: `RepoResponseType<GrowthRateType[]>`

### 데이터 소스 매핑

- `PstInfo` → 게시글 관련 통계
- `PstViewLog` → 조회수 통계
- `PstShrnLog` → 공유 통계
- `PstBkmrkMpng` → 북마크 통계
- `CmntInfo` → 댓글 통계
- `UserInfo` → 사용자 통계
- `TagSbcrMpng` → 태그 구독 통계
- `CtgrySbcrMpng` → 카테고리 구독 통계

---

## 🔄 업데이트 로그

- **2025-10-09**: 초기 문서 생성, 현재 구현 상태 분석 완료
- **2025-10-09**: data-analyze.md 기반 체크리스트 작성 완료
- **2025-10-09**: `getAnalyzePostData()` 구현으로 포스트 통계 7개 기능 추가 완료
  - 게시글 발행/수정/삭제 수
  - 조회수/북마크/공유/댓글 수
  - 전체 진행률 1.7% → 3.3%로 향상
- **2025-10-09**: API 엔드포인트 분리 및 최적화 완료
  - 전체 게시글 분석: `POST /admin/posts/analyze`
  - 특정 게시글 분석: `POST /admin/posts/analyze/:pstNo`
  - 플랫폼별 공유 통계: `POST /admin/posts/shares/:pstNo?`
- **2025-10-09**: 통계 현황 점검 완료
  - 실제 구현 상태 확인: 포스트 관련 2개 메서드만 구현됨
  - 문서 진행률 수정: 11.7% → 3.3%로 정정
  - 나머지 58개 기능 미구현 상태 확인
- **2025-10-09**: 게시글별 평균 조회수 통계 구현 완료
  - `getAverageForPostView()` 메서드 추가
  - `AverageViewStatItemType` 타입 정의
  - AdminPostsService, Controller, OpenAPI 엔드포인트 추가
  - `createExample.ts`에 예시 데이터 추가
  - 포스트 통계 진행률: 66.7% → 75.0%로 향상
  - 전체 진행률: 3.3% → 15.0%로 향상
