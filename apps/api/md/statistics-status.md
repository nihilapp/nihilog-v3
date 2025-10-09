# 📊 블로그 통계 기능 현황 체크리스트

> **문서 목적**: data-analyze.md 기반 통계 기능 구현 현황을 체크리스트 형태로 관리
> **최종 업데이트**: 2025년 10월 09일
> **전체 진행률**: 33/73 (45.2%)

---

## 🧱 1. 포스트(Post) 통계

### 기본 통계 (전체/개별 지원)

- [x] 조회 수 (`PstViewLog.viewDt`) - `getAnalyzePostData()` 구현됨
- [x] 공유 수 (`PstShrnLog.shrnDt`) - `getAnalyzePostData()` 구현됨
- [x] 게시글 발행 수 (`PstInfo.publ_dt` 기준) - `getAnalyzePostData()` 구현됨
- [x] 게시글 수정 수 (`PstInfo.updt_dt` 기준) - `getAnalyzePostData()` 구현됨
- [x] 게시글 삭제 수 (`PstInfo.del_dt`, `del_yn`) - `getAnalyzePostData()` 구현됨
- [x] 북마크 수 (`PstBkmrkMpng.crt_dt`) - `getAnalyzePostData()` 구현됨
- [x] 댓글 수 (`CmntInfo.crt_dt`) - `getAnalyzePostData()` 구현됨

### 파생 지표

- [x] (전체/개별) 플랫폼별 공유 수 - `getPostShareStatsByPlatform()` 구현됨
- [x] (전체만) 평균 조회수 / 게시글 - `getAverageForPostView()` 구현됨
- [x] (전체만) 게시글당 평균 북마크 수 - `getAverageBookmarkCountPerPost()` 구현됨
- [x] (전체만) 인기 게시글 TOP N (조회수 기준) - `getTopPopularPostsByViewCount()` 구현됨
- [x] (전체만) 댓글 많은 게시글 TOP N - `getTopPostsByCommentCount()` 구현됨
- [x] (전체만) 게시글 상태 비율 (EMPTY / WRITING / FINISHED) - `getPostStatusRatio()` 구현됨

**포스트 통계 진행률**: 12/12 (100.0%)

---

## 🏷 2. 태그(Tag) 통계

### 기본 통계 (전체/개별 지원)

> 시간대별 합산 통계 - `tagNo` 없으면 전체, 있으면 해당 태그만

#### 1. 태그 생성/삭제 통계

- [x] 신규 태그 생성 수 (`TagInfo.crtDt`) - `getAnalyzeTagData()` 구현됨
  - 전체: 새로 생성된 태그 수
  - 개별: 해당 태그 생성 여부 (0 또는 1)
- [x] 태그 삭제 수 (`TagInfo.delDt`, `delYn`) - `getAnalyzeTagData()` 구현됨
  - 전체: 삭제된 태그 수
  - 개별: 해당 태그 삭제 여부 (0 또는 1)
- [x] 활성 태그 수 (`TagInfo.useYn='Y'`, `delYn='N'`) - `getAnalyzeTagData()` 구현됨
  - 전체: 현재 활성 상태인 태그 수
  - 개별: 해당 태그 활성 여부 (0 또는 1)

#### 2. 태그 사용 통계

- [x] 태그 매핑 수 (`PstTagMpng.crtDt`) - `getAnalyzeTagData()` 구현됨
  - 전체: 모든 태그의 게시글 매핑 수
  - 개별: 해당 태그의 게시글 매핑 수
- [x] 태그 매핑 삭제 수 (`PstTagMpng.delDt`, `delYn`) - `getAnalyzeTagData()` 구현됨
  - 전체: 삭제된 태그 매핑 수
  - 개별: 해당 태그의 매핑 삭제 수
- [x] 활성 태그 매핑 수 (`PstTagMpng.useYn='Y'`, `delYn='N'`) - `getAnalyzeTagData()` 구현됨
  - 전체: 현재 활성 상태인 태그 매핑 수
  - 개별: 해당 태그의 활성 매핑 수

#### 3. 태그 구독 통계

- [x] 구독자 증가 수 (`TagSbcrMpng.crtDt`) - `getAnalyzeTagData()` 구현됨
  - 전체: 모든 태그의 구독자 증가 수
  - 개별: 해당 태그의 구독자 증가 수
