# Admin Posts Controller API 문서

## 컨트롤러: AdminPostsController

**Base Path:** `/admin/posts`

---

## 포스트 통계 관련 엔드포인트

### 1. adminGetAnalyzePostData (통계)

- **메소드명:** adminGetAnalyzePostData
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/overview`
- **요청 데이터 (Query):** AnalyzeStatDto, pstNo (선택적, number)
- **반환 타입:** ResponseDto<AnalyzePostItemType[]>
- **설명:** 관리자 - 포스트 분석 데이터 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 2. adminGetPostShareStatsByPlatform (통계)

- **메소드명:** adminGetPostShareStatsByPlatform
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/shares`
- **요청 데이터 (Query):** AnalyzeStatDto, pstNo (선택적, number)
- **반환 타입:** ResponseDto<SharePlatformStatItemType[]>
- **설명:** 관리자 - 플랫폼별 공유 통계 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

### 3. adminGetAverageForPostView (통계)

- **메소드명:** adminGetAverageForPostView
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/average-views`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AverageViewStatItemType[]>
- **설명:** 관리자 - 포스트별 평균 조회수 조회 (시간대별)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 4. adminGetAverageBookmarkCountPerPost (통계)

- **메소드명:** adminGetAverageBookmarkCountPerPost
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/average-bookmarks`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<AverageBookmarkStatItemType[]>
- **설명:** 관리자 - 포스트당 평균 북마크 수 조회 (시간대별)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 5. adminGetTopPopularPostsByViewCount (통계)

- **메소드명:** adminGetTopPopularPostsByViewCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/top-popular`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopPopularPostItemType[]>
- **설명:** 관리자 - 인기 포스트 TOP N (조회수 기준)
- **인증:** JWT 인증 필요 (ADMIN)

---

### 6. adminGetTopPostsByCommentCount (통계)

- **메소드명:** adminGetTopPostsByCommentCount
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/top-comments`
- **요청 데이터 (Query):** AnalyzeStatDto
- **반환 타입:** ResponseDto<TopCommentPostItemType[]>
- **설명:** 관리자 - 댓글 많은 포스트 TOP N
- **인증:** JWT 인증 필요 (ADMIN)

---

### 7. adminGetPostStatusRatio (통계)

- **메소드명:** adminGetPostStatusRatio
- **요청 메소드:** GET
- **요청 주소:** `/admin/posts/analyze/status-ratio`
- **요청 데이터 (Query):** mode (선택적, string), startDt (선택적, string), endDt (선택적, string), limit (선택적, number)
- **반환 타입:** ResponseDto<PostStatusRatioItemType[]>
- **설명:** 관리자 - 포스트 상태 비율 조회
- **인증:** JWT 인증 필요 (ADMIN)

---

## 포스트 관리 엔드포인트

### 8. adminCreatePost

- **메소드명:** adminCreatePost
- **요청 메소드:** POST
- **요청 주소:** `/admin/posts/`
- **요청 데이터 (Body):** CreatePostDto
- **반환 타입:** ResponseDto<SelectPostType>
- **설명:** 관리자 - 새 포스트 작성
- **인증:** JWT 인증 필요 (ADMIN)

---

### 9. adminUpdatePost

- **메소드명:** adminUpdatePost
- **요청 메소드:** PUT
- **요청 주소:** `/admin/posts/:pstNo`
- **요청 데이터 (Body):** UpdatePostDto
- **반환 타입:** ResponseDto<SelectPostType>
- **설명:** 관리자 - 포스트 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 10. adminMultipleUpdatePost

- **메소드명:** adminMultipleUpdatePost
- **요청 메소드:** PUT
- **요청 주소:** `/admin/posts/multiple`
- **요청 데이터 (Body):** UpdatePostDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 포스트 일괄 수정
- **인증:** JWT 인증 필요 (ADMIN)

---

### 11. adminDeletePost

- **메소드명:** adminDeletePost
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/posts/:pstNo`
- **요청 데이터 (Body):** DeletePostDto
- **반환 타입:** ResponseDto<boolean>
- **설명:** 관리자 - 포스트 삭제
- **인증:** JWT 인증 필요 (ADMIN)

---

### 12. adminMultipleDeletePost

- **메소드명:** adminMultipleDeletePost
- **요청 메소드:** DELETE
- **요청 주소:** `/admin/posts/multiple`
- **요청 데이터 (Body):** DeletePostDto
- **반환 타입:** ResponseDto<MultipleResultType>
- **설명:** 관리자 - 다수 포스트 일괄 삭제
- **인증:** JWT 인증 필요 (ADMIN)
