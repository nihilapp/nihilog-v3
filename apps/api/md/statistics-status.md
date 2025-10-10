# 📊 블로그 통계 기능 현황 체크리스트

> **문서 목적**: data-analyze.md 기반 통계 기능 구현 현황을 체크리스트 형태로 관리
> **최종 업데이트**: 2025년 10월 10일
> **전체 진행률**: 41/55 메서드 (74.5%) | 71/98 지표 (72.4%)
> **완성 통계**: 포스트(12개) + 태그(21개) + 카테고리(20개) + 댓글(18개) = **71개 지표** ✅
> **구현 완성도**: Repository (41개) → Service (41개) → Controller (41개) → OpenAPI (41개) ✅

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

### 기본 통계 (전체/개별 지원)

> 시간대별 합산 통계 - `ctgryNo` 없으면 전체, 있으면 해당 카테고리만

#### 1. 카테고리 생성/삭제 통계

- [x] 신규 카테고리 생성 수 (`CtgryInfo.crtDt`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 새로 생성된 카테고리 수
  - 개별: 해당 카테고리 생성 여부 (0 또는 1)
- [x] 카테고리 삭제 수 (`CtgryInfo.delDt`, `delYn`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 삭제된 카테고리 수
  - 개별: 해당 카테고리 삭제 여부 (0 또는 1)
- [x] 활성 카테고리 수 (`CtgryInfo.useYn='Y'`, `delYn='N'`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 현재 활성 상태인 카테고리 수
  - 개별: 해당 카테고리 활성 여부 (0 또는 1)

#### 2. 카테고리 구독 통계

- [x] 구독자 증가 수 (`CtgrySbcrMpng.crtDt`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 구독자 증가 수
  - 개별: 해당 카테고리의 구독자 증가 수
- [x] 구독 해제 수 (`CtgrySbcrMpng.delDt`, `delYn`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 구독 해제된 수
  - 개별: 해당 카테고리의 구독 해제 수
- [x] 활성 구독자 수 (`CtgrySbcrMpng.useYn='Y'`, `delYn='N'`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 현재 활성 구독자 수
  - 개별: 해당 카테고리의 활성 구독자 수

#### 3. 카테고리 사용 통계

- [x] 카테고리별 게시글 수 (`PstInfo.ctgryNo` 기준) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 게시글 수 합계
  - 개별: 해당 카테고리의 게시글 수
- [x] 카테고리별 조회수 합계 (`PstViewLog` → `PstInfo.ctgryNo`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 조회수 합계
  - 개별: 해당 카테고리의 조회수 합계
- [x] 카테고리별 북마크 수 (`PstBkmrkMpng` → `PstInfo.ctgryNo`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 북마크 수 합계
  - 개별: 해당 카테고리의 북마크 수
- [x] 카테고리별 공유 수 (`PstShrnLog` → `PstInfo.ctgryNo`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 공유 수 합계
  - 개별: 해당 카테고리의 공유 수
- [x] 카테고리별 댓글 수 (`CmntInfo` → `PstInfo.ctgryNo`) - `getAnalyzeCategoryData()` 구현됨
  - 전체: 모든 카테고리의 댓글 수 합계
  - 개별: 해당 카테고리의 댓글 수

### 파생 지표 (전체만)

> 모든 카테고리를 전체적으로 봤을 때의 통계 수치

#### 1. 카테고리 인기도 분석

- [x] 카테고리별 인기 지수 TOP N (조회 + 북마크 + 공유 가중치 합산) - `getTopPopularCategoriesByIndex()` 구현됨
- [x] 구독자 많은 카테고리 TOP N - `getTopCategoriesBySubscriberCount()` 구현됨
- [x] 평균 북마크 수 / 카테고리 - `getAverageBookmarkCountPerCategory()` 구현됨
- [x] 카테고리별 평균 조회수 - `getAverageViewCountPerCategory()` 구현됨

#### 2. 카테고리 계층 분석

- [x] 계층별 카테고리 분포 (상위/하위 카테고리 비율) - `getCategoryHierarchyDistribution()` 구현됨
- [x] 계층별 게시글 분포 - `getCategoryHierarchyPostDistribution()` 구현됨
- [x] 계층별 구독자 분포 - `getCategoryHierarchySubscriberDistribution()` 구현됨

#### 3. 카테고리 관리 통계

- [x] 카테고리 상태별 분포 (활성/비활성/삭제된 카테고리 비율) - `getCategoryStatusDistribution()` 구현됨
- [x] 카테고리 생성자별 통계 - `getCategoryCreatorStatistics()` 구현됨
- [x] 미사용 카테고리 목록 (게시글이 없는 카테고리) - `getUnusedCategoriesList()` 구현됨

**카테고리 통계 진행률**: 20/20 (100.0%)

---

## 👥 4. 사용자(User) 통계

> **분석 기준**: `UserInfo` 테이블 기반 통계

### 기본 통계 (전체/개별 지원)

> 시간대별 합산 통계 - `userNo` 없으면 전체, 있으면 해당 사용자만

#### 1. 사용자 가입/삭제 통계

- [ ] 신규 가입 수 (`UserInfo.crtDt`)
  - 전체: 신규 가입 사용자 수
  - 개별: 해당 사용자 가입 여부 (0 또는 1)
- [ ] 사용자 삭제 수 (`UserInfo.delDt`, `delYn`)
  - 전체: 삭제된 사용자 수
  - 개별: 해당 사용자 삭제 여부 (0 또는 1)
- [ ] 활성 사용자 수 (`UserInfo.useYn='Y'`, `delYn='N'`)
  - 전체: 현재 활성 사용자 수
  - 개별: 해당 사용자 활성 여부 (0 또는 1)

#### 2. 사용자 활동 통계

- [ ] 로그인 수 (`UserInfo.lastLgnDt` 업데이트 기준)
  - 시간대별 로그인한 사용자 수
- [ ] 게시글 작성 수 (`PstInfo` JOIN `UserInfo.crtNo`)
  - 전체: 모든 사용자의 게시글 작성 수
  - 개별: 해당 사용자의 게시글 작성 수
- [ ] 댓글 작성 수 (`CmntInfo` JOIN `UserInfo.crtNo`)
  - 전체: 모든 사용자의 댓글 작성 수
  - 개별: 해당 사용자의 댓글 작성 수
- [ ] 북마크 추가 수 (`PstBkmrkMpng.crtDt`)
  - 전체: 모든 사용자의 북마크 추가 수
  - 개별: 해당 사용자의 북마크 추가 수

#### 3. 사용자 구독 통계

- [ ] 태그 구독 수 (`TagSbcrMpng` → `UserSbcrInfo.sbcrNo`)
  - 전체: 모든 사용자의 태그 구독 수
  - 개별: 해당 사용자의 태그 구독 수
- [ ] 카테고리 구독 수 (`CtgrySbcrMpng` → `UserSbcrInfo.sbcrNo`)
  - 전체: 모든 사용자의 카테고리 구독 수
  - 개별: 해당 사용자의 카테고리 구독 수

### 파생 지표 (전체만)

> 모든 사용자를 전체적으로 봤을 때의 통계 수치

#### 1. 사용자 활동 분석

- [ ] 활성 사용자 분석 (최근 7일/30일 로그인)
  - 기간별 활성 사용자 수 및 비율
- [ ] 사용자별 기여도 TOP N (게시글 + 댓글 + 북마크 가중치 합산)
  - 활동 지수 기준 사용자 순위
- [ ] 사용자별 게시글 작성 수 TOP N
- [ ] 사용자별 댓글 작성 수 TOP N

#### 2. 사용자 역할/상태 분석

- [ ] 역할별 사용자 분포 (ADMIN/USER)
  - 역할별 사용자 수 및 비율
- [ ] 상태별 사용자 분포 (활성/비활성/삭제)
  - 상태별 사용자 수 및 비율
- [ ] 비활성 사용자 목록 (일정 기간 로그인 없음)

#### 3. 사용자 성장 분석

- [ ] 사용자 성장률 (신규 가입 추이)
  - 시간대별 가입자 증가율
- [ ] 사용자 유지율 (가입 대비 활성 사용자)
  - 코호트 분석

**사용자 통계 진행률**: 0/18 (0%)

---

## 🔔 6. 구독 설정(Subscription) 통계

> **분석 기준**: `UserSbcrInfo` 테이블 기반 통계
> **참고**: 태그/카테고리 구독 통계는 각각의 통계에 포함됨

### 기본 통계

#### 1. 구독 생성/삭제 통계

- [ ] 신규 구독 설정 수 (`UserSbcrInfo.crtDt`)
  - 새로 생성된 구독 설정 수
- [ ] 구독 설정 삭제 수 (`UserSbcrInfo.delDt`, `delYn`)
  - 삭제된 구독 설정 수
- [ ] 활성 구독 설정 수 (`UserSbcrInfo.useYn='Y'`, `delYn='N'`)
  - 현재 활성 구독 설정 수

#### 2. 알림 설정별 통계

- [ ] 이메일 알림 활성 수 (`UserSbcrInfo.emlNtfyYn='Y'`)
  - 이메일 알림을 켜놓은 사용자 수
- [ ] 새 게시글 알림 활성 수 (`UserSbcrInfo.newPstNtfyYn='Y'`)
  - 새 게시글 알림을 켜놓은 사용자 수
- [ ] 댓글 답글 알림 활성 수 (`UserSbcrInfo.cmntRplNtfyYn='Y'`)
  - 댓글 답글 알림을 켜놓은 사용자 수

### 파생 지표

#### 1. 알림 설정 분석

- [ ] 알림 설정별 분포
  - 각 알림 설정의 활성화 비율
- [ ] 전체 알림 활성 사용자 수
  - 모든 알림을 켜놓은 사용자 수
- [ ] 전체 알림 비활성 사용자 수
  - 모든 알림을 꺼놓은 사용자 수

**구독 설정 통계 진행률**: 0/9 (0%)

---

## 💬 7. 댓글(Comment) 통계

> **분석 기준**: `CmntInfo` 테이블 기반 통계

### 기본 통계 (전체/개별 지원)

> 시간대별 합산 통계 - `cmntNo` 또는 `pstNo` 없으면 전체

#### 1. 댓글 작성/삭제 통계

- [x] 신규 댓글 작성 수 (`CmntInfo.crtDt`) - `getAnalyzeCommentData()` 구현됨
  - 전체: 새로 작성된 댓글 수
  - 게시글별: 해당 게시글의 댓글 작성 수
- [x] 댓글 삭제 수 (`CmntInfo.delDt`, `delYn`) - `getAnalyzeCommentData()` 구현됨
  - 전체: 삭제된 댓글 수
  - 게시글별: 해당 게시글의 댓글 삭제 수
- [x] 활성 댓글 수 (`CmntInfo.useYn='Y'`, `delYn='N'`) - `getAnalyzeCommentData()` 구현됨
  - 전체: 현재 활성 댓글 수
  - 게시글별: 해당 게시글의 활성 댓글 수

#### 2. 댓글 상태별 통계

- [x] 대기 중 댓글 수 (`CmntInfo.cmntSts='PENDING'`) - `getAnalyzeCommentData()` 구현됨
  - 승인 대기 중인 댓글 수
- [x] 승인된 댓글 수 (`CmntInfo.cmntSts='APPROVED'`) - `getAnalyzeCommentData()` 구현됨
  - 승인 완료된 댓글 수
- [x] 거부된 댓글 수 (`CmntInfo.cmntSts='REJECTED'`) - `getAnalyzeCommentData()` 구현됨
  - 승인 거부된 댓글 수
- [x] 스팸 댓글 수 (`CmntInfo.cmntSts='SPAM'`) - `getAnalyzeCommentData()` 구현됨
  - 스팸으로 분류된 댓글 수

#### 3. 댓글 답글 통계

- [x] 최상위 댓글 수 (`CmntInfo.prntCmntNo IS NULL`) - `getAnalyzeCommentData()` 구현됨
  - 답글이 아닌 원댓글 수
- [x] 답글 수 (`CmntInfo.prntCmntNo IS NOT NULL`) - `getAnalyzeCommentData()` 구현됨
  - 다른 댓글에 대한 답글 수

### 파생 지표 (전체만)

> 모든 댓글을 전체적으로 봤을 때의 통계 수치

#### 1. 댓글 활동 분석

- [x] 게시글별 댓글 수 TOP N - `getTopPostsByCommentCount()` 구현됨
  - 댓글이 가장 많은 게시글 순위
- [x] 사용자별 댓글 작성 수 TOP N - `getTopUsersByCommentCount()` 구현됨
  - 댓글을 가장 많이 작성한 사용자 순위
- [x] 평균 댓글 수 / 게시글 - `getAverageCommentCountPerPost()` 구현됨
  - 게시글당 평균 댓글 수

#### 2. 댓글 상태 분석

- [x] 댓글 상태별 분포 - `getCommentStatusDistribution()` 구현됨
  - PENDING/APPROVED/REJECTED/SPAM 비율
- [x] 댓글 승인율 - `getCommentApprovalRate()` 구현됨
  - (승인된 댓글 / 전체 댓글) 비율
- [x] 스팸 댓글 비율 - `getCommentSpamRate()` 구현됨
  - 스팸으로 분류된 댓글 비율

#### 3. 댓글 구조 분석

- [x] 답글 비율 - `getCommentReplyRatio()` 구현됨
  - (답글 수 / 전체 댓글 수) 비율
- [x] 평균 답글 깊이 - `getCommentAverageDepth()` 구현됨
  - 댓글 답글 계층 구조 분석
- [x] 댓글 없는 게시글 목록 - `getPostsWithoutComments()` 구현됨
  - 댓글이 하나도 없는 게시글

**댓글 통계 진행률**: 18/18 (100.0%)

---

## 📊 전체 진행 현황

| 카테고리       | 지표 수 | Repository 메서드 | Service 메서드 | Controller 엔드포인트 | OpenAPI 문서 | 전체 완성도 |
| -------------- | ------- | ----------------- | -------------- | --------------------- | ------------ | ----------- |
| 포스트 통계    | 12      | ✅ 7/7            | ✅ 7/7         | ✅ 7/7                | ✅ 7/7       | ✅ **100%** |
| 태그 통계      | 21      | ✅ 13/13          | ✅ 13/13       | ✅ 13/13              | ✅ 13/13     | ✅ **100%** |
| 카테고리 통계  | 20      | ✅ 11/11          | ✅ 11/11       | ✅ 11/11              | ✅ 11/11     | ✅ **100%** |
| 댓글 통계      | 18      | ✅ 10/10          | ✅ 10/10       | ✅ 10/10              | ✅ 10/10     | ✅ **100%** |
| 사용자 통계    | 18      | ❌ 0/10           | ❌ 0/10        | ❌ 0/10               | ❌ 0/10      | ❌ **0%**   |
| 구독 설정 통계 | 9       | ❌ 0/4            | ❌ 0/4         | ❌ 0/4                | ❌ 0/4       | ❌ **0%**   |
| **총합**       | **98**  | **41/55**         | **41/55**      | **41/55**             | **41/55**    | **74.5%**   |

> **참고**: 기본 통계는 `getAnalyze{Entity}Data()` 하나의 메서드로 여러 지표를 통합 제공합니다.

### 구현 단계별 현황

**✅ 완전 구현 (4단계 모두 완료)**

- **포스트 통계**: 12개 지표 / 7개 메서드
  - Repository (7개) → Service (7개) → Controller (7개) → OpenAPI (7개)
- **태그 통계**: 21개 지표 / 13개 메서드
  - Repository (13개) → Service (13개) → Controller (13개) → OpenAPI (13개)
- **카테고리 통계**: 20개 지표 / 11개 메서드
  - Repository (11개) → Service (11개) → Controller (11개) → OpenAPI (11개)
- **댓글 통계**: 18개 지표 / 10개 메서드
  - Repository (10개) → Service (10개) → Controller (10개) → OpenAPI (10개)

**❌ 미구현 (재설계 완료, 구현 대기)**

- **사용자 통계**: 18개 지표 / 10개 메서드 (전 단계 미구현)
  - 기본 통계 9개 → `getAnalyzeUserData()` 1개로 통합
  - 파생 지표 9개 → 각각 메서드 9개
- **구독 설정 통계**: 9개 지표 / 4개 메서드 (전 단계 미구현)
  - 기본 통계 6개 → `getAnalyzeSubscriptionData()` 1개로 통합
  - 파생 지표 3개 → 각각 메서드 3개

---

## 🎯 구현된 기능 상세

### ✅ 완전 구현된 기능 (41개 통계 × 4계층 = 164개)

> **구현 계층**: Repository → Service → Controller → OpenAPI 문서
> **완성 통계**: 포스트(7개) + 태그(13개) + 카테고리(11개) + 댓글(10개) = 41개

---

### 📊 포스트 통계 (7개) - 100% 완성

#### 1. 종합 게시글 분석 통계

- **Repository**: `PostRepository.getAnalyzePostData(viewStatData, pstNo)` ✅
- **Service**: `AdminPostsService.getAnalyzePostData(analyzeStatData, pstNo)` ✅
- **Controller**: `POST /admin/posts/analyze/overview?pstNo={pstNo}` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅
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
  - JWT + ADMIN 권한 필수

#### 2. 플랫폼별 공유 통계

- **Repository**: `PostRepository.getPostShareStatsByPlatform(analyzeStatData, pstNo?)` ✅
- **Service**: `AdminPostsService.getPostShareStatsByPlatform(analyzeStatData, pstNo)` ✅
- **Controller**: `POST /admin/posts/analyze/shares?pstNo={pstNo}` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

#### 3. 게시글별 평균 조회수 통계

- **Repository**: `PostRepository.getAverageForPostView(analyzeStatData)` ✅
- **Service**: `AdminPostsService.getAverageForPostView(analyzeStatData)` ✅
- **Controller**: `POST /admin/posts/analyze/average-views` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

#### 4. 게시글당 평균 북마크 수 통계

- **Repository**: `PostRepository.getAverageBookmarkCountPerPost(analyzeStatData)` ✅
- **Service**: `AdminPostsService.getAverageBookmarkCountPerPost(analyzeStatData)` ✅
- **Controller**: `POST /admin/posts/analyze/average-bookmarks` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

#### 5. 인기 게시글 TOP N 통계

- **Repository**: `PostRepository.getTopPopularPostsByViewCount(limit, analyzeStatData?)` ✅
- **Service**: `AdminPostsService.getTopPopularPostsByViewCount(limit, analyzeStatData)` ✅
- **Controller**: `POST /admin/posts/analyze/top-popular` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

#### 6. 댓글 많은 게시글 TOP N 통계

- **Repository**: `PostRepository.getTopPostsByCommentCount(limit, analyzeStatData?)` ✅
- **Service**: `AdminPostsService.getTopPostsByCommentCount(limit, analyzeStatData)` ✅
- **Controller**: `POST /admin/posts/analyze/top-comments` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

#### 7. 게시글 상태 비율 통계

- **Repository**: `PostRepository.getPostStatusRatio(analyzeStatData?)` ✅
- **Service**: `AdminPostsService.getPostStatusRatio(analyzeStatData)` ✅
- **Controller**: `POST /admin/posts/analyze/status-ratio` ✅
- **OpenAPI**: `admin-posts.endpoints.ts` 문서화 완료 ✅

---

### 🏷 태그 통계 (13개) - 100% 완성

#### 8. 종합 태그 분석 통계

- **Repository**: `TagRepository.getAnalyzeTagData(analyzeStatData, tagNo?)` ✅
- **Service**: `AdminTagsService.adminGetAnalyzeTagData(analyzeStatData, tagNo)` ✅
- **Controller**: `POST /admin/tags/analyze?tagNo={tagNo}` ✅
- **OpenAPI**: `admin-tags.endpoints.ts` 문서화 완료 ✅

#### 9~11. 태그 사용량 분석 (3개)

- **getTopUsedTagsByCount**: Repository ✅ → Service ✅ → Controller `POST /admin/tags/statistics/top-used` ✅ → OpenAPI ✅
- **getTagUsageTrend**: Repository ✅ → Service ✅ → Controller `POST /admin/tags/statistics/usage-trend` ✅ → OpenAPI ✅
- **getUnusedTagsList**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/unused` ✅ → OpenAPI ✅

#### 12~14. 태그 구독 분석 (3개)

- **getTopTagsBySubscriberCount**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/top-subscribers` ✅ → OpenAPI ✅
- **getTagSubscriberGrowthRate**: Repository ✅ → Service ✅ → Controller `POST /admin/tags/statistics/subscriber-growth` ✅ → OpenAPI ✅
- **getTagsWithoutSubscribers**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/no-subscribers` ✅ → OpenAPI ✅

#### 15~17. 태그 효율성 분석 (3개)

- **getTagUsageEfficiency**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/usage-efficiency` ✅ → OpenAPI ✅
- **getTagAverageUsageFrequency**: Repository ✅ → Service ✅ → Controller `POST /admin/tags/statistics/average-frequency` ✅ → OpenAPI ✅
- **getTagLifecycleAnalysis**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/lifecycle` ✅ → OpenAPI ✅

#### 18~20. 태그 관리 통계 (3개)

- **getTagStatusDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/status-distribution` ✅ → OpenAPI ✅
- **getTagCreatorStatistics**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/creator-stats` ✅ → OpenAPI ✅
- **getTagCleanupRecommendations**: Repository ✅ → Service ✅ → Controller `GET /admin/tags/statistics/cleanup-recommendations` ✅ → OpenAPI ✅

---

### 📂 카테고리 통계 (11개) - 100% 완성

#### 21. 종합 카테고리 분석 통계

- **Repository**: `CategoryRepository.getAnalyzeCategoryData(analyzeStatData, ctgryNo?)` ✅
- **Service**: `AdminCategoriesService.adminGetAnalyzeCategoryData(analyzeStatData, ctgryNo)` ✅
- **Controller**: `POST /admin/categories/analyze?ctgryNo={ctgryNo}` ✅
- **OpenAPI**: `admin-categories.endpoints.ts` 문서화 완료 ✅

#### 22~25. 카테고리 인기도 분석 (4개)

- **getTopPopularCategoriesByIndex**: Repository ✅ → Service ✅ → Controller `POST /admin/categories/statistics/popular-index?limit={limit}` ✅ → OpenAPI ✅
- **getTopCategoriesBySubscriberCount**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/top-subscribers?limit={limit}` ✅ → OpenAPI ✅
- **getAverageBookmarkCountPerCategory**: Repository ✅ → Service ✅ → Controller `POST /admin/categories/statistics/average-bookmarks` ✅ → OpenAPI ✅
- **getAverageViewCountPerCategory**: Repository ✅ → Service ✅ → Controller `POST /admin/categories/statistics/average-views` ✅ → OpenAPI ✅

#### 26~28. 카테고리 계층 분석 (3개)

- **getCategoryHierarchyDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/hierarchy-distribution` ✅ → OpenAPI ✅
- **getCategoryHierarchyPostDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/hierarchy-posts` ✅ → OpenAPI ✅
- **getCategoryHierarchySubscriberDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/hierarchy-subscribers` ✅ → OpenAPI ✅

#### 29~31. 카테고리 관리 통계 (3개)

- **getCategoryStatusDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/status-distribution` ✅ → OpenAPI ✅
- **getCategoryCreatorStatistics**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/creator-stats` ✅ → OpenAPI ✅
- **getUnusedCategoriesList**: Repository ✅ → Service ✅ → Controller `GET /admin/categories/statistics/unused` ✅ → OpenAPI ✅

---

### 💬 댓글 통계 (10개) - 100% 완성

#### 32. 종합 댓글 분석 통계

- **Repository**: `CommentRepository.getAnalyzeCommentData(analyzeStatData, pstNo?)` ✅
- **Service**: `AdminCommentsService.adminGetAnalyzeCommentData(analyzeStatData, pstNo)` ✅
- **Controller**: `POST /admin/comments/analyze?pstNo={pstNo}` ✅
- **OpenAPI**: `admin-comments.endpoints.ts` 문서화 완료 ✅
- **기능**: 9개 축 데이터를 단일 쿼리로 통합 분석
- **데이터 소스**:
  - `CmntInfo` (작성/삭제/활성)
  - 댓글 상태 (PENDING/APPROVED/REJECTED/SPAM)
  - 답글 구조 (최상위 댓글/답글)
- **구현 방식**: 서브쿼리 기반 조건부 집계
- **특징**:
  - 전체 댓글 vs 특정 게시글 댓글 분석 지원
  - 시간 단위별 분석 (일간/주간/월간/년간)
  - 단일 쿼리로 성능 최적화
  - JWT + ADMIN 권한 필수

#### 33~35. 댓글 활동 분석 (3개)

- **getTopPostsByCommentCount**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/top-posts?limit={limit}` ✅ → OpenAPI ✅
- **getTopUsersByCommentCount**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/top-users?limit={limit}` ✅ → OpenAPI ✅
- **getAverageCommentCountPerPost**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/average-per-post` ✅ → OpenAPI ✅

#### 36~38. 댓글 상태 분석 (3개)

- **getCommentStatusDistribution**: Repository ✅ → Service ✅ → Controller `GET /admin/comments/statistics/status-distribution` ✅ → OpenAPI ✅
- **getCommentApprovalRate**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/approval-rate` ✅ → OpenAPI ✅
- **getCommentSpamRate**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/spam-rate` ✅ → OpenAPI ✅

#### 39~41. 댓글 구조 분석 (3개)

- **getCommentReplyRatio**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/reply-ratio` ✅ → OpenAPI ✅
- **getCommentAverageDepth**: Repository ✅ → Service ✅ → Controller `POST /admin/comments/statistics/average-depth` ✅ → OpenAPI ✅
- **getPostsWithoutComments**: Repository ✅ → Service ✅ → Controller `GET /admin/comments/statistics/posts-without-comments` ✅ → OpenAPI ✅

---

## 🚀 다음 구현 우선순위

### ✅ 완료된 단계

#### 1단계: 콘텐츠 통계 완성 (포스트/태그/카테고리/댓글)

- [x] **포스트 통계**: 12개 지표 / 7개 메서드 (100% 완성)
- [x] **태그 통계**: 21개 지표 / 13개 메서드 (100% 완성)
- [x] **카테고리 통계**: 20개 지표 / 11개 메서드 (100% 완성)
- [x] **댓글 통계**: 18개 지표 / 10개 메서드 (100% 완성)
- [x] **전 계층 구현**: Repository → Service → Controller → OpenAPI 문서

**완성도**: 71개 지표 / 41개 메서드 / 4계층 모두 완료 ✅

---

### 🎯 다음 단계: 사용자 중심 통계 구현

#### 2단계: 구독 설정 통계 (우선순위: 높음) 🔥

**이유**: 알림 관리 기능에 필요, 구조 단순

- [ ] **기본 통계** (6개 지표 → 1개 메서드)
  - `getAnalyzeSubscriptionData(analyzeStatData)` 구현
  - 구독 설정 생성/삭제/활성, 알림 설정별 통계
- [ ] **파생 지표** (3개 지표 → 3개 메서드)
  - 알림 설정별 분포, 전체 알림 활성/비활성 사용자

**예상 메서드**: 4개 (1개 통합 + 3개 개별)

---

#### 3단계: 사용자 통계 (우선순위: 중간) 📊

**이유**: 서비스 운영 지표로 중요, 복잡도 중간

- [ ] **기본 통계** (9개 지표 → 1개 메서드)
  - `getAnalyzeUserData(analyzeStatData, userNo?)` 구현
  - 가입/삭제/활성, 로그인, 게시글/댓글/북마크, 태그/카테고리 구독
- [ ] **파생 지표** (9개 지표 → 9개 메서드)
  - 활성 사용자 분석, 기여도 TOP N, 게시글/댓글 TOP N
  - 역할별/상태별 분포, 비활성 사용자
  - 성장률, 유지율

**예상 메서드**: 10개 (1개 통합 + 9개 개별)

---

### 📋 구현 로드맵

| 단계  | 통계 종류   | 지표 수 | 메서드 수 | 난이도 | 우선순위 | 상태     |
| ----- | ----------- | ------- | --------- | ------ | -------- | -------- |
| 1단계 | 댓글 통계   | 18개    | 10개      | ⭐⭐   | 🔥 높음  | ✅ 완료  |
| 2단계 | 구독 설정   | 9개     | 4개       | ⭐     | 🔥 높음  | ❌ 대기  |
| 3단계 | 사용자 통계 | 18개    | 10개      | ⭐⭐⭐ | ⭐ 중간  | ❌ 대기  |

**전체 완료 시**: 98개 지표 / 55개 메서드 / 전 계층 완성
**현재 진행률**: 71/98 지표 (72.4%) | 41/55 메서드 (74.5%)

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
- **2025-10-10**: 카테고리 통계 전체 구현 완료
  - CategoryRepository에 11개 카테고리 통계 메서드 구현 완료
  - 기본 통계 11개 지표: `getAnalyzeCategoryData()` 통합 구현
    - 카테고리 생성/삭제 통계 (3개)
    - 카테고리 구독 통계 (3개)
    - 카테고리 사용 통계 (5개): 게시글 수, 조회수, 북마크, 공유, 댓글
  - 파생 지표 10개 구현:
    - 인기도 분석 (4개): 인기 지수 TOP N, 구독자 TOP N, 평균 북마크/조회수
    - 계층 분석 (3개): 카테고리/게시글/구독자 계층별 분포
    - 관리 통계 (3개): 상태별 분포, 생성자별 통계, 미사용 카테고리
  - 카테고리 통계 진행률: 0% → 100.0%로 완성
  - 전체 진행률: 45.2% → 63.1%로 향상
- **2025-10-10**: 포스트/태그/카테고리 통계 전 계층 완성
  - **Admin Service 계층 완성**:
    - AdminPostsService: 7개 통계 메서드 구현
    - AdminTagsService: 13개 통계 메서드 구현
    - AdminCategoriesService: 11개 통계 메서드 구현
  - **Admin Controller 계층 완성**:
    - AdminPostsController: 7개 통계 엔드포인트 구현 (JWT + ADMIN 권한)
    - AdminTagsController: 13개 통계 엔드포인트 구현 (JWT + ADMIN 권한)
    - AdminCategoriesController: 11개 통계 엔드포인트 구현 (JWT + ADMIN 권한)
  - **OpenAPI 문서화 완성**:
    - admin-posts.endpoints.ts: 7개 통계 API 문서화
    - admin-tags.endpoints.ts: 13개 통계 API 문서화
    - admin-categories.endpoints.ts: 11개 통계 API 문서화
  - **통계 완성도**: Repository → Service → Controller → OpenAPI 전 계층 완성
  - 포스트/태그/카테고리 통계 각각 100% 완성 (4단계 모두 완료)
- **2025-10-10**: 나머지 통계 재설계 (schema.prisma 기반)
  - **사용자 통계 재정의**: 18개 지표 / 10개 메서드
    - 기본 통계 9개: 가입/삭제/활성, 로그인, 게시글/댓글/북마크, 태그/카테고리 구독
    - 파생 지표 9개: 활성 사용자, 기여도, 역할/상태 분포, 성장률
  - **댓글 통계 재정의**: 18개 지표 / 10개 메서드
    - 기본 통계 9개: 작성/삭제/활성, 상태별(PENDING/APPROVED/REJECTED/SPAM), 답글
    - 파생 지표 9개: 활동 분석, 상태 분석, 구조 분석
  - **구독 설정 통계 재정의**: 9개 지표 / 4개 메서드
    - 기본 통계 6개: 생성/삭제/활성, 이메일/게시글/댓글 알림
    - 파생 지표 3개: 설정별 분포, 전체 알림 활성/비활성
  - **공통 분석 축 제거**: 기존 통계들의 복합 활용으로 대체
  - **전체 지표 수 변경**: 84개 → 98개 (더 구체적이고 실용적인 지표로 재정의)
  - **전체 진행률 변경**: 63.1% → 56.4% (총 메서드 수 증가로 비율 조정)
- **2025-10-10**: 댓글 통계 전체 구현 완료 ✅
  - **CommentRepository**: 10개 댓글 통계 메서드 구현 완료
    - 기본 통계 9개 지표: `getAnalyzeCommentData()` 통합 구현
      - 댓글 작성/삭제 통계 (3개)
      - 댓글 상태별 통계 (4개): PENDING/APPROVED/REJECTED/SPAM
      - 댓글 답글 통계 (2개): 최상위 댓글/답글
    - 파생 지표 9개 구현:
      - 활동 분석 (3개): 게시글별 TOP N, 사용자별 TOP N, 평균 댓글 수
      - 상태 분석 (3개): 상태별 분포, 승인율, 스팸 비율
      - 구조 분석 (3개): 답글 비율, 평균 깊이, 댓글 없는 게시글
  - **Admin Service 계층 완성**: AdminCommentsService 10개 통계 메서드 구현
  - **Admin Controller 계층 완성**: AdminCommentsController 10개 통계 엔드포인트 구현 (JWT + ADMIN 권한)
  - **OpenAPI 문서화 완성**: admin-comments.endpoints.ts 10개 통계 API 문서화
  - **통계 완성도**: Repository → Service → Controller → OpenAPI 전 계층 완성
  - 댓글 통계 진행률: 0% → 100.0%로 완성 (4단계 모두 완료)
  - 전체 진행률: 56.4% → 74.5%로 향상
  - **완성 통계**: 포스트(7개) + 태그(13개) + 카테고리(11개) + 댓글(10개) = 41개 메서드 완성
  - **남은 구현**: 사용자 통계 (10개) + 구독 설정 통계 (4개) = 14개 메서드