- [x] 구독 해제 수 (`TagSbcrMpng.delDt`, `delYn`) - `getAnalyzeTagData()` 구현됨
  - 전체: 구독 해제된 수
  - 개별: 해당 태그의 구독 해제 수
- [x] 활성 구독자 수 (`TagSbcrMpng.useYn='Y'`, `delYn='N'`) - `getAnalyzeTagData()` 구현됨
  - 전체: 현재 활성 구독자 수
  - 개별: 해당 태그의 활성 구독자 수

### 파생 지표

> 태그별로 그룹화된 통계 (전체만)

#### 1. 태그 사용량 분석

- [x] 태그별 사용 횟수 TOP N - `getTopUsedTagsByCount()` 구현됨
  - 각 태그가 게시글에 사용된 횟수 순위
- [x] 태그별 사용 추이 - `getTagUsageTrend()` 구현됨
  - 시간대별 태그 사용 빈도
- [x] 미사용 태그 목록 - `getUnusedTagsList()` 구현됨
  - 생성되었지만 한 번도 사용되지 않은 태그

#### 2. 태그 구독 분석

- [x] 태그별 구독자 수 TOP N - `getTopTagsBySubscriberCount()` 구현됨
  - 가장 인기 있는 태그 (구독자 수 기준)
- [x] 태그별 구독자 성장률 - `getTagSubscriberGrowthRate()` 구현됨
  - 시간대별 각 태그의 구독자 증가율
- [x] 구독자 없는 태그 목록 - `getTagsWithoutSubscribers()` 구현됨
  - 구독자가 없는 태그

#### 3. 태그 효율성 분석

- [x] 태그별 사용 효율성 - `getTagUsageEfficiency()` 구현됨
  - (사용 횟수 / 구독자 수) 비율
- [x] 태그별 평균 사용 빈도 - `getTagAverageUsageFrequency()` 구현됨
  - (총 사용 횟수 / 활성 기간)
- [x] 태그 생명주기 분석 - `getTagLifecycleAnalysis()` 구현됨
  - 생성부터 마지막 사용까지의 기간

#### 4. 태그 관리 통계

- [x] 태그 상태별 분포 - `getTagStatusDistribution()` 구현됨
  - 활성/비활성/삭제된 태그 비율
- [x] 태그 생성자별 통계 - `getTagCreatorStatistics()` 구현됨
  - 누가 어떤 태그를 많이 생성했는지
- [x] 태그 정리 필요도 - `getTagCleanupRecommendations()` 구현됨
  - 오래된 미사용 태그 식별

**태그 통계 진행률**: 21/21 (100.0%)

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
| 포스트 통계   | 12     | 12     | 100.0%    |
| 태그 통계     | 21     | 21     | 100.0%    |
| 카테고리 통계 | 0      | 9      | 0%        |
| 사용자 통계   | 0      | 9      | 0%        |
| 공통 분석 축  | 0      | 6      | 0%        |
| 구독 통계     | 0      | 5      | 0%        |
| 댓글 통계     | 0      | 4      | 0%        |
| **총합**      | **33** | **73** | **45.2%** |

---

## 🎯 구현된 기능 상세

### ✅ 완전 구현된 기능 (19개)

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

#### 4. 게시글당 평균 북마크 수 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getAverageBookmarkCountPerPost(analyzeStatData)`
- **기능**: 시간대별 게시글당 평균 북마크 수 조회
- **데이터 소스**: `PstBkmrkMpng` 테이블
- **구현 방식**: 시간대별 게시글별 북마크 수 집계 후 평균 계산
- **특징**:
  - 시간대별 세분화된 평균 북마크 수
  - `createDateSeries` 유틸리티 활용
  - 삭제되지 않은 북마크만 집계

#### 5. 인기 게시글 TOP N 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getTopPopularPostsByViewCount(limit, analyzeStatData?)`
- **기능**: 조회수 기준 인기 게시글 TOP N 조회
- **데이터 소스**: `PstInfo` 테이블
- **구현 방식**: 조회수 내림차순 정렬 후 LIMIT 적용
- **특징**:
  - 선택적 날짜 필터링 지원
  - 공개된 게시글만 대상
  - 조회수와 발행일 기준 정렬

#### 6. 댓글 많은 게시글 TOP N 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getTopPostsByCommentCount(limit, analyzeStatData?)`
- **기능**: 댓글 수 기준 게시글 TOP N 조회
- **데이터 소스**: `PstInfo`, `CmntInfo` 테이블
- **구현 방식**: LEFT JOIN으로 댓글 수 집계 후 정렬
- **특징**:
  - 선택적 날짜 필터링 지원
  - 공개된 게시글만 대상
  - 댓글 수와 발행일 기준 정렬

#### 7. 게시글 상태 비율 통계

- **파일**: `PostRepository.ts`
- **메서드**: `getPostStatusRatio(analyzeStatData?)`
- **기능**: 게시글 상태별 비율 조회
- **데이터 소스**: `PstInfo` 테이블
- **구현 방식**: CTE를 활용한 상태별 집계 및 비율 계산
- **특징**:
  - EMPTY / WRITING / FINISHED 상태별 비율
  - 선택적 날짜 필터링 지원
  - 소수점 2자리 정밀도

#### 8. 종합 태그 분석 통계

- **파일**: `TagRepository.ts`
- **메서드**: `getAnalyzeTagData(analyzeStatData, tagNo?)`
- **기능**: 9개 지표 통합 분석 (전체/개별 태그 지원)
- **데이터 소스**:
  - `TagInfo` (생성/삭제/활성)
  - `PstTagMpng` (매핑/사용)
  - `TagSbcrMpng` (구독)
- **구현 방식**: 서브쿼리 기반 조건부 집계
- **특징**:
  - 전체 태그 vs 특정 태그 분석 지원
  - 시간 단위별 분석 (일간/주간/월간/년간)
  - 단일 쿼리로 성능 최적화

#### 9. 태그 사용량 분석 (3개)

- **파일**: `TagRepository.ts`
- **메서드**:
  - `getTopUsedTagsByCount()` - 태그별 사용 횟수 TOP N
  - `getTagUsageTrend()` - 태그별 사용 추이
  - `getUnusedTagsList()` - 미사용 태그 목록
- **기능**: 태그 사용 패턴 분석
- **데이터 소스**: `PstTagMpng`, `TagInfo` 테이블
- **구현 방식**: GROUP BY, LEFT JOIN 활용
- **특징**:
  - 사용 빈도 기반 순위 분석
  - 시간대별 사용 추이 분석
  - 미사용 태그 식별 및 정리 지원

#### 10. 태그 구독 분석 (3개)

- **파일**: `TagRepository.ts`
- **메서드**:
  - `getTopTagsBySubscriberCount()` - 태그별 구독자 수 TOP N
  - `getTagSubscriberGrowthRate()` - 태그별 구독자 성장률
  - `getTagsWithoutSubscribers()` - 구독자 없는 태그 목록
- **기능**: 태그 구독 패턴 분석
- **데이터 소스**: `TagSbcrMpng`, `TagInfo` 테이블
- **구현 방식**: WINDOW 함수, LAG 함수 활용
- **특징**:
  - 구독자 수 기반 인기도 분석
  - 시간대별 성장률 계산
  - 구독자 없는 태그 식별

#### 11. 태그 효율성 분석 (3개)

- **파일**: `TagRepository.ts`
- **메서드**:
  - `getTagUsageEfficiency()` - 태그별 사용 효율성
  - `getTagAverageUsageFrequency()` - 태그별 평균 사용 빈도
  - `getTagLifecycleAnalysis()` - 태그 생명주기 분석
- **기능**: 태그 효율성 및 생명주기 분석
- **데이터 소스**: `PstTagMpng`, `TagSbcrMpng`, `TagInfo` 테이블
- **구현 방식**: 복합 계산식, 날짜 차이 계산
- **특징**:
  - (사용 횟수 / 구독자 수) 효율성 비율
  - (총 사용 횟수 / 활성 기간) 빈도 분석
  - 생성부터 마지막 사용까지 생명주기

#### 12. 태그 관리 통계 (3개)

- **파일**: `TagRepository.ts`
- **메서드**:
  - `getTagStatusDistribution()` - 태그 상태별 분포
  - `getTagCreatorStatistics()` - 태그 생성자별 통계
  - `getTagCleanupRecommendations()` - 태그 정리 필요도
- **기능**: 태그 관리 및 정리 지원
- **데이터 소스**: `TagInfo`, `UserInfo` 테이블
- **구현 방식**: CTE, CASE WHEN, 날짜 계산
- **특징**:
  - 활성/비활성/삭제된 태그 비율
  - 생성자별 태그 생성 통계
  - 오래된 미사용 태그 정리 권장사항

---

## 🚀 다음 구현 우선순위

### 1단계: 기본 통계 완성 (우선순위 높음) ✅ 완료

- [x] ~~게시글 발행 수 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~댓글 작성 수 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~조회수/북마크/공유 통계~~ ✅ `getAnalyzePostData()`로 구현 완료
- [x] ~~플랫폼별 공유 통계~~ ✅ `getPostShareStatsByPlatform()`로 구현 완료
- [x] ~~평균 조회수 통계~~ ✅ `getAverageForPostView()`로 구현 완료
- [x] ~~게시글당 평균 북마크 수~~ ✅ `getAverageBookmarkCountPerPost()`로 구현 완료
- [x] ~~인기 게시글 TOP N~~ ✅ `getTopPopularPostsByViewCount()`로 구현 완료
- [x] ~~댓글 많은 게시글 TOP N~~ ✅ `getTopPostsByCommentCount()`로 구현 완료
- [x] ~~게시글 상태 비율~~ ✅ `getPostStatusRatio()`로 구현 완료
- [ ] 사용자 가입 수 통계
- [ ] 태그 사용 횟수 통계

### 2단계: 파생 지표 구현 (우선순위 중간) ✅ 완료

- [x] ~~인기 게시글 TOP N~~ ✅ `getTopPopularPostsByViewCount()`로 구현 완료
- [x] ~~댓글 많은 게시글 TOP N~~ ✅ `getTopPostsByCommentCount()`로 구현 완료
- [x] ~~게시글 상태 비율~~ ✅ `getPostStatusRatio()`로 구현 완료
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
- **2025-10-09**: 포스트 통계 파생 지표 4개 추가 구현 완료
  - `getAverageBookmarkCountPerPost()` - 게시글당 평균 북마크 수
  - `getTopPopularPostsByViewCount()` - 인기 게시글 TOP N
  - `getTopPostsByCommentCount()` - 댓글 많은 게시글 TOP N
  - `getPostStatusRatio()` - 게시글 상태 비율
  - 관련 타입 정의 및 예시 데이터 추가
  - AdminPostsService, Controller, OpenAPI 엔드포인트 완성
  - 포스트 통계 진행률: 75.0% → 100.0%로 완성
  - 전체 진행률: 15.0% → 20.0%로 향상
- **2025-10-09**: 태그 통계 지표 재점검 및 확장 완료
  - 기본 지표 8개로 확장 (전체/개별 데이터 지원)
  - 파생 지표 8개로 확장 (인기도 지수, 평균 지표 등 추가)
  - 태그 통계 총 16개 지표로 확장
  - 전체 진행률: 20.0% → 17.6%로 조정 (총 지표 수 증가)
- **2025-10-09**: 태그 통계 항목 명확화 및 재구성
  - 기본 통계와 파생 지표 구분 명확화
  - "태그별" 표현 제거 → 시간대별 합산 통계로 정리
  - 기본 통계: 6개 (시간대별 전체/개별 합산)
  - 파생 지표: 8개 (태그별 그룹화 통계)
  - 태그 통계 총 14개 지표로 최적화
  - 전체 진행률: 17.6% → 18.2%로 조정
- **2025-10-09**: 태그 통계 설계 전면 개편
  - 태그 테이블 3개(TagInfo, PstTagMpng, TagSbcrMpng)만으로 가능한 통계로 재설계
  - 기본 통계: 9개 (태그 생성/삭제, 매핑, 구독 관련)
  - 파생 지표: 12개 (사용량, 구독, 효율성, 관리 분석)
  - 태그 통계 총 21개 지표로 확장
  - 전체 진행률: 18.2% → 16.4%로 조정 (총 지표 수 증가)
- **2025-10-09**: 태그 통계 구현 현황 점검 및 문서 갱신 완료
  - TagRepository에서 13개 태그 통계 메서드 구현 확인
  - 기본 통계 9개 지표: `getAnalyzeTagData()` 통합 구현
  - 파생 지표 12개: 사용량/구독/효율성/관리 분석 각 3개씩
  - 태그 통계 진행률: 0% → 100.0%로 완성
  - 전체 진행률: 16.4% → 45.2%로 대폭 향상
  - 구현된 기능 상세 설명 추가 (12개 카테고리)
